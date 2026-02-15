import { motion } from 'motion/react';
import { FileText, Download, Share2, Calendar, CheckCircle2, TrendingUp, Mail } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useLanguage } from '@/app/context/LanguageContext';

export function ReportsScreen() {
  const { t } = useLanguage();
  const reports = [
    {
      id: '1',
      title: 'reports.monthly_title',
      period: 'reports.dec_2025',
      date: '2026-01-01',
      adherence: 91,
      status: 'complete'
    },
    {
      id: '2',
      title: 'reports.quarterly_title',
      period: 'reports.q4_2025',
      date: '2026-01-01',
      adherence: 89,
      status: 'complete'
    },
    {
      id: '3',
      title: 'reports.annual_title',
      period: 'reports.year_2025',
      date: '2026-01-01',
      adherence: 87,
      status: 'complete'
    }
  ];

  return (
    <div className="pb-24 px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ fontWeight: 700 }}>{t('menu.reports.label')}</h1>
        <p className="text-gray-600">{t('menu.reports.desc')}</p>
      </div>

      {/* Generate New Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 mb-6 text-white shadow-xl"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg mb-2" style={{ fontWeight: 700 }}>{t('reports.generate_custom')}</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {t('reports.generate_desc')}
            </p>
          </div>
        </div>

        <Button
          onClick={() => alert('Generating your custom medical report...')}
          className="w-full h-12 bg-white text-blue-600 hover:bg-blue-50"
        >
          <FileText className="w-5 h-5 mr-2" />
          {t('reports.create_new')}
        </Button>
      </motion.div>

      {/* Report Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <FileText className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>12</p>
          <p className="text-xs text-gray-600">{t('reports.count_label')}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>89%</p>
          <p className="text-xs text-gray-600">{t('reports.avg_score')}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <CheckCircle2 className="w-6 h-6 text-purple-600 mb-2" />
          <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>8</p>
          <p className="text-xs text-gray-600">{t('reports.shared_count')}</p>
        </div>
      </motion.div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="text-lg mb-3" style={{ fontWeight: 700 }}>{t('reports.recent')}</h3>
        <div className="space-y-3">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm mb-1" style={{ fontWeight: 700 }}>{t(report.title)}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <Calendar className="w-3 h-3" />
                    {t(report.period)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full" style={{ fontWeight: 600 }}>
                      {report.adherence}% {t('ai.adherence')}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full" style={{ fontWeight: 600 }}>
                      {t('reports.complete')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => alert(`Downloading ${report.title}...`)}
                  variant="outline"
                  className="flex-1 h-10 border-2 border-gray-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('reports.download')}
                </Button>
                <Button
                  onClick={() => alert(`Opening share options for ${report.title}...`)}
                  variant="outline"
                  className="flex-1 h-10 border-2 border-gray-200"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t('reports.share')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Share with Doctor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-green-50 rounded-2xl p-5 border border-green-100"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm mb-2" style={{ fontWeight: 700 }}>{t('reports.share_doctor_title')}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t('reports.share_doctor_desc')}
            </p>
          </div>
        </div>

        <Button
          onClick={() => alert('Emailing report to your registered doctor...')}
          className="w-full h-11 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          {t('reports.email_to_doctor')}
        </Button>
      </motion.div>

      {/* Report Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 bg-white rounded-2xl p-5 border border-gray-100"
      >
        <h4 className="text-sm mb-4" style={{ fontWeight: 700 }}>{t('reports.included_title')}</h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{t('reports.inc_adherence')}</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{t('reports.inc_logs')}</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{t('reports.inc_ai')}</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{t('reports.inc_trends')}</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{t('reports.inc_sides')}</span>
          </li>
        </ul>
      </motion.div>

      {/* Privacy Note */}
      <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100">
        <p className="text-xs text-gray-700 leading-relaxed">
          <span style={{ fontWeight: 600 }}>{t('reports.privacy_title')}:</span> {t('reports.privacy_desc')}
        </p>
      </div>
    </div>
  );
}
