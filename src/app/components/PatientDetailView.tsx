import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Activity, FileText, Phone, Mail, AlertCircle, CheckCircle2, Clock, Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Patient, Medication } from '@/app/data/mockData';
import { useState } from 'react';
import { AddMedicationModal } from '@/app/components/AddMedicationModal';
import { usePatientContext } from '@/app/context/PatientContext';
import { useLanguage } from '@/app/context/LanguageContext';

interface PatientDetailViewProps {
    patient: Patient;
    onBack: () => void;
}

type Tab = 'overview' | 'schedule' | 'logs';

export function PatientDetailView({ patient, onBack }: PatientDetailViewProps) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [isAddMedicationModalOpen, setIsAddMedicationModalOpen] = useState(false);
    const { addMedication } = usePatientContext();

    const handleAddMedication = (medication: Omit<Medication, 'id'>) => {
        addMedication(patient.id, medication);
        setIsAddMedicationModalOpen(false);
    };

    const getAdherenceColor = (score: number) => {
        if (score >= 90) return 'from-green-500 to-emerald-600';
        if (score >= 75) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-pink-600';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'taken':
            case 'verified':
                return 'bg-green-100 text-green-700';
            case 'missed':
                return 'bg-red-100 text-red-700';
            case 'pending':
                return 'bg-gray-100 text-gray-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className="pb-24 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 pt-6 pb-8">
                <div className="flex justify-between items-start mb-4">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="text-white hover:bg-white/20 -ml-2"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        {t('caretaker.back_to_patients')}
                    </Button>
                    <Button
                        onClick={() => setIsAddMedicationModalOpen(true)}
                        className="bg-white/20 hover:bg-white/30 text-white border border-white/40"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        {t('caretaker.add_medication')}
                    </Button>
                </div>

                <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl">
                        {patient.avatar}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl mb-1" style={{ fontWeight: 700 }}>{patient.name}</h1>
                        <p className="text-white/90 text-sm mb-2">{t('caretaker.years_old').replace('{age}', patient.age.toString())}</p>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{patient.email}</span>
                        </div>
                    </div>
                </div>

                {/* Adherence Score */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/90">{t('caretaker.current_adherence')}</span>
                        <span className="text-2xl" style={{ fontWeight: 700 }}>{patient.adherenceScore}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${patient.adherenceScore}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-white"
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 px-4 sticky top-0 z-10">
                <div className="flex gap-1 overflow-x-auto">
                    {[
                        { id: 'overview', label: t('caretaker.overview'), icon: Activity },
                        { id: 'schedule', label: t('caretaker.schedule'), icon: Calendar },
                        { id: 'logs', label: t('caretaker.logs'), icon: FileText }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm" style={{ fontWeight: activeTab === tab.id ? 600 : 400 }}>
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 pt-6">
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white rounded-2xl p-4 border border-gray-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    <p className="text-xs text-gray-600">{t('caretaker.total_meds')}</p>
                                </div>
                                <p className="text-2xl" style={{ fontWeight: 700 }}>{patient.medications.length}</p>
                            </div>

                            <div className="bg-white rounded-2xl p-4 border border-gray-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-4 h-4 text-red-600" />
                                    <p className="text-xs text-gray-600">{t('caretaker.missed_today')}</p>
                                </div>
                                <p className="text-2xl" style={{ fontWeight: 700 }}>{patient.missedMedsCount}</p>
                            </div>
                        </div>

                        {/* Last Check-in */}
                        <div className="bg-white rounded-2xl p-4 border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-purple-600" />
                                <p className="text-sm" style={{ fontWeight: 600 }}>{t('caretaker.last_checkin')}</p>
                            </div>
                            <p className="text-gray-600">
                                {new Date(patient.lastCheckIn).toLocaleString(undefined, {
                                    dateStyle: 'medium',
                                    timeStyle: 'short'
                                })}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-4 border border-gray-100">
                            <h3 className="text-sm mb-3" style={{ fontWeight: 600 }}>{t('caretaker.recent_activity')}</h3>
                            <div className="space-y-3">
                                {patient.logs.slice(0, 5).map((log) => (
                                    <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${log.status === 'taken' || log.status === 'verified' ? 'bg-green-100' :
                                            log.status === 'missed' ? 'bg-red-100' : 'bg-gray-100'
                                            }`}>
                                            {log.status === 'taken' || log.status === 'verified' ? (
                                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                            ) : log.status === 'missed' ? (
                                                <AlertCircle className="w-4 h-4 text-red-600" />
                                            ) : (
                                                <Clock className="w-4 h-4 text-gray-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm" style={{ fontWeight: 600 }}>{log.medicationName}</p>
                                            <p className="text-xs text-gray-600">
                                                {log.status === 'taken' || log.status === 'verified'
                                                    ? t('caretaker.taken_at').replace('{time}', log.actualTime || '')
                                                    : log.status === 'missed'
                                                        ? t('caretaker.missed_at').replace('{time}', log.scheduledTime)
                                                        : t('caretaker.pending_at').replace('{time}', log.scheduledTime)}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(log.status)}`} style={{ fontWeight: 600 }}>
                                            {t(`status.${log.status}`)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'schedule' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg" style={{ fontWeight: 700 }}>{t('caretaker.med_schedule')}</h3>
                        {patient.medications.map((med) => (
                            <div key={med.id} className="bg-white rounded-2xl p-4 border border-gray-100">
                                <div className="flex items-start gap-3 mb-3">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: med.color }}
                                    >
                                        <span className="text-2xl">💊</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm mb-1" style={{ fontWeight: 700 }}>{med.name}</h4>
                                        <p className="text-xs text-gray-600">{med.dosage} • {med.frequency}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {med.times.map((time) => (
                                        <span key={time} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs" style={{ fontWeight: 600 }}>
                                            {formatTime(time)}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600 mt-3">{t(med.instructions)}</p>
                            </div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'logs' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg" style={{ fontWeight: 700 }}>{t('caretaker.med_logs')}</h3>
                        {patient.logs.map((log) => (
                            <div key={log.id} className="bg-white rounded-2xl p-4 border border-gray-100">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h4 className="text-sm mb-1" style={{ fontWeight: 700 }}>{log.medicationName}</h4>
                                        <p className="text-xs text-gray-600">{t('caretaker.scheduled')}: {formatTime(log.scheduledTime)}</p>
                                        {log.actualTime && (
                                            <p className="text-xs text-gray-600">{t('caretaker.actual')}: {formatTime(log.actualTime)}</p>
                                        )}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(log.status)}`} style={{ fontWeight: 600 }}>
                                        {t(`status.${log.status}`)}
                                    </span>
                                </div>
                                {log.verificationMethod && (
                                    <div className="mt-2 pt-2 border-t border-gray-100">
                                        <p className="text-xs text-gray-500">{t('caretaker.verified_by')}: {t(`scan.method.${log.verificationMethod}`)}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
            {/* Add Medication Modal */}
            <AddMedicationModal
                isOpen={isAddMedicationModalOpen}
                onClose={() => setIsAddMedicationModalOpen(false)}
                onAdd={handleAddMedication}
            />
        </div>
    );
}
