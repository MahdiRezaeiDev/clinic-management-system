import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function ActionMenu({ items }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 print:hidden"
            dir="rtl"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg transition hover:bg-emerald-800"
            >
                {open ? '×' : '+'}
            </button>

            {/* Action Buttons */}
            <AnimatePresence>
                {open &&
                    items.map((item, index) => (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative flex items-center"
                        >
                            <ActionButton item={item} />
                        </motion.div>
                    ))}
            </AnimatePresence>
        </div>
    );
}

function ActionButton({ item }) {
    const [showTip, setShowTip] = useState(false);

    return (
        <div className="relative flex items-center">
            {/* Tooltip on the right */}
            <div
                className={`absolute left-full ml-3 whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-xs text-white shadow-lg transition-all duration-200 ${
                    showTip
                        ? 'visible translate-x-0 opacity-100'
                        : 'invisible translate-x-2 opacity-0'
                }`}
            >
                <div className="flex items-center gap-2 font-medium">
                    <span>{item.label}</span>
                </div>
            </div>

            {/* Action button */}
            <button
                onClick={item.onClick}
                onMouseEnter={() => setShowTip(true)}
                onMouseLeave={() => setShowTip(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-emerald-700 shadow-md ring-1 ring-gray-200 transition hover:scale-110 hover:shadow-lg active:scale-95"
            >
                {item.icon}
            </button>
        </div>
    );
}
