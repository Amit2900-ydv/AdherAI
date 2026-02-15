import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Plus, Bell, Shield, Phone, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { usePatientContext } from '@/app/context/PatientContext';
import { useAuth } from '@/app/context/AuthContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { toast } from 'sonner';

export function CaregiverScreen() {
  const { t } = useLanguage();
  const { caretakers, linkPatientToCaretaker, getPatientsByCaretaker } = usePatientContext();
  const { user } = useAuth();
  const [caretakerIdInput, setCaretakerIdInput] = useState('');

  // Filter caregivers that this patient is linked to
  const myCaregivers = caretakers.filter(c => user?.patientId && c.patientIds.includes(user.patientId));

  const handleLinkCaretaker = () => {
    if (!user?.patientId) return;

    const result = linkPatientToCaretaker(user.patientId, caretakerIdInput);
    if (result.success) {
      toast.success(t('safety.link_success') || 'Successfully linked to Caregiver!');
      setCaretakerIdInput('');
    } else {
      toast.error(result.message || t('safety.link_error') || 'Failed to link caretaker');
    }
  };

  const emergencyProtocol = [
    t('safety.trigger_missed_2'),
    t('safety.trigger_low_adherence'),
    t('safety.trigger_no_activity'),
    t('safety.trigger_critical_missed')
  ];

  return (
    <div className="pb-24 px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl mb-2" style={{ fontWeight: 700 }}>{t('menu.safety.label')}</h1>
        <p className="text-gray-600">{t('menu.safety.desc')}</p>
      </div>

      {/* Safety Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => alert('Opening detailed Safety Audit log...')}
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 mb-6 text-white shadow-xl cursor-pointer hover:scale-[1.01] transition-transform active:scale-[0.99]"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Shield className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <p className="text-sm opacity-90 mb-1">{t('safety.status')}</p>
            <p className="text-2xl" style={{ fontWeight: 700 }}>{t('safety.all_good')}</p>
          </div>
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
          <p className="text-xs opacity-90 mb-1">{t('safety.last_checkin')}</p>
          <p className="text-sm" style={{ fontWeight: 600 }}>{t('common.today')} {t('common.at')} 8:15 AM</p>
        </div>
      </motion.div>

      {/* Add Caretaker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              {t('safety.add_caregiver')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('safety.link_title')}</DialogTitle>
              <DialogDescription>
                {t('safety.link_desc')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="caretaker-id">{t('safety.id_label')}</Label>
                <Input
                  id="caretaker-id"
                  placeholder="e.g. c1"
                  value={caretakerIdInput}
                  onChange={(e) => setCaretakerIdInput(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleLinkCaretaker}>{t('safety.link_button')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Caregiver List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="text-lg mb-3" style={{ fontWeight: 700 }}>{t('safety.care_team')}</h3>
        <div className="space-y-3">
          {myCaregivers.length === 0 ? (
            <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>{t('safety.no_caregivers')}</p>
              <p className="text-xs">{t('safety.add_hint')}</p>
            </div>
          ) : (
            myCaregivers.map((caregiver, index) => (
              <motion.div
                key={caregiver.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                    {'👩‍⚕️'}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm mb-1" style={{ fontWeight: 700 }}>{caregiver.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{caregiver.role}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1" style={{ fontWeight: 600 }}>
                        <Bell className="w-3 h-3" />
                        {t('safety.alerts_on')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone className="w-4 h-4 text-blue-600" />
                    {/* Mock phone/email since they aren't in Caretaker Type yet, or add them? caretake structure in mockData has name/email/role */}
                    {caregiver.email}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => alert(`Calling ${caregiver.name}...`)}
                    variant="outline"
                    className="flex-1 h-10 border-2 border-gray-200"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t('common.call')}
                  </Button>
                  <Button
                    onClick={() => alert(`Sending notification to ${caregiver.name}...`)}
                    variant="outline"
                    className="flex-1 h-10 border-2 border-gray-200"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    {t('common.notify')}
                  </Button>
                </div>
              </motion.div>
            )))}
        </div>
      </motion.div>

      {/* Emergency Protocol */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-amber-50 rounded-2xl p-5 border border-amber-200 mb-6"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm mb-2" style={{ fontWeight: 700 }}>{t('safety.alert_triggers')}</h4>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              {t('safety.alert_hint')}
            </p>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {emergencyProtocol.map((trigger, index) => (
            <li
              key={index}
              onClick={() => alert(`Testing alert for: ${trigger}`)}
              className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer hover:bg-amber-100/50 p-1 rounded-lg transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
              {trigger}
            </li>
          ))}
        </ul>

        <Button
          onClick={() => alert('Opening alert configuration...')}
          variant="outline"
          className="w-full h-10 border-2 border-amber-300 text-amber-700 hover:bg-amber-100"
        >
          {t('safety.alert_settings')}
        </Button>
      </motion.div>

      {/* Sharing Permissions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-5 border border-gray-100"
      >
        <h4 className="text-sm mb-4" style={{ fontWeight: 700 }}>{t('safety.visibility_title')}</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold">{t('ai.adherence')}</span>
            </div>
            <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1.5 border border-green-100">
              <Shield className="w-3 h-3" />
              <span className="text-[10px]" style={{ fontWeight: 700 }}>{t('safety.permanent')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold">{t('safety.missed_meds')}</span>
            </div>
            <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1.5 border border-green-100">
              <Shield className="w-3 h-3" />
              <span className="text-[10px]" style={{ fontWeight: 700 }}>{t('safety.mandatory')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold">{t('menu.schedule.label')}</span>
            </div>
            <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1.5 border border-green-100">
              <Shield className="w-3 h-3" />
              <span className="text-[10px]" style={{ fontWeight: 700 }}>{t('safety.shared')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold">{t('ai.insights')}</span>
            </div>
            <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full flex items-center gap-1.5 border border-green-100">
              <Shield className="w-3 h-3" />
              <span className="text-[10px]" style={{ fontWeight: 700 }}>{t('safety.permanent')}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Safety Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 bg-blue-50 rounded-2xl p-5 border border-blue-100"
      >
        <div className="flex items-start gap-3 mb-4">
          <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm mb-2" style={{ fontWeight: 700 }}>{t('safety.benefits_title')}</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex gap-2">
                <span>•</span>
                <span>{t('safety.ben_monitoring')}</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>{t('safety.ben_alerts')}</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>{t('safety.ben_comm')}</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>{t('safety.ben_reports')}</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Privacy Notice */}
      <div className="mt-6 bg-purple-50 rounded-2xl p-4 border border-purple-100">
        <p className="text-xs text-gray-700 leading-relaxed">
          <span style={{ fontWeight: 600 }}>{t('safety.privacy_title')}:</span> {t('safety.privacy_desc')}
        </p>
      </div>
    </div>
  );
}
