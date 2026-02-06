
import React from 'react';
import { motion } from 'framer-motion';

const LoadingView: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4"
            >
                <i className="fa-solid fa-circle-notch animate-spin text-4xl text-slate-300"></i>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Verificando tu acceso...</p>
            </motion.div>
        </div>
    );
};

export default LoadingView;
