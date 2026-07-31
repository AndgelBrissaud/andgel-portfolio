import { useEffect, useState, useRef } from "react";
import { getPhotos } from "../../services/photos.service";
import { getImageUrl } from "../../services/api";
import type { Photo } from "../../types/photo";
import PhotoCard from "./PhotoCard";
import Spinner from "../ui/Spinner";

interface PhotoGalleryProps {
    categoryId?: number | null;
    categories?: { id: number; name: string }[];
}

export default function PhotoGallery({ categoryId, categories }: PhotoGalleryProps) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    // Helper: extract numeric id from various shapes
    const getCategoryIdFromValue = (val: unknown): number | null => {
        if (val === null || val === undefined) return null;
        if (typeof val === "number") return val;
        if (typeof val === "string") {
            if (/^\d+$/.test(val)) return Number(val);
            return null;
        }
        if (typeof val === "object") {
            const obj = val as Record<string, unknown>;
            if ("id" in obj) {
                const id = obj["id"];
                if (typeof id === "number") return id;
                if (typeof id === "string" && /^\d+$/.test(id)) return Number(id);
            }
        }
        return null;
    };

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                const data = await getPhotos();
                if (!cancelled) setPhotos(data);
            } catch (e) {
                console.error("getPhotos failed", e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => {
            cancelled = true;
        };
    }, []);

    const filteredPhotos = categoryId !== null && categoryId !== undefined
        ? photos.filter((photo) => {
              // special case: categoryId === 0 means uncategorized
              if (Number(categoryId) === 0) {
                  const hasCategoryProp = photo.category !== undefined && photo.category !== null && photo.category !== "";
                  const hasCategoryId = photo.category_id !== undefined && photo.category_id !== null;
                  return !hasCategoryProp && !hasCategoryId;
              }

              const cid = getCategoryIdFromValue(photo.category);
              if (cid !== null) return cid === Number(categoryId);

              if (photo.category && typeof photo.category === "string") {
                  if (!categories) return false;
                  const cat = categories.find((c) => c.id === categoryId);
                  return Boolean(cat && cat.name === photo.category);
              }

              if (photo.category_id !== undefined && photo.category_id !== null) {
                  return Number(photo.category_id) === Number(categoryId);
              }

              return false;
          })
        : photos;

    if (loading) {
        return (
            <div className="py-8 flex justify-center">
                <Spinner label="Chargement des photographies..." />
            </div>
        );
    }

    if (!loading && filteredPhotos.length === 0) {
        return (
            <div className="text-center text-text-muted">
                {categoryId ? (
                    <>
                        <h3 className="text-lg font-medium mb-2">Aucune photo dans cette catégorie</h3>
                        <p>Cette catégorie ne contient pas encore de photographie.</p>
                    </>
                ) : (
                    <>
                        <h3 className="text-lg font-medium mb-2">Aucune photographie disponible</h3>
                        <p>Les photographies sont en cours d'ajout. Revenez bientôt.</p>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPhotos.map((photo, idx) => (
                <PhotoCard key={photo.id} photo={photo} onView={() => { setSelectedIndex(idx); setIsClosing(false); }} />
            ))}

            {selectedIndex !== null && (
                <Lightbox
                    photos={filteredPhotos}
                    index={selectedIndex}
                    onClose={() => {
                        setIsClosing(true);
                        setTimeout(() => {
                            setSelectedIndex(null);
                            setIsClosing(false);
                        }, 300);
                    }}
                    isClosing={isClosing}
                    onNavigate={(newIndex: number) => setSelectedIndex(newIndex)}
                />
            )}
        </div>
    );
}

interface LightboxProps {
    photos: Photo[];
    index: number;
    onClose: () => void;
    onNavigate: (idx: number) => void;
    isClosing: boolean;
}

