import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalMotion, tapSpring } from '../../styles/motion';

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1815]/40 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={modalMotion.initial}
            animate={modalMotion.animate}
            exit={modalMotion.exit}
            transition={modalMotion.transition}
            className={`relative w-full ${maxWidth} bg-white rounded-2xl shadow-modal border border-lumiere-border overflow-hidden z-10 flex flex-col max-h-[90vh]`}
          >
            {/* Header */}
            {(title || subtitle) && (
              <div className="px-6 py-5 border-b border-lumiere-borderLight flex items-center justify-between bg-lumiere-canvas/60">
                <div>
                  {title && (
                    <h2 className="font-serif text-2xl font-medium tracking-tight text-lumiere-textPrimary">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-xs uppercase font-mono tracking-widest text-lumiere-textCaption mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
                <motion.button
                  whileTap={tapSpring.whileTap}
                  transition={tapSpring.transition}
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-lumiere-surface hover:bg-lumiere-border flex items-center justify-center text-lumiere-textMuted hover:text-lumiere-textPrimary transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};