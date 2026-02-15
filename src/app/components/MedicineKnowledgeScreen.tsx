import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Pill, AlertTriangle, Info, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { medications, Medication } from '@/app/data/mockData';
import { useLanguage } from '@/app/context/LanguageContext';

interface MedicineKnowledgeScreenProps {
  initialMedication?: Medication;
  onOpenChat: () => void;
}

export function MedicineKnowledgeScreen({ initialMedication, onOpenChat }: MedicineKnowledgeScreenProps) {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(initialMedication?.id || medications[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (initialMedication) {
      setExpandedId(initialMedication.id);
    }
  }, [initialMedication]);

  return (
    <div className="pb-24 px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ fontWeight: 700 }}>{t('kb.title')}</h1>
        <p className="text-gray-600">{t('kb.subtitle')}</p>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-6"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={t('kb.search_placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>

      {/* Your Medications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h3 className="text-lg mb-3" style={{ fontWeight: 700 }}>{t('kb.your_meds')}</h3>
        <div className="space-y-4">
          {filteredMedications.map((med) => {
            const isExpanded = expandedId === med.id;
            return (
              <div key={med.id} className="space-y-3">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : med.id)}
                  className={`w-full bg-white rounded-2xl p-4 border transition-all ${isExpanded ? 'border-blue-500 shadow-md transform scale-[1.02]' : 'border-gray-100'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: med.color }}
                    >
                      <Pill className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm mb-1" style={{ fontWeight: 600 }}>{med.name}</p>
                      <p className="text-xs text-gray-600">{med.dosage} • {med.frequency}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className={`w-5 h-5 transition-colors ${isExpanded ? 'text-blue-600' : 'text-gray-400'}`} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden px-1"
                    >
                      <div className="space-y-4 pb-4">
                        {/* Purpose */}
                        <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 backdrop-blur-sm">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                              <Info className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm mb-2" style={{ fontWeight: 700 }}>{t('kb.purpose')}</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{t(med.purpose)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <BookOpen className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm mb-2" style={{ fontWeight: 700 }}>{t('kb.instructions')}</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{t(med.instructions)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Side Effects */}
                        <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 backdrop-blur-sm">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                              <AlertTriangle className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm mb-3" style={{ fontWeight: 700 }}>{t('kb.side_effects')}</h4>
                              <ul className="space-y-2">
                                {med.sideEffects.map((effect: any, index: number) => (
                                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    {t(effect)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Medication Details */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                          <h4 className="text-sm mb-4" style={{ fontWeight: 700 }}>{t('kb.details')}</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-sm text-gray-600">{t('kb.dosage')}</span>
                              <span className="text-sm" style={{ fontWeight: 600 }}>{med.dosage}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-sm text-gray-600">{t('kb.frequency')}</span>
                              <span className="text-sm" style={{ fontWeight: 600 }}>{med.frequency}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                              <span className="text-sm text-gray-600">{t('kb.shape')}</span>
                              <span className="text-sm capitalize" style={{ fontWeight: 600 }}>{med.shape}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <span className="text-sm text-gray-600">{t('kb.times')}</span>
                              <span className="text-sm" style={{ fontWeight: 600 }}>{med.times.join(', ')}</span>
                            </div>
                          </div>
                        </div>

                        {/* AI Assistant CTA */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-5 border border-purple-100 shadow-sm">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="text-2xl">🤖</div>
                            <div className="flex-1">
                              <h4 className="text-sm mb-1" style={{ fontWeight: 700 }}>{t('kb.have_questions')}</h4>
                              <p className="text-xs text-gray-600">{t('kb.ask_desc')}</p>
                            </div>
                          </div>
                          <Button
                            onClick={onOpenChat}
                            className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                          >
                            {t('kb.ask_ai')}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>


      {/* Medical Disclaimer */}
      <div className="mt-6 bg-red-50 rounded-2xl p-4 border border-red-100">
        <p className="text-xs text-gray-700 leading-relaxed">
          <span style={{ fontWeight: 600 }}>{t('kb.disclaimer_title')}:</span> {t('kb.disclaimer_desc')}
        </p>
      </div>
    </div>
  );
}
