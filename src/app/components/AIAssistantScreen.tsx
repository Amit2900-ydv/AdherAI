import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, X, Globe } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useAuth } from '@/app/context/AuthContext';

interface AIAssistantScreenProps {
  onComplete: () => void;
}

type VoiceState = 'idle' | 'listening' | 'speaking';
type Language = 'en' | 'hi' | 'hinglish';

const greetings = {
  en: "Hi, I'm Adher AI. How can I help you today?",
  hi: "नमस्ते, मैं Adher AI हूं। मैं आपकी कैसे मदद कर सकता हूं?",
  hinglish: "Hi, main Adher AI hoon. Main aapki kaise madad kar sakta hoon?"
};

const languageLabels = {
  en: 'English',
  hi: 'हिंदी',
  hinglish: 'Hinglish'
};

// Language codes for speech synthesis
const speechLanguageCodes = {
  en: 'en-US',
  hi: 'hi-IN',
  hinglish: 'en-IN' // Use Indian English for Hinglish
};

export function AIAssistantScreen({ onComplete }: AIAssistantScreenProps) {
  const { voiceEnabled } = useAuth();
  const [voiceState, setVoiceState] = useState<VoiceState>('speaking');
  const [language, setLanguage] = useState<Language>('hi');
  const [micEnabled, setMicEnabled] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // Function to speak text using Web Speech API with high-quality voice
  const speakText = (text: string, lang: Language) => {
    // Cancel any ongoing speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLanguageCodes[lang];
      utterance.rate = 0.85; // Slower for better clarity and understanding
      utterance.pitch = 1.1; // Slightly higher pitch for a pleasant voice
      utterance.volume = 1.0;

      // Get appropriate voice for the language
      const voices = window.speechSynthesis.getVoices();
      const targetLang = speechLanguageCodes[lang];

      // Prioritize high-quality voices:
      // 1. Google voices (highest quality)
      // 2. Female voices (typically clearer)
      // 3. Any voice matching the language
      const googleVoice = voices.find(voice =>
        voice.lang.startsWith(targetLang.split('-')[0]) &&
        voice.name.toLowerCase().includes('google')
      );

      const femaleVoice = voices.find(voice =>
        voice.lang.startsWith(targetLang.split('-')[0]) &&
        (voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('zira') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('nicky'))
      );

      const anyMatchingVoice = voices.find(voice =>
        voice.lang.startsWith(targetLang.split('-')[0])
      );

      // Select the best available voice
      utterance.voice = googleVoice || femaleVoice || anyMatchingVoice || null;

      // Log selected voice for debugging
      if (utterance.voice) {
        console.log('Selected voice:', utterance.voice.name, utterance.voice.lang);
      }

      // Event handlers
      utterance.onstart = () => {
        setVoiceState('speaking');
      };

      utterance.onend = () => {
        setVoiceState('listening');
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setVoiceState('listening');
      };

      if (voiceEnabled) {
        window.speechSynthesis.speak(utterance);
      } else {
        // If voice is disabled, we still need to transition the state
        // to listening so the user can see the transcript and respond
        setVoiceState('speaking');
        setTimeout(() => {
          setVoiceState('listening');
        }, 1000); // Simulate speaking time
      }
    }
  };

  useEffect(() => {
    // Auto-activate assistant on mount
    setVoiceState('speaking');
    setTranscript(greetings[language]);

    // Load voices first (some browsers need this)
    if ('speechSynthesis' in window) {
      // Trigger voice loading
      window.speechSynthesis.getVoices();

      // Add event listener for when voices are loaded
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };

      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    // Small delay to ensure voices are loaded before speaking
    const timer = setTimeout(() => {
      speakText(greetings[language], language);
    }, 300);

    return () => {
      clearTimeout(timer);
      // Cleanup: stop any ongoing speech when component unmounts
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  const toggleMic = () => {
    setMicEnabled(!micEnabled);
    if (!micEnabled) {
      setVoiceState('listening');
    } else {
      setVoiceState('idle');
    }
  };

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
    setTranscript(greetings[lang]);
    setVoiceState('speaking');

    // Speak the greeting in the new language
    speakText(greetings[lang], lang);
  };

  const handleEndConversation = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Header Controls */}
      <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white"
        >
          <Globe className="w-5 h-5 text-blue-600" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleEndConversation}
          className="rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white"
        >
          <X className="w-5 h-5 text-gray-600" />
        </Button>
      </div>

      {/* Language Menu */}
      <AnimatePresence>
        {showLanguageMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-24 left-6 bg-white rounded-2xl shadow-xl p-2 z-50"
          >
            {(['en', 'hi', 'hinglish'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`w-full px-4 py-3 rounded-xl text-left transition-colors ${language === lang ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {languageLabels[lang]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assistant Identity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl">
          <div className="text-white text-4xl font-bold">A</div>
        </div>
        <h1 className="text-3xl mb-2" style={{ fontWeight: 700 }}>Adher AI</h1>
        <p className="text-gray-600 text-lg">Your Medication Assistant</p>
      </motion.div>

      {/* Voice Waves Animation */}
      <div className="relative w-full max-w-sm h-48 flex items-center justify-center mb-12">
        <AnimatePresence mode="wait">
          {voiceState === 'listening' && (
            <motion.div
              key="listening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-gradient-to-t from-blue-500 to-blue-300 rounded-full"
                  animate={{
                    height: [20, 60, 20],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}

          {voiceState === 'speaking' && (
            <motion.div
              key="speaking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-gradient-to-t from-purple-500 to-purple-300 rounded-full"
                  animate={{
                    height: [30, 80, 30],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.08,
                  }}
                />
              ))}
            </motion.div>
          )}

          {voiceState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-5 bg-gray-300 rounded-full"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* State Label */}
        <motion.div
          key={voiceState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium"
        >
          {voiceState === 'listening' && (
            <span className="text-blue-600">Listening...</span>
          )}
          {voiceState === 'speaking' && (
            <span className="text-purple-600">Speaking...</span>
          )}
          {voiceState === 'idle' && (
            <span className="text-gray-500">Mic off</span>
          )}
        </motion.div>
      </div>

      {/* Transcript */}
      <motion.div
        key={transcript}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto mb-12 text-center"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <p className="text-gray-800 text-lg leading-relaxed">{transcript}</p>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <Button
          size="icon"
          onClick={toggleMic}
          className={`w-20 h-20 rounded-full shadow-2xl transition-all ${micEnabled
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
            : 'bg-gray-400 hover:bg-gray-500'
            }`}
        >
          {micEnabled ? (
            <Mic className="w-8 h-8 text-white" />
          ) : (
            <MicOff className="w-8 h-8 text-white" />
          )}
        </Button>
      </div>

      {/* Quick Action Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 text-center"
      >
        <p className="text-sm text-gray-500 mb-2">Try saying:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="px-3 py-1 bg-white/60 rounded-full text-xs text-gray-700">
            "Show my schedule"
          </span>
          <span className="px-3 py-1 bg-white/60 rounded-full text-xs text-gray-700">
            "Did I take my morning meds?"
          </span>
        </div>
      </motion.div>
    </div>
  );
}
