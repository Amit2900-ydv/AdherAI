import { motion } from 'motion/react';
import { TrendingUp, Calendar, Users, Activity, Download, Filter } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Patient } from '@/app/data/mockData';
import { usePatientContext } from '@/app/context/PatientContext';
import { useLanguage } from '@/app/context/LanguageContext';

interface CaretakerReportsScreenProps {
    patientIds: string[];
}

export function CaretakerReportsScreen({ patientIds }: CaretakerReportsScreenProps) {
    const { t } = useLanguage();
    const { patients: allPatients } = usePatientContext();
    const patients = patientIds.map(id => allPatients.find(p => p.id === id)).filter(Boolean) as Patient[];

    const getAdherenceColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 75) return 'text-orange-600';
        return 'text-red-600';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="pb-24 px-4 pt-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h1 className="text-2xl mb-1" style={{ fontWeight: 700 }}>{t('caretaker.reports_title')}</h1>
                <p className="text-gray-600">{t('caretaker.reports_desc')}</p>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
                <Button className="flex-1 h-11 bg-gradient-to-r from-blue-500 to-purple-600">
                    <Download className="w-4 h-4 mr-2" />
                    {t('caretaker.export_all')}
                </Button>
                <Button variant="outline" className="h-11 px-4 border-2">
                    <Filter className="w-4 h-4" />
                </Button>
            </div>

            {/* Overall Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-5 mb-6 border border-gray-100 shadow-sm"
            >
                <h2 className="text-lg mb-4" style={{ fontWeight: 700 }}>{t('caretaker.overall_stats')}</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <p className="text-xs text-blue-700">{t('caretaker.total_patients')}</p>
                        </div>
                        <p className="text-2xl text-blue-900" style={{ fontWeight: 700 }}>{patients.length}</p>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <p className="text-xs text-green-700">{t('caretaker.avg_adherence')}</p>
                        </div>
                        <p className="text-2xl text-green-900" style={{ fontWeight: 700 }}>
                            {Math.round(patients.reduce((sum, p) => sum + p.adherenceScore, 0) / patients.length)}%
                        </p>
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-purple-600" />
                            <p className="text-xs text-purple-700">{t('caretaker.total_meds')}</p>
                        </div>
                        <p className="text-2xl text-purple-900" style={{ fontWeight: 700 }}>
                            {patients.reduce((sum, p) => sum + p.medications.length, 0)}
                        </p>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-orange-600" />
                            <p className="text-xs text-orange-700">{t('caretaker.missed_total')}</p>
                        </div>
                        <p className="text-2xl text-orange-900" style={{ fontWeight: 700 }}>
                            {patients.reduce((sum, p) => sum + p.missedMedsCount, 0)}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Patient Reports */}
            <h2 className="text-lg mb-3" style={{ fontWeight: 700 }}>{t('caretaker.patient_details')}</h2>

            <div className="space-y-4">
                {patients.map((patient, index) => (
                    <motion.div
                        key={patient.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"
                    >
                        {/* Patient Header */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                                {patient.avatar}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base mb-1" style={{ fontWeight: 700 }}>{patient.name}</h3>
                                <p className="text-xs text-gray-600">{t('caretaker.years_old').replace('{age}', patient.age.toString())}</p>
                            </div>
                            <div className={`text-right ${getAdherenceColor(patient.adherenceScore)}`}>
                                <p className="text-2xl" style={{ fontWeight: 700 }}>{patient.adherenceScore}%</p>
                                <p className="text-xs">{t('caretaker.adherence')}</p>
                            </div>
                        </div>

                        {/* Last Check-in */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                            <p className="text-xs text-gray-600 mb-1">{t('caretaker.last_checkin')}</p>
                            <p className="text-sm" style={{ fontWeight: 600 }}>{formatDate(patient.lastCheckIn)}</p>
                        </div>

                        {/* Recent Medications */}
                        <div>
                            <p className="text-sm mb-2" style={{ fontWeight: 600 }}>{t('caretaker.recent_med_activity')}</p>
                            <div className="space-y-2">
                                {patient.logs.slice(0, 3).map((log) => (
                                    <div key={log.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <p className="text-xs" style={{ fontWeight: 600 }}>{log.medicationName}</p>
                                            <p className="text-xs text-gray-600">
                                                {log.status === 'taken' || log.status === 'verified'
                                                    ? t('caretaker.taken_at').replace('{time}', log.actualTime || '')
                                                    : t('caretaker.missed_at').replace('{time}', log.scheduledTime)}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs ${log.status === 'taken' || log.status === 'verified'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                            }`} style={{ fontWeight: 600 }}>
                                            {t(`status.${log.status}`)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                            <div className="text-center">
                                <p className="text-lg" style={{ fontWeight: 700 }}>{patient.medications.length}</p>
                                <p className="text-xs text-gray-600">{t('caretaker.total_meds')}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg" style={{ fontWeight: 700 }}>{patient.logs.filter(l => l.status === 'taken' || l.status === 'verified').length}</p>
                                <p className="text-xs text-gray-600">{t('status.taken')}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg text-red-600" style={{ fontWeight: 700 }}>{patient.missedMedsCount}</p>
                                <p className="text-xs text-gray-600">{t('status.missed')}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
