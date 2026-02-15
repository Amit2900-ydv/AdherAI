import { motion } from 'motion/react';
import { Brain, TrendingUp, AlertCircle, CheckCircle2, Target, Zap, Calendar, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { weeklyAdherence, adherenceHistory, aiInsights } from '@/app/data/mockData';
import { useLanguage } from '@/app/context/LanguageContext';

export function AIDashboardScreen() {
  const { t } = useLanguage();
  const predictedAdherence = 94;
  const riskScore = t('ai.low_risk');
  const streakDays = 12;

  return (
    <div className="pb-24 px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ fontWeight: 700 }}>{t('ai.title')}</h1>
        <p className="text-gray-600">{t('ai.subtitle')}</p>
      </div>

      {/* AI Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => alert('Opening Health Score breakdown...')}
        className="bg-gradient-to-br from-purple-500 via-blue-600 to-blue-500 rounded-3xl p-6 mb-6 text-white shadow-2xl cursor-pointer hover:scale-[1.01] transition-transform active:scale-[0.99]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm opacity-90">{t('ai.health_score')}</p>
            <p className="text-3xl" style={{ fontWeight: 700 }}>89/100</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-xs opacity-80 mb-1">{t('ai.adherence')}</p>
            <p className="text-lg" style={{ fontWeight: 700 }}>92%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-xs opacity-80 mb-1">{t('ai.risk_level')}</p>
            <p className="text-lg" style={{ fontWeight: 700 }}>{riskScore}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-xs opacity-80 mb-1">{t('ai.streak')}</p>
            <p className="text-lg" style={{ fontWeight: 700 }}>{streakDays}d</p>
          </div>
        </div>
      </motion.div>

      {/* Weekly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-5 mb-6 shadow-lg border border-gray-100"
      >
        <div
          onClick={() => alert('Detailed trend analysis opened!')}
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors"
        >
          <h3 className="text-lg" style={{ fontWeight: 700 }}>{t('ai.weekly_stats')}</h3>
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm" style={{ fontWeight: 600 }}>+8%</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyAdherence}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#6B7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="adherence" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#9333EA" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 6-Month Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-5 mb-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg mb-4" style={{ fontWeight: 700 }}>{t('ai.monthly_progress')}</h3>

        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={adherenceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" domain={[70, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h3 className="text-lg mb-3" style={{ fontWeight: 700 }}>{t('ai.insights')}</h3>
        <div className="space-y-3">
          {aiInsights.map((insight) => (
            <div
              key={insight.id}
              onClick={() => alert(`Insight action: ${insight.message.substring(0, 20)}...`)}
              className={`rounded-2xl p-4 border-2 cursor-pointer hover:scale-[1.02] transition-transform active:scale-[0.98] ${insight.type === 'warning'
                ? 'bg-amber-50 border-amber-200'
                : insight.type === 'success'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-blue-50 border-blue-200'
                }`}
            >
              <div className="flex gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${insight.type === 'warning'
                  ? 'bg-amber-500'
                  : insight.type === 'success'
                    ? 'bg-green-500'
                    : 'bg-blue-500'
                  }`}>
                  {insight.type === 'warning' && <AlertCircle className="w-5 h-5 text-white" />}
                  {insight.type === 'success' && <CheckCircle2 className="w-5 h-5 text-white" />}
                  {insight.type === 'info' && <Zap className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-1" style={{ fontWeight: 600 }}>
                    {new Date(insight.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-sm text-gray-800 leading-relaxed">{t(insight.message)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-5 border border-purple-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg" style={{ fontWeight: 700 }}>{t('ai.predictions')}</h3>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => alert('Showing detailed next-week predictions...')}
            className="w-full text-left bg-white rounded-xl p-4 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{t('ai.estimated_adherence')}</span>
              <span className="text-lg text-purple-600" style={{ fontWeight: 700 }}>{predictedAdherence}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                style={{ width: `${predictedAdherence}%` }}
              />
            </div>
          </button>

          <button
            onClick={() => alert('Best time analysis detailed view...')}
            className="w-full text-left bg-white rounded-xl p-4 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm" style={{ fontWeight: 600 }}>{t('ai.best_time')}</span>
            </div>
            <p className="text-xs text-gray-600">{t('ai.prediction.best_time_desc')}</p>
          </button>

          <button
            onClick={() => alert('Opening Goal Center...')}
            className="w-full text-left bg-white rounded-xl p-4 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm" style={{ fontWeight: 600 }}>{t('ai.prediction.goal')}</span>
            </div>
            <p className="text-xs text-gray-600">{t('ai.prediction.goal_desc')}</p>
          </button>
        </div>
      </motion.div>

      {/* AI Disclaimer */}
      <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100">
        <p className="text-xs text-gray-700 leading-relaxed">
          <span style={{ fontWeight: 600 }}>{t('ai.note')}:</span> {t('ai.disclaimer')}
        </p>
      </div>
    </div>
  );
}
