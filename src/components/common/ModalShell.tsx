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
  showDefaultHeader?: boolean;
}

export const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
  showDefaultHeader = true,
}) => {
  // Keyboard listener for Escape dismissal and background lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with 40% darkness and blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={modalMotion.initial}
            animate={modalMotion.animate}
            exit={modalMotion.exit}
            transition={modalMotion.transition}
            className={`relative z-50 w-full ${maxWidth} bg-lumiere-card rounded-3xl shadow-modal border border-lumiere-border overflow-hidden flex flex-col max-h-[92vh]`}
          >
            {/* Optional Default Header */}
            {showDefaultHeader && (title || subtitle) && (
              <div className="px-6 py-5 border-b border-lumiere-borderLight flex items-center justify-between bg-lumiere-canvas/80">
                <div>
                  {title && (
                    <h2 className="font-serif text-2xl font-bold tracking-tight text-lumiere-textPrimary">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-xs uppercase font-mono tracking-widest text-lumiere-textCaption mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>

                {/* Circular 44x44px Hit Target */}
                <motion.button
                  whileTap={tapSpring.whileTap}
                  transition={tapSpring.transition}
                  onClick={onClose}
                  className="w-11 h-11 rounded-full bg-lumiere-surface border border-lumiere-border flex items-center justify-center text-lumiere-textPrimary hover:bg-lumiere-borderLight transition-colors cursor-pointer shrink-0"
                  aria-label="Close modal (Escape)"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            )}

            {/* Modal Body Content */}
            <div className="overflow-y-auto no-scrollbar">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};