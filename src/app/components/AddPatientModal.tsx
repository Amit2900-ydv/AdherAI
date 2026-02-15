import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, Calendar, Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface AddPatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPatient: (patient: NewPatient) => void;
}

export interface NewPatient {
    name: string;
    email: string;
    age: number;
    phone: string;
}

export function AddPatientModal({ isOpen, onClose, onAddPatient }: AddPatientModalProps) {
    const [formData, setFormData] = useState<NewPatient>({
        name: '',
        email: '',
        age: 0,
        phone: ''
    });
    const [errors, setErrors] = useState<Partial<NewPatient>>({});

    const validateForm = () => {
        const newErrors: Partial<NewPatient> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.age || formData.age < 1 || formData.age > 120) {
            newErrors.age = 18;
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onAddPatient(formData);
            setFormData({ name: '', email: '', age: 0, phone: '' });
            setErrors({});
            onClose();
        }
    };

    const handleChange = (field: keyof NewPatient, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
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
                            <h2 className="text-2xl" style={{ fontWeight: 700 }}>Add New Patient</h2>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm mb-2" style={{ fontWeight: 600 }}>
                                    <User className="w-4 h-4 inline mr-2" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="Enter patient name"
                                    className={`w-full h-12 px-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                />
                                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm mb-2" style={{ fontWeight: 600 }}>
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="patient@example.com"
                                    className={`w-full h-12 px-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                />
                                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                            </div>

                            {/* Age */}
                            <div>
                                <label className="block text-sm mb-2" style={{ fontWeight: 600 }}>
                                    <Calendar className="w-4 h-4 inline mr-2" />
                                    Age
                                </label>
                                <input
                                    type="number"
                                    value={formData.age || ''}
                                    onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                                    placeholder="Enter age"
                                    min="1"
                                    max="120"
                                    className={`w-full h-12 px-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${errors.age ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                />
                                {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm mb-2" style={{ fontWeight: 600 }}>
                                    <Phone className="w-4 h-4 inline mr-2" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    placeholder="+91 98765 43210"
                                    className={`w-full h-12 px-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                />
                                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
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
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Patient
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
