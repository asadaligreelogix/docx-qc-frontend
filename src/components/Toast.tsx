"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, type = "success", show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 text-white font-semibold transition-colors ${type === "error" ? "bg-red-500" : "bg-green-500"}`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 