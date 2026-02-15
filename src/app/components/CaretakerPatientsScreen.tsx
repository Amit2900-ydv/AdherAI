import { motion } from 'motion/react';
import { Search, Phone, Eye, Mail, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';
import { AddPatientModal, NewPatient } from '@/app/components/AddPatientModal';
import { usePatientContext } from '@/app/context/PatientContext';

interface CaretakerPatientsScreenProps {
    caretakerId: string;
    onViewPatient: (patientId: string) => void;
}

export function CaretakerPatientsScreen({ caretakerId, onViewPatient }: CaretakerPatientsScreenProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { getPatientsByCaretaker, addPatient, deletePatient } = usePatientContext();
    const patients = getPatientsByCaretaker(caretakerId);
    console.log('CaretakerPatientsScreen rendered', { caretakerId, patientCount: patients.length });

    const handleAddPatient = (newPatient: NewPatient) => {
        console.log('Adding new patient:', newPatient, 'for caretaker:', caretakerId);
        addPatient(caretakerId, {
            name: newPatient.name,
            email: newPatient.email,
            age: newPatient.age,
            avatar: '👤' // Default avatar
        });
    };

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getAdherenceColor = (score: number) => {
        if (score >= 90) return 'from-green-500 to-emerald-600';
        if (score >= 75) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-pink-600';
    };

    const getAdherenceTextColor = (score: number) => {
        if (score >= 90) return 'text-green-700';
        if (score >= 75) return 'text-orange-700';
        return 'text-red-700';
    };

    const formatLastCheckIn = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${Math.floor(diffHours / 24)}d ago`;
    };

    return (
        <div className="pb-10 px-4 pt-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <div className="flex justify-between items-center mb-1">
                    <h1 className="text-2xl" style={{ fontWeight: 700 }}>My Patients</h1>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-4 h-10 shadow-sm"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Patient
                    </Button>
                </div>
                <p className="text-gray-600">{patients.length} patients under your care</p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </motion.div>

            {/* Patient List */}
            <div className="space-y-4">
                {filteredPatients.map((patient, index) => (
                    <motion.div
                        key={patient.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"
                    >
                        {/* Patient Info */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                                {patient.avatar}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg mb-1" style={{ fontWeight: 700 }}>{patient.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{patient.age} years old</p>

                                {/* Contact Info */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Mail className="w-3 h-3" />
                                        <span>{patient.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Phone className="w-3 h-3" />
                                        <span>+91 {Math.floor(Math.random() * 9000000000 + 1000000000)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Row */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                            <div className="flex-1">
                                <p className="text-xs text-gray-600 mb-1">Adherence</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${getAdherenceColor(patient.adherenceScore)}`}
                                            style={{ width: `${patient.adherenceScore}%` }}
                                        />
                                    </div>
                                    <span className={`text-sm ${getAdherenceTextColor(patient.adherenceScore)}`} style={{ fontWeight: 700 }}>
                                        {patient.adherenceScore}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="text-center p-2 bg-blue-50 rounded-xl">
                                <p className="text-lg text-blue-900" style={{ fontWeight: 700 }}>{patient.medications.length}</p>
                                <p className="text-xs text-blue-700">Medications</p>
                            </div>
                            <div className="text-center p-2 bg-green-50 rounded-xl">
                                <p className="text-lg text-green-900" style={{ fontWeight: 700 }}>
                                    {patient.logs.filter(l => l.status === 'taken' || l.status === 'verified').length}
                                </p>
                                <p className="text-xs text-green-700">Taken</p>
                            </div>
                            <div className="text-center p-2 bg-red-50 rounded-xl">
                                <p className="text-lg text-red-900" style={{ fontWeight: 700 }}>{patient.missedMedsCount}</p>
                                <p className="text-xs text-red-700">Missed</p>
                            </div>
                        </div>

                        {/* Last Check-in */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                            <p className="text-xs text-gray-600">Last check-in: <span style={{ fontWeight: 600 }}>{formatLastCheckIn(patient.lastCheckIn)}</span></p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <Button
                                onClick={() => onViewPatient(patient.id)}
                                className="flex-1 h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                View Full Details
                            </Button>
                            <Button
                                variant="outline"
                                className="h-11 px-4 border-2 border-gray-200"
                                onClick={() => window.open(`tel:${patient.phone}`)}
                                title={`Call ${patient.phone}`}
                            >
                                <Phone className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-11 px-4 border-2 border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this patient?')) {
                                        deletePatient(patient.id, caretakerId);
                                    }
                                }}
                                title="Delete Patient"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredPatients.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No patients found</p>
                </div>
            )}

            {/* Add Patient Modal */}

            {/* Add Patient Modal */}
            <AddPatientModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddPatient={handleAddPatient}
            />
        </div>
    );
}
