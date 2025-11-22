import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  X,
  Mail,
  User,
  Building,
  Sparkles,
  CheckCircle2,
  Cpu,
} from "lucide-react@0.487.0";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationModal({
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "", role: "" });
      onClose();
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Ensure modal mounts into a dedicated top-most container so it stays on front
  const getModalContainer = (): HTMLElement => {
    if (typeof document === "undefined") {
      // Fallback for SSR; createPortal won't run server-side
      return ({} as HTMLElement);
    }
    let el = document.getElementById("registration-modal-root") as HTMLElement | null;
    if (!el) {
      el = document.createElement("div");
      el.id = "registration-modal-root";
      Object.assign(el.style, {
        position: "fixed",
        inset: "0",
        pointerEvents: "none", // allow children to control pointer events
        zIndex: "2147483647", // maximum safe z-index to keep modal on top
      } as Partial<CSSStyleDeclaration>);
      document.body.appendChild(el);
    }
    return el;
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // pointerEvents auto so modal receives clicks while modal-root itself blocks none
          style={{ pointerEvents: "auto" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-gradient-to-br from-gray-900 via-purple-900/30 
            to-gray-900 rounded-2xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
          >
            {/* Floating Stars */}
            <div className="absolute inset-0 opacity-20 z-[100]">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Gradient Orbs */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-30" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-30" />

            <div className="relative p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* ------------------------ */}
              {/*     REGISTRATION FORM    */}
              {/* ------------------------ */}
              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block mb-4"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-400 rounded-2xl flex items-center justify-center">
                        <Cpu className="text-white" size={32} />
                      </div>
                    </motion.div>

                    <h2 className="text-3xl mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      Free Registration
                    </h2>

                    <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                      <Sparkles size={16} />
                      <p className="text-sm uppercase tracking-wider">
                        100% Free Access
                      </p>
                      <Sparkles size={16} />
                    </div>

                    <p className="text-gray-400">
                      Join us for three days of AI innovation and networking
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-black/50 border-2 border-purple-500/30 
                        rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                        size={20}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-black/50 border-2 border-purple-500/30 
                        rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Building
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company / Organization"
                        className="w-full pl-12 pr-4 py-3 bg-black/50 border-2 border-purple-500/30 
                        rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Cpu
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                        size={20}
                      />
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-black/50 border-2 border-purple-500/30 
                        rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="" className="bg-gray-900">
                          Select Your Role
                        </option>
                        <option value="developer" className="bg-gray-900">
                          AI/ML Developer
                        </option>
                        <option value="researcher" className="bg-gray-900">
                          Researcher
                        </option>
                        <option value="student" className="bg-gray-900">
                          Student
                        </option>
                        <option value="entrepreneur" className="bg-gray-900">
                          Entrepreneur
                        </option>
                        <option value="executive" className="bg-gray-900">
                          Executive
                        </option>
                        <option value="other" className="bg-gray-900">
                          Other
                        </option>
                      </select>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl 
                      text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 
                      transition-shadow flex items-center justify-center gap-2"
                    >
                      <Sparkles size={20} />
                      Register for Free
                    </motion.button>

                    <p className="text-xs text-center text-gray-500">
                      By registering, you agree to receive conference updates and materials
                    </p>
                  </form>
                </>
              ) : (
                // -------------------------
                //     SUCCESS SCREEN
                // -------------------------
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2
                      className="mx-auto text-green-400 mb-6"
                      size={80}
                    />
                  </motion.div>

                  <h3 className="text-2xl mb-3 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                    Registration Successful!
                  </h3>

                  <p className="text-gray-400 mb-2">
                    Welcome to AI Conference 2025
                  </p>
                  <p className="text-sm text-gray-500">
                    Check your email for confirmation and event details
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,

    // Render into dedicated modal root so it stays on top
    getModalContainer()
  );
}