function Lightbox({ photos, index, onClose, onNavigate, isClosing }: LightboxProps) {
    const photo = photos[index];

    const closeBtnRef = useRef<HTMLButtonElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const prevActiveElement = useRef<HTMLElement | null>(null);
    const [announcement, setAnnouncement] = useState('');

    // manage focus and keyboard (Escape, arrows, Tab trap)
    useEffect(() => {
        prevActiveElement.current = document.activeElement as HTMLElement | null;
        // focus the close button after mount
        const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 10);

        // prevent body scroll while lightbox is open
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        function handler(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key === "ArrowRight") {
                if (index < photos.length - 1) onNavigate(index + 1);
                return;
            }
            if (e.key === "ArrowLeft") {
                if (index > 0) onNavigate(index - 1);
                return;
            }

            if (e.key === "Tab") {
                const root = containerRef.current;
                if (!root) return;
                const focusable = Array.from(root.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )).filter((el) => !el.hasAttribute('disabled'));
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        window.addEventListener("keydown", handler);
        const announceTimer = setTimeout(() => {
            setAnnouncement(`${index + 1} / ${photos.length} ${photos[index]?.title || ''}`);
        }, 0);

        return () => {
            clearTimeout(focusTimer);
            clearTimeout(announceTimer);
            window.removeEventListener("keydown", handler);
            // restore body scroll
            document.body.style.overflow = prevOverflow;
            // restore focus to previous element
            prevActiveElement.current?.focus?.();
        };
    }, [index, photos, onClose, onNavigate]);

    // touch swipe support (mobile)
    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;
        let startX: number | null = null;
        function onTouchStart(e: TouchEvent) {
            startX = e.touches[0].clientX;
        }
        function onTouchMove(e: TouchEvent) {
            // prevent scrolling when swiping horizontally
            if (startX !== null) {
                const dx = Math.abs(e.touches[0].clientX - startX);
                if (dx > 10) e.preventDefault();
            }
        }
        function onTouchEnd(e: TouchEvent) {
            if (startX === null) return;
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;
            if (Math.abs(diff) > 50) {
                if (diff < 0) {
                    // swipe left -> next
                    if (index < photos.length - 1) onNavigate(index + 1);
                } else {
                    // swipe right -> prev
                    if (index > 0) onNavigate(index - 1);
                }
            }
            startX = null;
        }
        root.addEventListener('touchstart', onTouchStart, { passive: false });
        root.addEventListener('touchmove', onTouchMove, { passive: false });
        root.addEventListener('touchend', onTouchEnd);
        return () => {
            root.removeEventListener('touchstart', onTouchStart as EventListener);
            root.removeEventListener('touchmove', onTouchMove as EventListener);
            root.removeEventListener('touchend', onTouchEnd as EventListener);
        };
    }, [containerRef, index, photos, onNavigate]);

    // Slide animation state
    const [displayIndex, setDisplayIndex] = useState(index);
    const prevPropIndex = useRef(index);
    const [transitioning, setTransitioning] = useState(false);
    const [trackTranslate, setTrackTranslate] = useState<'0' | '-50%'>('0');

    // when parent index changes, run slide animation
    useEffect(() => {
        if (index === prevPropIndex.current) return;
        const incoming = index;
        const dir = (incoming > prevPropIndex.current || (prevPropIndex.current === photos.length - 1 && incoming === 0)) ? 'left' : 'right';
        setTransitioning(true);
        // set initial translate for track
        const start = dir === 'left' ? '0' : '-50%';
        const end = dir === 'left' ? '-50%' : '0';
        setTrackTranslate(start);

        // trigger transition on next frame
        requestAnimationFrame(() => requestAnimationFrame(() => setTrackTranslate(end)));

        const t = setTimeout(() => {
            setDisplayIndex(incoming);
            setTransitioning(false);
            prevPropIndex.current = incoming;
            setAnnouncement(`${incoming + 1} / ${photos.length} ${photos[incoming]?.title || ''}`);
        }, 300);

        return () => clearTimeout(t);
    }, [index, photos, displayIndex]);

    // preload next / previous images for smoother navigation
    useEffect(() => {
        const next = photos[(index + 1) % photos.length];
        const prev = photos[(index - 1 + photos.length) % photos.length];
        const imgs: HTMLImageElement[] = [];
        if (next) {
            const i = new Image();
            i.src = getImageUrl(next.image);
            imgs.push(i);
        }
        if (prev) {
            const i = new Image();
            i.src = getImageUrl(prev.image);
            imgs.push(i);
        }
        return () => {
            imgs.forEach((im) => { im.src = ''; });
        };
    }, [index, photos]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"}`}
            role="dialog"
            aria-modal="true"
            aria-label={photo.title || 'Image'}
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/70" />

            <div ref={containerRef} className="relative max-h-[90vh] max-w-[90vw] z-10" onClick={(e) => e.stopPropagation()} aria-labelledby="lightbox-title" aria-describedby="lightbox-desc">
                <button
                    ref={closeBtnRef}
                    onClick={onClose}
                    className="absolute right-0 top-0 m-2 z-20 bg-black/50 hover:bg-black/60 rounded-full p-2 text-white text-2xl"
                    aria-label="Fermer"
                >
                    ✕
                </button>

                <div className={`overflow-hidden w-[80vw] h-[80vh] flex items-center justify-center`}> 
                    {/* when transitioning render track with outgoing+incoming, otherwise single image */}
                    {!transitioning && (
                        <div className={`transform ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"} transition-all duration-300 ease-out`}>
                            <img src={getImageUrl(photos[displayIndex].image)} alt={photos[displayIndex].title} className="max-h-[80vh] max-w-[80vw] object-contain transition-transform duration-300 ease-out drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]" />
                        </div>
                    )}

                    {transitioning && (
                        <div className="relative w-full" style={{ width: '100%', height: '100%' }}>
                            <div className="absolute inset-0 overflow-hidden">
                                <div style={{ width: '200%', height: '100%', display: 'flex', transform: `translateX(${trackTranslate})`, transition: 'transform 300ms cubic-bezier(.2,.8,.2,1)' }}>
                                    <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={getImageUrl(photos[displayIndex].image)} alt={photos[displayIndex].title} className="max-h-[80vh] max-w-[80vw] object-contain" />
                                    </div>
                                    <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={getImageUrl(photos[index].image)} alt={photos[index].title} className="max-h-[80vh] max-w-[80vw] object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div id="lightbox-title" className="sr-only">{photos[displayIndex].title}</div>
                <div id="lightbox-desc" className="mt-2 text-center text-white">{photos[displayIndex].description || ''}</div>

                {/* counter */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2 z-20">
                    <div className="bg-black/50 text-white text-sm px-3 py-1 rounded-md">{displayIndex + 1} / {photos.length}</div>
                </div>

                {/* navigation */}
                {photos.length > 1 && (
                    <>
                        <button
                            onClick={() => { if (index > 0) onNavigate(index - 1); }}
                            disabled={index <= 0}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 text-white shadow-md ${index <= 0 ? 'bg-black/20 cursor-not-allowed' : 'bg-black/40 hover:bg-black/60'}`}
                            aria-label="Précédent"
                        >
                            ←
                        </button>

                        <button
                            onClick={() => { if (index < photos.length - 1) onNavigate(index + 1); }}
                            disabled={index >= photos.length - 1}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 text-white shadow-md ${index >= photos.length - 1 ? 'bg-black/20 cursor-not-allowed' : 'bg-black/40 hover:bg-black/60'}`}
                            aria-label="Suivant"
                        >
                            →
                        </button>
                    </>
                )}
                <div aria-live="polite" className="sr-only">{announcement}</div>
            </div>
        </div>
    );
}