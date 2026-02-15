import { useState } from 'react';
import { motion } from 'motion/react';
import { Pill, Bell, ChevronRight, Activity, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Medication } from '@/app/data/mockData';
import { useLanguage } from '@/app/context/LanguageContext';
import { usePatientContext } from '@/app/context/PatientContext';
import { useAuth } from '@/app/context/AuthContext';

interface ScheduleScreenProps {
  onNavigate: (screen: any) => void;
  onSelectMedication: (med: Medication) => void;
}

export function ScheduleScreen({ onNavigate, onSelectMedication }: ScheduleScreenProps) {
  const { t } = useLanguage();
  const { patients } = usePatientContext();
  const { user } = useAuth();

  // Get current patient data
  const currentPatient = patients.find((p: any) => p.id === user?.patientId) || patients[0];
  const medications = currentPatient.medications;

  const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const [selectedDay, setSelectedDay] = useState('sun'); // Default to Sunday to match current demo time
  const currentDay = 'sun';

  const getDayNumber = (day: string) => {
    const today = new Date();
    const dayIndex = daysOfWeek.indexOf(day);
    const currentDayIndex = daysOfWeek.indexOf(currentDay); // Assuming currentDay is 'fri' for demo
    const diff = dayIndex - currentDayIndex;
    const date = new Date(today);
    date.setDate(today.getDate() + diff);
    return date.getDate();
  };

  return (
    <div className="pb-10 px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ fontWeight: 700 }}>{t('schedule.title')}</h1>
        <p className="text-gray-600">{t('schedule.description')}</p>
      </div>

      {/* Weekly Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-4 mb-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <span className="text-sm" style={{ fontWeight: 600 }}>{t('schedule.month_year')}</span>
          </div>
          <span className="text-xs text-gray-500">{t('schedule.week')} 3</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day: string) => (
            <div
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${day === selectedDay
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
            >
              <span className="text-xs mb-1">{t(`days.${day}`)}</span>
              <span className={`text-lg ${day === selectedDay ? '' : 'text-gray-900'}`} style={{ fontWeight: 700 }}>
                {getDayNumber(day)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Selection Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg" style={{ fontWeight: 700 }}>
            {selectedDay === currentDay ? t('schedule.today_schedule') : `${t(`days.${selectedDay}`)} ${t('schedule.schedule')}`}
          </h3>
          <Button
            size="sm"
            variant="ghost"
            className="text-blue-600 hover:bg-blue-50"
            onClick={() => onNavigate('schedule')}
          >
            <Activity className="w-4 h-4 mr-1" />
            {t('common.add')}
          </Button>
        </div>

        {/* Dynamic Schedule by Time */}
        {(() => {
          // Get all unique times from medications
          const allTimes: string[] = Array.from(new Set(medications.flatMap((med: Medication) => med.times))).sort() as string[];

          if (allTimes.length === 0) {
            return (
              <div className="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-500">{t('home.no_meds')}</p>
              </div>
            );
          }

          return allTimes.map((time: string) => {
            const medsAtTime = medications.filter((med: Medication) => med.times.includes(time));

            // Filtering logic for demo (keeping original logic if any)
            const filteredMeds = medsAtTime.filter((med: Medication) => {
              if ((selectedDay === 'sat' || selectedDay === 'sun') && med.name === 'Metformin' && time === '08:00') return false;
              if ((selectedDay === 'sat' || selectedDay === 'sun') && med.name === 'Lisinopril' && time === '20:00') return false;
              return true;
            });

            if (filteredMeds.length === 0) return null;

            const hour = parseInt(time.split(':')[0]);
            const isMorning = hour < 12;
            const isAfternoon = hour >= 12 && hour < 17;

            return (
              <div key={time} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isMorning ? 'bg-yellow-100' : isAfternoon ? 'bg-orange-100' : 'bg-purple-100'}`}>
                    <span className="text-lg">{isMorning ? '🌅' : isAfternoon ? '☀️' : '🌙'}</span>
                  </div>
                  <h4 className="text-sm text-gray-600" style={{ fontWeight: 600 }}>
                    {isMorning ? t('schedule.morning') : isAfternoon ? 'Afternoon' : t('schedule.evening')} • {time}
                  </h4>
                </div>
                <div className="space-y-2 pl-10">
                  {filteredMeds.map((med: Medication) => (
                    <div
                      key={`${med.id}-${time}`}
                      onClick={() => onSelectMedication(med)}
                      className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3 cursor-pointer hover:border-blue-200 transition-colors"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: `${med.color}20` }}
                      >
                        <span className="text-xl">{med.shape === 'round' ? '💊' : '🧪'}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm mb-1" style={{ fontWeight: 600 }}>{med.name}</p>
                        <p className="text-xs text-gray-600">{med.dosage}</p>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <Bell className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          });
        })()}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-100"
      >
        <h4 className="text-sm mb-4 text-gray-700" style={{ fontWeight: 700 }}>{t('home.adherence_summary')}</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>{medications.length}</p>
            <p className="text-xs text-gray-600">{t('schedule.active_medications')}</p>
          </div>
          <div>
            <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>
              {medications.reduce((sum: number, med: Medication) => sum + med.times.length, 0)}
            </p>
            <p className="text-xs text-gray-600">{t('schedule.daily_doses')}</p>
          </div>
        </div>
      </motion.div>

      {/* Reminders Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-white rounded-2xl p-5 border border-gray-100"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm mb-2" style={{ fontWeight: 700 }}>{t('schedule.reminders_active')}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t('schedule.reminders_desc')}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
