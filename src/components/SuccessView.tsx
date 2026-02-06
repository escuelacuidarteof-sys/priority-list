
import React from 'react';
import { motion } from 'framer-motion';

interface SuccessViewProps {
    submittedLeadId: string | null;
    onOpenKit: () => void;
    isDownloading: boolean;
}

const SuccessView: React.FC<SuccessViewProps> = ({ submittedLeadId, onOpenKit, isDownloading }) => {
    // Construct magic link
    // Note: Using window.location directly here assumes client-side only
    const safeOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const safePathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const magicLink = `${safeOrigin}${safePathname}?uid=${submittedLeadId}`;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center border border-emerald-100 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-emerald-50/50"
                >
                    <i className="fa-solid fa-heart-pulse text-3xl"></i>
                </motion.div>

                <h2 className="text-3xl font-extrabold text-slate-900 mb-2 leading-tight">¡Registro Completado!</h2>
                <p className="text-slate-500 mb-8 text-sm px-4">
                    Gracias por confiar en Escuela Cuid-Arte. Como prometimos, aquí tienes tu regalo:
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100"
                >
                    <h3 className="text-slate-900 font-bold text-lg mb-1">🎁 Kit de Supervivencia</h3>
                    <p className="text-[10px] text-slate-400 mb-5 font-bold uppercase tracking-widest italic">
                        Recurso Exclusivo Dra. Odile Fernández
                    </p>

                    <button
                        onClick={onOpenKit}
                        disabled={isDownloading}
                        className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-eye"></i>}
                        Ver Kit Ahora
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-4"
                >
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invita a un amigo/a</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                const shareText = `¡Hola! Me acabo de unir a la lista prioritaria de la Escuela Cuid-Arte de la Dra. Odile Fernández y me han regalado un Kit de Supervivencia. ¡Únete tú también aquí! ${magicLink}`; // Should verify intended share link
                                // Actually usually you share the landing page URL, not the magic link with uid. 
                                // However, the original code used window.location.origin + window.location.pathname.
                                const generalLink = `${safeOrigin}${safePathname}`;
                                const shareTextGeneral = `¡Hola! Me acabo de unir a la lista prioritaria de la Escuela Cuid-Arte de la Dra. Odile Fernández y me han regalado un Kit de Supervivencia. ¡Únete tú también aquí! ${generalLink}`;

                                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTextGeneral)}`, '_blank');
                            }}
                            className="flex-1 py-3 rounded-xl bg-green-500 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                        >
                            <i className="fa-brands fa-whatsapp text-lg"></i> WhatsApp
                        </button>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`${safeOrigin}${safePathname}`);
                                alert('¡Enlace de invitación copiado!');
                            }}
                            className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                        >
                            <i className="fa-solid fa-link"></i> Copiar Enlace
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                        * Nota: Tu enlace personal es solo para ti. Tus amigos deben registrarse para obtener su propio kit.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SuccessView;
