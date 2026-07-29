import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";
import PremiumInput from "../ui/PremiumInput";
import Button from "../ui/Button";

export default function LoginForm(){

    const {login}=useAuth();
    const navigate=useNavigate();
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const [showPassword,setShowPassword]=useState(false);

    useEffect(()=>{
        document.querySelector<HTMLInputElement>('input[type="password"]')?.focus();
    },[]);

    async function handleSubmit(event:React.FormEvent<HTMLFormElement>){

        event.preventDefault();
        setError("");
        setLoading(true);

        try{

            await login(password);

            navigate("/admin",{replace:true});

        }catch(error){

            setError(
                error instanceof Error
                ? error.message
                : "Mot de passe incorrect"
            );

        }finally{

            setLoading(false);

        }

    }

    return (

        <main className="min-h-screen bg-background flex items-start justify-center px-4 py-20">

            <div className="w-full max-w-lg rounded-radius-lg border border-white/10 bg-surface shadow-shadow-soft overflow-hidden">

                <div className="px-6 pt-6 pb-4 text-center border-b border-white/10">

                    <p className="text-[11px] uppercase tracking-[0.35em] text-accent font-medium">Administration</p>

                    <h1 className="mt-2 font-title text-3xl text-text">Connexion</h1>

                    <p className="mt-3 text-sm text-text-soft leading-relaxed">Accédez à votre espace d'administration.</p>

                </div>

                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">

                    {error && (
                        <div role="alert" className="rounded-radius-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>
                    )}

                    <div className="w-full">
                    <PremiumInput
                        label="Mot de passe"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(value)=>{
                            if(error) setError("");
                            setPassword(value);
                        }}
                        placeholder="Votre mot de passe"
                        required
                            end={(
                            <Button type="button" compact onClick={()=>setShowPassword(s=>!s)} className="inline-flex items-center justify-center h-9 px-3 rounded-radius-md border border-white/10 bg-background text-sm text-text-muted" aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}>
                                {showPassword ? "Masquer" : "Afficher"}
                            </Button>
                        )}
                    />

                    </div>

                    <div className="w-full">
                    <Button type="submit" disabled={loading} className="w-full h-12 px-8">
                        {loading ? "Connexion..." : "Se connecter"}
                    </Button>
                    </div>

                </form>

            </div>

            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

                <div className="absolute -top-48 -right-48 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-[140px]" />

                <div className="absolute -bottom-48 -left-48 h-[28rem] w-[28rem] rounded-full bg-accent/5 blur-[140px]" />

            </div>

        </main>

    );

}