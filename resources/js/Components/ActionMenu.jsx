import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ActionMenu({ items }) {
    const [time, setTime] = useState(getTimeString());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(getTimeString()), 30000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3"
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
                            <ActionButton item={item} time={time} />
                        </motion.div>
                    ))}
            </AnimatePresence>
        </div>
    );
}

function ActionButton({ item, time }) {
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
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className="text-[11px] text-gray-300">{time}</span>
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

function getTimeString() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
}
