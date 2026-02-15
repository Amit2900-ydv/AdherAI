import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Camera, FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { todayLogs, medications } from '@/app/data/mockData';

import { useLanguage } from '@/app/context/LanguageContext';

type FilterType = 'all' | 'taken' | 'missed' | 'verified';

export function LogsScreen() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedDate, setSelectedDate] = useState('2026-01-17');

  const filteredLogs = todayLogs.filter(log => {
    if (filter === 'all') return true;
    if (filter === 'taken') return log.status === 'taken';
    if (filter === 'missed') return log.status === 'missed';
    if (filter === 'verified') return log.verificationMethod === 'scan';
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
      case 'verified':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'missed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken':
        return 'bg-green-50 border-green-100';
      case 'verified':
        return 'bg-blue-50 border-blue-100';
      case 'missed':
        return 'bg-red-50 border-red-100';
      case 'pending':
        return 'bg-gray-50 border-gray-100';
      default:
        return 'bg-white border-gray-100';
    }
  };

  return (
    <div className="pb-24 px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ fontWeight: 700 }}>{t('logs.title')}</h1>
        <p className="text-gray-600">{t('logs.subtitle')}</p>
      </div>

      {/* Date Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 mb-4 shadow-lg border border-gray-100 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">{t('logs.viewing_for')}</p>
            <p className="text-sm" style={{ fontWeight: 600 }}>Friday, Jan 17, 2026</p>
          </div>
        </div>
        <Button size="sm" variant="ghost" className="text-blue-600">
          {t('common.edit')}
        </Button>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2"
      >
        {[
          { value: 'all', label: t('logs.filter_all'), count: todayLogs.length },
          { value: 'taken', label: t('logs.filter_taken'), count: todayLogs.filter(l => l.status === 'taken').length },
          { value: 'verified', label: t('logs.filter_verified'), count: todayLogs.filter(l => l.verificationMethod === 'scan').length },
          { value: 'missed', label: t('logs.filter_missed'), count: todayLogs.filter(l => l.status === 'missed').length }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value as FilterType)}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${filter === tab.value
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            style={{ fontWeight: 600 }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>
            {todayLogs.filter(l => l.status === 'taken' || l.status === 'verified').length}
          </p>
          <p className="text-xs text-gray-600">{t('logs.filter_taken')}</p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <Camera className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>
            {todayLogs.filter(l => l.verificationMethod === 'scan').length}
          </p>
          <p className="text-xs text-gray-600">{t('logs.filter_verified')}</p>
        </div>

        <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
          <XCircle className="w-6 h-6 text-red-600 mb-2" />
          <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>
            {todayLogs.filter(l => l.status === 'missed').length}
          </p>
          <p className="text-xs text-gray-600">{t('logs.filter_missed')}</p>
        </div>
      </motion.div>

      {/* Log Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3 mb-6"
      >
        <h3 className="text-sm text-gray-600 mb-3" style={{ fontWeight: 600 }}>{t('logs.activity_log')}</h3>
        {filteredLogs.map((log) => {
          const med = medications.find(m => m.id === log.medicationId);
          return (
            <div
              key={log.id}
              className={`rounded-2xl p-4 border ${getStatusColor(log.status)}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getStatusIcon(log.status)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm mb-1" style={{ fontWeight: 600 }}>{log.medicationName}</p>
                      <p className="text-xs text-gray-600">Scheduled: {log.scheduledTime}</p>
                    </div>
                    {log.status !== 'pending' && log.status !== 'missed' && (
                      <span className="px-2 py-1 bg-white rounded-lg text-xs" style={{ fontWeight: 600 }}>
                        {log.actualTime}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded-lg text-xs ${log.status === 'verified' ? 'bg-blue-100 text-blue-700' :
                        log.status === 'taken' ? 'bg-green-100 text-green-700' :
                          log.status === 'missed' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                      }`} style={{ fontWeight: 600 }}>
                      {log.status === 'verified' ? t('logs.filter_verified') :
                        log.status === 'taken' ? t('logs.filter_taken') :
                          log.status === 'missed' ? t('logs.filter_missed') : t('logs.filter_all')}
                    </span>

                    {log.verificationMethod && (
                      <span className="px-2 py-1 bg-white rounded-lg text-xs text-gray-600 flex items-center gap-1">
                        {log.verificationMethod === 'scan' && <Camera className="w-3 h-3" />}
                        {log.verificationMethod === 'voice' && <span>🎤</span>}
                        {log.verificationMethod}
                      </span>
                    )}

                    {log.status === 'missed' && (
                      <span className="text-xs text-red-600">
                        Delay: {Math.floor(Math.random() * 30) + 10} min
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-5 border border-gray-100"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm mb-1" style={{ fontWeight: 700 }}>{t('reports.title')}</h4>
            <p className="text-xs text-gray-600">
              {t('logs.export_desc')}
            </p>
          </div>
        </div>

        <Button className="w-full h-11 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
          <Download className="w-4 h-4 mr-2" />
          {t('logs.export_pdf')}
        </Button>
      </motion.div>

      {/* Medical Disclaimer */}
      <div className="mt-6 bg-amber-50 rounded-2xl p-4 border border-amber-100">
        <p className="text-xs text-gray-700 leading-relaxed">
          <span style={{ fontWeight: 600 }}>{t('logs.disclaimer_title')}:</span> {t('logs.disclaimer')}
        </p>
      </div>
    </div>
  );
}
