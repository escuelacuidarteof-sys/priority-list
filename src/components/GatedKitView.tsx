
import React from 'react';
import { motion } from 'framer-motion';
import { LOGO_URL, TOOL_URL } from '../utils/constants';

interface GatedKitViewProps {
    onVerify: () => void;
}

const GatedKitView: React.FC<GatedKitViewProps> = ({ onVerify }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-screen flex flex-col bg-white overflow-hidden"
        >
            <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <img src={LOGO_URL} alt="Logo" className="h-10 object-contain" />
                    <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
                    <p className="text-xs font-bold text-slate-500 hidden md:block uppercase tracking-wider">
                        Acceso Exclusivo · Kit de Supervivencia
                    </p>
                </div>
                <button
                    onClick={onVerify}
                    className="text-slate-400 hover:text-slate-900 transition-colors p-2"
                >
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>
            </header>
            <div className="flex-1 relative bg-slate-100">
                <iframe
                    src={TOOL_URL}
                    className="w-full h-full border-none shadow-inner"
                    title="Kit de Supervivencia"
                />
            </div>
        </motion.div>
    );
};

export default GatedKitView;
