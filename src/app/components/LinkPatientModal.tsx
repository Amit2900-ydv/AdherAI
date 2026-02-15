import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Link } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface LinkPatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLinkPatient: (email: string) => void;
}

export function LinkPatientModal({ isOpen, onClose, onLinkPatient }: LinkPatientModalProps) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!email.trim()) {
            setError('Email is required');
            return false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Invalid email format');
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onLinkPatient(email);
            setEmail('');
            setError('');
            onClose();
        }
    };

    const handleChange = (value: string) => {
        setEmail(value);
        if (error) setError('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 z-50 max-w-md mx-auto shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl" style={{ fontWeight: 700 }}>Link Existing Patient</h2>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mb-6">
                            Enter the email address of the patient you want to link. They must already have an account.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-sm mb-2" style={{ fontWeight: 600 }}>
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => handleChange(e.target.value)}
                                    placeholder="patient@example.com"
                                    className={`w-full h-12 px-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${error ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                />
                                {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                    className="flex-1 h-12 border-2"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                >
                                    <Link className="w-4 h-4 mr-2" />
                                    Link Patient
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
