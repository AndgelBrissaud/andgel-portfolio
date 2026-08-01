import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { getImageUrl } from "../../services/api";
import type { Photo } from "../../types/photo";

interface LightboxProps {
    photos: Photo[];
    index: number;
    onClose: () => void;
    onNavigate: (idx: number) => void;
    isClosing: boolean;
}

export default function Lightbox({ photos, index, onClose, onNavigate, isClosing }: LightboxProps) {
    const photo = photos[index];

    const closeBtnRef = useRef<HTMLButtonElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const prevActiveElement = useRef<HTMLElement | null>(null);
    const [announcement, setAnnouncement] = useState('');
    const [portalEl, setPortalEl] = useState<HTMLDivElement | null>(null);
    const portalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = document.createElement('div');
        document.body.appendChild(el);
        portalRef.current = el;
        const t = window.setTimeout(() => setPortalEl(el), 0);
        return () => {
            clearTimeout(t);
            if (portalRef.current && portalRef.current.parentNode) portalRef.current.parentNode.removeChild(portalRef.current);
            portalRef.current = null;
            setPortalEl(null);
        };
    }, []);

    useEffect(() => {
        prevActiveElement.current = document.activeElement as HTMLElement | null;
        const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 10);
        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

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
            document.body.style.overflow = prevBodyOverflow;
            document.documentElement.style.overflow = prevHtmlOverflow;
            prevActiveElement.current?.focus?.();
        };
    }, [index, photos, onClose, onNavigate]);

    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;
        let startX: number | null = null;
        function onTouchStart(e: TouchEvent) {
            startX = e.touches[0].clientX;
        }
        function onTouchMove(e: TouchEvent) {
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
                    if (index < photos.length - 1) onNavigate(index + 1);
                } else {
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

    const [displayIndex, setDisplayIndex] = useState(index);
    const prevPropIndex = useRef(index);
    const [transitioning, setTransitioning] = useState(false);
    const [trackTranslate, setTrackTranslate] = useState<'0' | '-50%'>('0');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (index === prevPropIndex.current) return;
        const incoming = index;
        const dir = (incoming > prevPropIndex.current || (prevPropIndex.current === photos.length - 1 && incoming === 0)) ? 'left' : 'right';
        setTransitioning(true);
        const start = dir === 'left' ? '0' : '-50%';
        const end = dir === 'left' ? '-50%' : '0';
        setTrackTranslate(start);
        requestAnimationFrame(() => requestAnimationFrame(() => setTrackTranslate(end)));

        const t = setTimeout(() => {
            setDisplayIndex(incoming);
            setTransitioning(false);
            prevPropIndex.current = incoming;
            setAnnouncement(`${incoming + 1} / ${photos.length} ${photos[incoming]?.title || ''}`);
        }, 300);

        return () => clearTimeout(t);
    }, [index, photos, displayIndex]);

    useEffect(() => {
        const id = window.setTimeout(() => setIsMounted(true), 20);
        return () => {
            if (id) window.clearTimeout(id);
            setIsMounted(false);
        };
    }, []);

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

    const markup = (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-6 transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"}`}
            role="dialog"
            aria-modal="true"
            aria-label={photo.title || 'Image'}
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300" />
            <div ref={containerRef} className={`relative max-h-[90vh] max-w-[90vw] z-[10000] ${isClosing ? 'scale-95' : isMounted ? 'scale-100' : 'scale-95'} transition-transform duration-300`} onClick={(e) => e.stopPropagation()} aria-labelledby="lightbox-title" aria-describedby="lightbox-desc">
                <button
                    ref={closeBtnRef}
                    onClick={onClose}
                    className="absolute right-0 top-0 m-2 z-[10001] bg-black/50 hover:bg-black/60 rounded-full p-3 text-white text-2xl cursor-pointer hover:scale-105 transition-transform"
                    aria-label="Fermer"
                >
                    ✕
                </button>

                <div className={`overflow-hidden w-[80vw] h-[80vh] flex items-center justify-center`}> 
                    {!transitioning && (
                        <div className={`transform ${isClosing ? "scale-95 opacity-0" : isMounted ? "scale-100 opacity-100" : "scale-95 opacity-0"} transition-all duration-350 ease-out`}>
                            <img src={getImageUrl(photos[displayIndex].image)} alt={photos[displayIndex].title} className="max-h-[80vh] max-w-[80vw] object-contain transition-transform duration-500 ease-out drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] rounded-md bg-black/5 cursor-zoom-out" />
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

                <div className="absolute left-1/2 -translate-x-1/2 top-2 z-20">
                    <div className="bg-black/50 text-white text-sm px-3 py-1 rounded-md">{displayIndex + 1} / {photos.length}</div>
                </div>

                {photos.length > 1 && (
                    <>
                        <button
                            onClick={() => { if (index > 0) onNavigate(index - 1); }}
                            disabled={index <= 0}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 text-white shadow-md ${index <= 0 ? 'bg-black/20 cursor-not-allowed' : 'bg-black/40 hover:bg-black/60 cursor-pointer'}`}
                            aria-label="Précédent"
                        >
                            ←
                        </button>

                        <button
                            onClick={() => { if (index < photos.length - 1) onNavigate(index + 1); }}
                            disabled={index >= photos.length - 1}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 text-white shadow-md ${index >= photos.length - 1 ? 'bg-black/20 cursor-not-allowed' : 'bg-black/40 hover:bg-black/60 cursor-pointer'}`}
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

    if (!portalEl) return null;
    return createPortal(markup, portalEl);
}
