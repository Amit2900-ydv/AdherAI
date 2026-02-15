import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Scan, CheckCircle2, AlertCircle, Info, MessageSquare } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useLanguage } from '@/app/context/LanguageContext';
import { AIChatbot } from './AIChatbot';

type ScanStatus = 'ready' | 'scanning' | 'success' | 'error';

export function ScanScreen() {
  const { t } = useLanguage();
  const [scanStatus, setScanStatus] = useState<ScanStatus>('ready');
  const [scanResult, setScanResult] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleScan = () => {
    setScanStatus('scanning');

    // Simulate AI scanning
    setTimeout(() => {
      setScanStatus('success');
      setScanResult({
        name: 'Metformin',
        dosage: '500mg',
        manufacturer: 'Teva Pharmaceuticals',
        batchNumber: 'MF2024-A123',
        expiryDate: '12/2025',
        verified: true,
        confidence: 98,
        warnings: []
      });
    }, 2500);
  };

  const resetScan = () => {
    setScanStatus('ready');
    setScanResult(null);
  };

  return (
    <div className="pb-24 px-4 pt-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ fontWeight: 700 }}>{t('scan.title')}</h1>
        <p className="text-gray-600">{t('scan.subtitle')}</p>
      </div>

      {/* Scan Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-3xl overflow-hidden mb-6 relative"
        style={{ height: '400px' }}
      >
        {/* Camera Viewfinder */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            {scanStatus === 'ready' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white"
              >
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm opacity-70">{t('scan.instruction')}</p>
              </motion.div>
            )}

            {scanStatus === 'scanning' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative"
              >
                <motion.div
                  className="w-48 h-48 border-4 border-blue-500 rounded-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute inset-0 border-t-4 border-blue-400"
                  animate={{
                    y: [0, 180],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
                <p className="text-white text-sm mt-6 text-center">{t('scan.analyzing')}</p>
              </motion.div>
            )}

            {scanStatus === 'success' && scanResult && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <p className="text-white text-lg mb-2" style={{ fontWeight: 700 }}>{t('scan.verified')}</p>
                <p className="text-green-400 text-sm">{t('scan.confidence').replace('{confidence}', scanResult.confidence.toString())}</p>
              </motion.div>
            )}
          </div>

          {/* Scan Frame Corners */}
          {scanStatus !== 'success' && (
            <>
              <div className="absolute top-20 left-20 w-12 h-12 border-l-4 border-t-4 border-white/30 rounded-tl-xl" />
              <div className="absolute top-20 right-20 w-12 h-12 border-r-4 border-t-4 border-white/30 rounded-tr-xl" />
              <div className="absolute bottom-20 left-20 w-12 h-12 border-l-4 border-b-4 border-white/30 rounded-bl-xl" />
              <div className="absolute bottom-20 right-20 w-12 h-12 border-r-4 border-b-4 border-white/30 rounded-br-xl" />
            </>
          )}
        </div>
      </motion.div>

      {/* Scan Results */}
      {scanStatus === 'success' && scanResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg mb-4" style={{ fontWeight: 700 }}>{t('scan.results')}</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">{t('scan.med_name')}</span>
              <span className="text-sm" style={{ fontWeight: 600 }}>{scanResult.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">{t('scan.dosage')}</span>
              <span className="text-sm" style={{ fontWeight: 600 }}>{scanResult.dosage}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">{t('scan.manufacturer')}</span>
              <span className="text-sm" style={{ fontWeight: 600 }}>{scanResult.manufacturer}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">{t('scan.batch')}</span>
              <span className="text-sm" style={{ fontWeight: 600 }}>{scanResult.batchNumber}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">{t('scan.expiry')}</span>
              <span className="text-sm" style={{ fontWeight: 600 }}>{scanResult.expiryDate}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-gray-600">{t('scan.status')}</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full" style={{ fontWeight: 600 }}>
                {t('scan.authentic')}
              </span>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-4 border border-green-100 mb-4">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm mb-1" style={{ fontWeight: 600 }}>{t('scan.complete')}</p>
                <p className="text-xs text-gray-600">{t('scan.safety_msg')}</p>
              </div>
            </div>
          </div>

          <Button
            onClick={resetScan}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Scan className="w-5 h-5 mr-2" />
            {t('scan.another')}
          </Button>
        </motion.div>
      )}

      {/* Scan Button */}
      {scanStatus === 'ready' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={handleScan}
            className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg shadow-xl"
          >
            <Scan className="w-6 h-6 mr-2" />
            {t('scan.start')}
          </Button>
        </motion.div>
      )}

      {/* How It Works */}
      {scanStatus === 'ready' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-blue-50 rounded-2xl p-5 border border-blue-100"
        >
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm mb-2" style={{ fontWeight: 700 }}>{t('scan.how_it_works')}</h4>
              <ul className="text-xs text-gray-700 space-y-2">
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>{t('scan.step1')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>{t('scan.step2')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>{t('scan.step3')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>{t('scan.step4')}</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Chat Bot Invitation */}
      {(scanStatus === 'ready' || scanStatus === 'success') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-purple-50 rounded-3xl p-6 border border-purple-100 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-gray-900">{t('scan.chatbot_title')}</h4>
              <p className="text-xs text-gray-600">{t('scan.chatbot_desc')}</p>
            </div>
          </div>
          <Button
            onClick={() => setIsChatOpen(true)}
            variant="outline"
            className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-100/50 hover:text-purple-800 rounded-xl"
          >
            {t('scan.chatbot_button')}
          </Button>
        </motion.div>
      )}

      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
