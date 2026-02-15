import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'English' | 'Hindi' | 'Hinglish' | 'Marathi' | 'Gujarati';

interface Translations {
    [key: string]: {
        [key in Language]: string;
    };
}

const translations: Translations = {
    // Navigation
    'nav.home': {
        English: 'Home',
        Hindi: 'मुख्य',
        Hinglish: 'Home',
        Marathi: 'मुख्य',
        Gujarati: 'હોમ'
    },
    'nav.scan': {
        English: 'Scan',
        Hindi: 'स्कैन',
        Hinglish: 'Scan',
        Marathi: 'स्कॅन',
        Gujarati: 'સ્કેન'
    },
    'nav.alerts': {
        English: 'Alerts',
        Hindi: 'अलर्ट',
        Hinglish: 'Alerts',
        Marathi: 'अलर्ट',
        Gujarati: 'એલર્ટ'
    },
    'nav.schedule': {
        English: 'Schedule',
        Hindi: 'शेड्यूल',
        Hinglish: 'Schedule',
        Marathi: 'शेड्यूल',
        Gujarati: 'શેડ્યૂલ'
    },
    'nav.more': {
        English: 'More',
        Hindi: 'अधिक',
        Hinglish: 'More',
        Marathi: 'अधिक',
        Gujarati: 'વધુ'
    },
    'common.add': {
        English: 'Add',
        Hindi: 'जोड़ें',
        Hinglish: 'Add',
        Marathi: 'जोडा',
        Gujarati: 'ઉમેરો'
    },
    'common.today': {
        English: 'Today',
        Hindi: 'आज',
        Hinglish: 'Today',
        Marathi: 'आज',
        Gujarati: 'આજે'
    },

    // Home Screen
    'home.greeting': {
        English: 'Good Morning,',
        Hindi: 'नमस्ते,',
        Hinglish: 'Good Morning,',
        Marathi: 'शुभ सकाळ,',
        Gujarati: 'શુભ સવાર,'
    },
    'home.adherence_summary': {
        English: 'Adherence Summary',
        Hindi: 'दवा लेने का सारांश',
        Hinglish: 'Adherence Summary',
        Marathi: 'औषध घेण्याचा सारांश',
        Gujarati: 'દવા લેવાનો સારાંશ'
    },
    'home.taken': {
        English: 'Taken',
        Hindi: 'ली गई',
        Hinglish: 'Taken',
        Marathi: 'घेतली',
        Gujarati: 'લીધી'
    },
    'home.missed': {
        English: 'Missed',
        Hindi: 'छूट गई',
        Hinglish: 'Missed',
        Marathi: 'चुकली',
        Gujarati: 'ચૂકી ગયા'
    },
    'home.upcoming': {
        English: 'Upcoming',
        Hindi: 'आने वाली',
        Hinglish: 'Upcoming',
        Marathi: 'येणारी',
        Gujarati: 'આગામી'
    },

    // Schedule Screen
    'schedule.title': {
        English: 'Medication Schedule',
        Hindi: 'दवा का समय',
        Hinglish: 'Medication Schedule',
        Marathi: 'औषध वेळापत्रक',
        Gujarati: 'દવાનું સમયપત્રક'
    },
    'schedule.description': {
        English: 'Plan and manage your daily medications',
        Hindi: 'अपनी दैनिक दवाओं की योजना बनाएं और प्रबंधित करें',
        Hinglish: 'Plan and manage your daily medications',
        Marathi: 'तुमच्या दैनंदिन औषधांचे नियोजन आणि व्यवस्थापन करा',
        Gujarati: 'તમારી દૈનિક દવાઓનું આયોજન અને સંચાલન કરો'
    },
    'schedule.today_schedule': {
        English: "Today's Schedule",
        Hindi: 'आज का शेड्यूल',
        Hinglish: "Today's Schedule",
        Marathi: 'आजचे वेळापत्रक',
        Gujarati: 'આજનું સમયપત્રક'
    },
    'schedule.schedule': {
        English: 'Schedule',
        Hindi: 'शेड्यूल',
        Hinglish: 'Schedule',
        Marathi: 'वेळापत्रक',
        Gujarati: 'સમયપત્રક'
    },
    'schedule.active_medications': {
        English: 'Active Medications',
        Hindi: 'सक्रिय दवाएं',
        Hinglish: 'Active Medications',
        Marathi: 'सक्रिय औषधे',
        Gujarati: 'સક્રિય દવાઓ'
    },
    'schedule.daily_doses': {
        English: 'Daily Doses',
        Hindi: 'दैनिक खुराक',
        Hinglish: 'Daily Doses',
        Marathi: 'दैनंदिन डोस',
        Gujarati: 'દૈનિક ડોઝ'
    },
    'schedule.reminders_active': {
        English: 'Smart Reminders Active',
        Hindi: 'स्मार्ट रिमाइंडर सक्रिय हैं',
        Hinglish: 'Smart Reminders Active',
        Marathi: 'स्मार्ट स्मरणपत्र सक्रिय आहेत',
        Gujarati: 'સ્માર્ટ રીમાઇન્ડર્સ સક્રિય છે'
    },
    'schedule.reminders_desc': {
        English: "You'll receive voice and notification reminders 15 minutes before each scheduled dose.",
        Hindi: 'आपको हर निर्धारित खुराक से 15 मिनट पहले वॉयस और नोटिफिकेशन रिमाइंडर मिलेंगे।',
        Hinglish: "You'll receive voice and notification reminders 15 minutes before each scheduled dose.",
        Marathi: 'तुम्हाला प्रत्येक नियोजित डोसच्या १५ मिनिटे आधी व्हॉइस आणि नोटिफिकेशन स्मरणपत्रे मिळतील.',
        Gujarati: 'તમને દરેક નિર્ધારિત ડોઝના 15 મિનિટ પહેલા વોઇસ અને નોટિફિકેશન રીમાઇન્ડર્સ મળશે.'
    },


    // App Header
    'app.name': {
        English: 'AdherAI',
        Hindi: 'एडहेयरएआई',
        Hinglish: 'AdherAI',
        Marathi: 'एडहेयरएआई',
        Gujarati: 'એડહેયએઆઈ'
    },
    'app.tagline': {
        English: 'Voice-First Medication Intelligence',
        Hindi: 'वॉयस-फर्स्ट मेडिकेशन इंटेलिजेंस',
        Hinglish: 'Voice-First Medication Intelligence',
        Marathi: 'व्हॉइस-फर्स्ट मेडिकेशन इंटेलिजेंस',
        Gujarati: 'વોઇસ-ફર્સ્ટ મેડિકેશન ઇન્ટેલિજન્સ'
    },

    // Menu Drawer
    'menu.title': {
        English: 'More Features',
        Hindi: 'अतिरिक्त विशेषताएं',
        Hinglish: 'More Features',
        Marathi: 'अधिक वैशिष्ट्ये',
        Gujarati: 'વધુ સુવિધાઓ'
    },
    'menu.subtitle': {
        English: 'Explore all app features',
        Hindi: 'सभी ऐप सुविधाओं का पता लगाएं',
        Hinglish: 'Explore all app features',
        Marathi: 'सर्व ॲप वैशिष्ट्ये एक्सप्लोर करा',
        Gujarati: 'બધી એપ્લિકેશન સુવિધાઓ શોધો'
    },
    'menu.logs.label': {
        English: 'Medication Logs',
        Hindi: 'दवा लॉग',
        Hinglish: 'Medication Logs',
        Marathi: 'औषध लॉग',
        Gujarati: 'દવા લોગ'
    },
    'menu.logs.desc': {
        English: 'Track your medicine history',
        Hindi: 'अपनी दवा का इतिहास ट्रैक करें',
        Hinglish: 'Track your medicine history',
        Marathi: 'तुमचा औषध इतिहास ट्रॅक करा',
        Gujarati: 'તમારા દવાનો ઇતિહાસ ટ્રૅક કરો'
    },
    'menu.knowledge.label': {
        English: 'Medicine Knowledge',
        Hindi: 'दवा ज्ञान',
        Hinglish: 'Medicine Knowledge',
        Marathi: 'औषध ज्ञान',
        Gujarati: 'દવા જ્ઞાન'
    },
    'menu.knowledge.desc': {
        English: 'AI-powered medication education',
        Hindi: 'एआई-संचालित दवा शिक्षा',
        Hinglish: 'AI-powered medication education',
        Marathi: 'AI-सक्षम औषध शिक्षण',
        Gujarati: 'AI-સંચાલિત દવા શિક્ષણ'
    },
    'menu.ai.label': {
        English: 'AI Intelligence',
        Hindi: 'एआई इंटेलिजेंस',
        Hinglish: 'AI Intelligence',
        Marathi: 'AI इंटेलिजेंस',
        Gujarati: 'AI ઇન્ટેલિજન્સ'
    },
    'menu.ai.desc': {
        English: 'Insights and predictions',
        Hindi: 'अंतर्दृष्टि और भविष्यवाणियां',
        Hinglish: 'Insights and predictions',
        Marathi: 'अंतर्दृष्टी आणि अंदाज',
        Gujarati: 'આંતરદૃષ્ટિ અને આગાહીઓ'
    },
    'menu.reports.label': {
        English: 'Reports & Records',
        Hindi: 'रिपोर्ट और रिकॉर्ड',
        Hinglish: 'Reports & Records',
        Marathi: 'अहवाल आणि रेकॉर्ड',
        Gujarati: 'અહેવાલો અને રેકોર્ડ્સ'
    },
    'menu.reports.desc': {
        English: 'Medical documentation',
        Hindi: 'चिकित्सा दस्तावेज',
        Hinglish: 'Medical documentation',
        Marathi: 'वैद्यकीय माहिती',
        Gujarati: 'તબીબી દસ્તાવેજીકરણ'
    },
    'menu.caregiver.label': {
        English: 'Caregiver & Safety',
        Hindi: 'देखभाल करनेवाला और सुरक्षा',
        Hinglish: 'Caregiver & Safety',
        Marathi: 'काळजी घेणारा आणि सुरक्षितता',
        Gujarati: 'કેરગીવર અને સુરક્ષા'
    },
    'menu.caregiver.desc': {
        English: 'Connected care team',
        Hindi: 'जुड़ा हुआ देखभाल दल',
        Hinglish: 'Connected care team',
        Marathi: 'कनेक्टेड केअर टीम',
        Gujarati: 'કનેક્ટેડ કેअर ટીમ'
    },
    'menu.settings.label': {
        English: 'Settings',
        Hindi: 'सेटिंग्स',
        Hinglish: 'Settings',
        Marathi: 'सेटिंग्स',
        Gujarati: 'સેટિંગ્સ'
    },
    'menu.settings.desc': {
        English: 'Language, audio & preferences',
        Hindi: 'भाषा, ऑडियो और प्राथमिकताएं',
        Hinglish: 'Language, audio & preferences',
        Marathi: 'भाषा, ऑडिओ आणि प्राधान्ये',
        Gujarati: 'ભાષા, ઓડિયો અને પસંદગીઓ'
    },

    // --- NEW TRANSLATIONS ---


    // HomeScreen Additions
    'home.next_dose': { English: 'Next Dose', Hindi: 'अगली खुराक', Hinglish: 'Next Dose', Marathi: 'पुढचा डोस', Gujarati: 'આગામી ડોઝ' },
    'home.view_all': { English: 'View All', Hindi: 'सभी देखें', Hinglish: 'View All', Marathi: 'सर्व पहा', Gujarati: 'બધું જુઓ' },
    'home.ai_summary': { English: 'AI Daily Summary', Hindi: 'एआई दैनिक सारांश', Hinglish: 'AI Daily Summary', Marathi: 'AI दैनिक सारांश', Gujarati: 'AI દૈનિક સારાંશ' },
    'home.no_meds': { English: 'No meds left today!', Hindi: 'आज कोई दवा नहीं बची है!', Hinglish: 'No meds left today!', Marathi: 'आज औषधे उरली नाहीत!', Gujarati: 'આજે કોઈ દવા બાકી નથી!' },

    // Logs Screen
    'logs.subtitle': { English: 'Complete audit trail of your adherence', Hindi: 'आपके दवा लेने का पूरा लेखा-जोखा', Hinglish: 'Complete audit trail of your adherence', Marathi: 'तुमच्या औषधपालनाचा संपूर्ण ऑडिट ट्रेल', Gujarati: 'તમારી દવા લેવાનો સંપૂર્ણ ઓડિટ ટ્રેલ' },
    'logs.viewing_for': { English: 'Viewing logs for', Hindi: 'इनके लिए लॉग देख रहे हैं', Hinglish: 'Viewing for', Marathi: 'यांच्यासाठी लॉग पाहत आहे', Gujarati: 'આના માટે લોગ જુઓ' },
    'logs.filter_all': { English: 'All', Hindi: 'सभी', Hinglish: 'All', Marathi: 'सर्व', Gujarati: 'બધા' },
    'logs.filter_taken': { English: 'Taken', Hindi: 'ली गई', Hinglish: 'Taken', Marathi: 'घेतली', Gujarati: 'લીધી' },
    'logs.filter_missed': { English: 'Missed', Hindi: 'छूट गई', Hinglish: 'Missed', Marathi: 'चुकली', Gujarati: 'ચૂકી ગયા' },
    'logs.filter_verified': { English: 'Verified', Hindi: 'सत्यापित', Hinglish: 'Verified', Marathi: 'सत्यापित', Gujarati: 'ચકાસાયેલ' },
    'logs.export_pdf': { English: 'Download PDF Report', Hindi: 'पीडीएफ रिपोर्ट डाउनलोड करें', Hinglish: 'Download PDF Report', Marathi: 'PDF अहवाल डाउनलोड करा', Gujarati: 'PDF રિપોર્ટ ડાઉનલોડ કરો' },
    'logs.disclaimer': { English: 'Medical Notice: These logs are for tracking purposes only.', Hindi: 'चिकित्सा सूचना: ये लॉग केवल ट्रैकिंग उद्देश्यों के लिए हैं।', Hinglish: 'Medical Notice: Tracking logs only.', Marathi: 'वैद्यकीय सूचना: हे लॉग केवळ ट्रॅकिंगसाठी आहेत.', Gujarati: 'તબીબી સૂચના: આ લોગ ફક્ત ટ્રેકિંગ હેતુ માટે છે.' },

    // Notifications Screen
    'notif.active': { English: 'Active', Hindi: 'सक्रिय', Hinglish: 'Active', Marathi: 'सक्रिय', Gujarati: 'સક્રિય' },
    'notif.scheduled': { English: 'Scheduled', Hindi: 'निर्धारित', Hinglish: 'Scheduled', Marathi: 'नियोजित', Gujarati: 'નિર્ધારિત' },
    'notif.add_test': { English: 'Add Test Notifications', Hindi: 'परीक्षण सूचनाएं जोड़ें', Hinglish: 'Add Test Notifs', Marathi: 'चाचणी सूचना जोडा', Gujarati: 'ટેસ્ટ સૂચનાઓ ઉમેરો' },
    'notif.no_active': { English: 'No Active Notifications', Hindi: 'कोई सक्रिय सूचना नहीं', Hinglish: 'No Active Notifs', Marathi: 'कोणतीही सक्रिय सूचना नाही', Gujarati: 'કોઈ સક્રિય સૂચના નથી' },
    'notif.mark_taken': { English: 'Mark Taken', Hindi: 'लिया गया चिन्हित करें', Hinglish: 'Mark Taken', Marathi: 'घेतले म्हणून नोंदवा', Gujarati: 'લીધેલ તરીકે માર્ક કરો' },
    'notif.snooze': { English: 'Snooze 10m', Hindi: '10 मिनट बाद', Hinglish: 'Snooze 10m', Marathi: '१० मिनिटे पुढे ढकला', Gujarati: '10 મિનિટ સ્નૂઝ કરો' },
    'notif.new_reminder': { English: 'New Reminder', Hindi: 'नया रिमाइंडर', Hinglish: 'New Reminder', Marathi: 'नवीन स्मरणपत्र', Gujarati: 'નવું રીમાઇન્ડર' },
    'notif.med_name': { English: 'Medicine Name', Hindi: 'दवा का नाम', Hinglish: 'Medicine Name', Marathi: 'औषधाचे नाव', Gujarati: 'દવાનું નામ' },
    'notif.remind_in': { English: 'Remind me in', Hindi: 'मुझे याद दिलाएं', Hinglish: 'Remind me in', Marathi: 'मला आठवण करून द्या', Gujarati: 'મને યાદ કરાવો' },

    // AI Dashboard
    'ai.adherence': { English: 'Adherence', Hindi: 'पालन', Hinglish: 'Adherence', Marathi: 'पालन', Gujarati: 'પાલન' },
    'ai.weekly_adherence': { English: 'Weekly Adherence', Hindi: 'साप्ताहिक अनुपालन', Hinglish: 'Weekly Adherence', Marathi: 'साप्ताहिक पालन', Gujarati: 'સાપ્તાહિક પાલન' },
    'ai.monthly_progress': { English: '6-Month Progress', Hindi: '६ महीने की प्रगति', Hinglish: '6-Month Progress', Marathi: '६ महिन्यांची प्रगती', Gujarati: '૬-મહિનાની પ્રગતિ' },

    // Medicine Knowledge
    'kb.title': { English: 'Medicine Knowledge', Hindi: 'दवा ज्ञान', Hinglish: 'Medicine Knowledge', Marathi: 'औषध ज्ञान', Gujarati: 'દવા જ્ઞાન' },
    'kb.subtitle': { English: 'AI-powered medication education', Hindi: 'एआई-संचालित दवा शिक्षा', Hinglish: 'AI-powered medication education', Marathi: 'AI-सक्षम औषध शिक्षण', Gujarati: 'AI-સંચાલિત દવા શિક્ષણ' },
    'kb.search_placeholder': { English: 'Search medications...', Hindi: 'दवाएं खोजें...', Hinglish: 'Search meds...', Marathi: 'औषधे शोधा...', Gujarati: 'દવા શોધો...' },
    'kb.your_meds': { English: 'Your Medications', Hindi: 'आपकी दवाएं', Hinglish: 'Your meds', Marathi: 'तुमची औषधे', Gujarati: 'તમારી દવાઓ' },
    'kb.purpose': { English: 'Purpose', Hindi: 'उद्देश्य', Hinglish: 'Purpose', Marathi: 'उद्देश', Gujarati: 'હેતુ' },
    'kb.instructions': { English: 'Instructions', Hindi: 'निर्देश', Hinglish: 'Instructions', Marathi: 'सूचना', Gujarati: 'સૂચનાઓ' },
    'kb.side_effects': { English: 'Possible Side Effects', Hindi: 'संभावित दुष्प्रभाव', Hinglish: 'Side Effects', Marathi: 'संभाव्य दुष्परिणाम', Gujarati: 'સંભવિત આડઅસરો' },
    'kb.details': { English: 'Medication Details', Hindi: 'दवा का विवरण', Hinglish: 'Med details', Marathi: 'औषध तपशील', Gujarati: 'દવાની વિગતો' },
    'kb.dosage': { English: 'Dosage', Hindi: 'खुराक', Hinglish: 'Dosage', Marathi: 'डोस', Gujarati: 'ડોઝ' },
    'kb.frequency': { English: 'Frequency', Hindi: 'आवृत्ति', Hinglish: 'Frequency', Marathi: 'वारंवारता', Gujarati: 'વારંવારતા' },
    'kb.shape': { English: 'Shape', Hindi: 'आकार', Hinglish: 'Shape', Marathi: 'आकार', Gujarati: 'આકાર' },
    'kb.times': { English: 'Times', Hindi: 'समय', Hinglish: 'Times', Marathi: 'वेळ', Gujarati: 'સમય' },
    'kb.have_questions': { English: 'Have Questions?', Hindi: 'कोई प्रश्न हैं?', Hinglish: 'Have questions?', Marathi: 'काही प्रश्न आहेत का?', Gujarati: 'કોઈ પ્રશ્નો છે?' },
    'kb.ask_desc': { English: 'Ask our AI assistant about this medication', Hindi: 'अपनी दवा के बारे में हमारे एआई सहायक से पूछें', Hinglish: 'Ask AI about this med', Marathi: 'तुमच्या औषधाबद्दल आमच्या AI सहाय्यकाला विचारा', Gujarati: 'તમારી દવા વિશે અમારા AI આસિસ્ટન્ટને પૂછો' },
    'kb.ask_ai': { English: 'Ask AI Assistant', Hindi: 'एआई सहायक से पूछें', Hinglish: 'Ask AI Assistant', Marathi: 'AI सहाय्यकाला विचारा', Gujarati: 'AI આસિસ્ટન્ટને પૂછો' },
    'kb.disclaimer_title': { English: '⚕️ Medical Disclaimer', Hindi: '⚕️ चिकित्सा अस्वीकरण', Hinglish: '⚕️ Medical Disclaimer', Marathi: '⚕️ वैद्यकीय अस्वीकरण', Gujarati: '⚕️ તબીબી ડિસ્ક્લેમર' },
    'kb.disclaimer_desc': { English: 'This information is for educational purposes only. AI cannot diagnose conditions or change dosages. For medical advice, consult your doctor.', Hindi: 'यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है। एआई स्थितियों का निदान नहीं कर सकता या खुराक नहीं बदल सकता। चिकित्सा सलाह के लिए अपने डॉक्टर से संपर्क करें।', Hinglish: 'Educational info only. AI cannot diagnose. Consult doctor.', Marathi: 'ही माहिती केवळ शैक्षणिक हेतूंसाठी आहे. AI आजारांचे निदान करू शकत नाही किंवा डोस बदलू शकत नाही. वैद्यकीय सल्ल्यासाठी, तुमच्या डॉक्टरांचा सल्ला घ्या.', Gujarati: 'આ માહિતી ફક્ત શૈક્ષણિક હેતુઓ માટે છે. AI પરિસ્થિતિઓનું નિદાન કરી શકતું નથી અથવા ડોઝ બદલી શકતું નથી. તબીબી સલાહ માટે, તમારા ડૉક્ટરની સલાહ લો.' },

    // Reports Screen
    'reports.generate_custom': { English: 'Generate Custom Report', Hindi: 'कस्टम रिपोर्ट बनाएं', Hinglish: 'Gen Custom Report', Marathi: 'सानुकूल अहवाल तयार करा', Gujarati: 'કસ્ટમ રિપોર્ટ બનાવો' },
    'reports.generate_desc': { English: "Create detailed medical reports for your doctor's appointments", Hindi: 'अपने डॉक्टर के अपॉइंटमेंट के लिए विस्तृत मेडिकल रिपोर्ट बनाएं', Hinglish: 'Create detailed medical reports for doctor visits', Marathi: 'तुमच्या डॉक्टरांच्या भेटीसाठी तपशीलवार वैद्यकीय अहवाल तयार करा', Gujarati: 'તમારા ડૉક્ટરની મુલાકાતો માટે વિગતવાર તબીબી અહેવાલો બનાવો' },
    'reports.create_new': { English: 'Create New Report', Hindi: 'नई रिपोर्ट बनाएं', Hinglish: 'Create New Report', Marathi: 'नवीन अहवाल तयार करा', Gujarati: 'નવો રિપોર્ટ બનાવો' },
    'reports.count_label': { English: 'Reports', Hindi: 'रिपोर्ट्स', Hinglish: 'Reports', Marathi: 'अहवाल', Gujarati: 'અહેવાલો' },
    'reports.avg_score': { English: 'Avg Score', Hindi: 'औसत स्कोर', Hinglish: 'Avg Score', Marathi: 'सरासरी स्कोअर', Gujarati: 'સરેરાશ સ્કોર' },
    'reports.shared_count': { English: 'Shared', Hindi: 'साझा किया गया', Hinglish: 'Shared', Marathi: 'शेअर केलेले', Gujarati: 'શેર કરેલ' },
    'reports.recent': { English: 'Recent Reports', Hindi: 'हालिया रिपोर्ट', Hinglish: 'Recent Reports', Marathi: 'अलीकडील अहवाल', Gujarati: 'તાજેતરના અહેવાલો' },
    'reports.complete': { English: 'Complete', Hindi: 'पूर्ण', Hinglish: 'Complete', Marathi: 'पूर्ण', Gujarati: 'પૂર્ણ' },
    'reports.download': { English: 'Download', Hindi: 'डाउनलोड', Hinglish: 'Download', Marathi: 'डाउनलोड करा', Gujarati: 'ડાઉનલોડ કરો' },
    'reports.share': { English: 'Share', Hindi: 'साझा करें', Hinglish: 'Share', Marathi: 'શેઅર करा', Gujarati: 'શેર કરો' },
    'reports.share_doctor_title': { English: 'Share with Healthcare Provider', Hindi: 'स्वास्थ्य सेवा प्रदाता के साथ साझा करें', Hinglish: 'Share with Doctor', Marathi: 'आरोग्य सेवा प्रदाता सोबत शेअर करा', Gujarati: 'આરોગ્યસંભાળ પ્રદાતા સાથે શેર કરો' },
    'reports.share_doctor_desc': { English: "Send reports directly to your doctor's email for upcoming appointments", Hindi: 'आगामी अपॉइंटमेंट के लिए सीधे अपने डॉक्टर के ईमेल पर रिपोर्ट भेजें', Hinglish: "Send reports to doctor's email", Marathi: 'येणाऱ्या भेटींसाठी अहवाल थेट तुमच्या डॉक्टरांच्या ईमेलवर पाठवा', Gujarati: 'આગામી એપોઇન્ટમેન્ટ માટે સીધા તમારા ડૉક્ટરના ઇમેઇલ પર રિપોર્ટ મોકલો' },
    'reports.email_to_doctor': { English: 'Email to Doctor', Hindi: 'डॉक्टर को ईमेल करें', Hinglish: 'Email to Doctor', Marathi: 'डॉक्टरना ईमेल करा', Gujarati: 'ડૉક્ટરને ઇમેઇલ કરો' },
    'reports.included_title': { English: "What's Included in Reports", Hindi: 'रिपोर्ट्स में क्या शामिल है', Hinglish: "What's included in reports", Marathi: 'अहवालांमध्ये काय समाविष्ट आहे', Gujarati: 'અહેવાલોમાં શું શામેલ છે' },
    'reports.inc_adherence': { English: 'Complete medication adherence history', Hindi: 'पूर्ण दवा पालन इतिहास', Hinglish: 'Complete med adherence history', Marathi: 'संपूर्ण औषधपालन इतिहास', Gujarati: 'સંપૂર્ણ દવા લેવાનો ઇતિહાસ' },
    'reports.inc_logs': { English: 'Verified medication logs with timestamps', Hindi: 'टाइमस्टैम्प के साथ सत्यापित दवा लॉग', Hinglish: 'Verified med logs with timestamps', Marathi: 'टाइमस्टॅम्पसह सत्यापित औषध लॉग', Gujarati: 'ટાઇમસ્ટેમ્પ સાથે ચકાસાયેલ દવા લોગ' },
    'reports.inc_ai': { English: 'AI-generated insights and patterns', Hindi: 'एआई-जनरेटेड अंतर्दृष्टि और पैटर्न', Hinglish: 'AI insights and patterns', Marathi: 'AI-व्युत्पन्न अंतर्दृष्टी आणि नमुने', Gujarati: 'AI-જનરેટેડ આંતરદૃષ્ટિ અને પેટર્ન' },
    'reports.inc_trends': { English: 'Trend analysis and predictions', Hindi: 'रुझान विश्लेषण और भविष्यवाणियां', Hinglish: 'Trend analysis and predictions', Marathi: 'कल विश्लेषण आणि अंदाज', Gujarati: 'વલણ વિશ્લેષણ અને આગાહીઓ' },
    'reports.inc_sides': { English: 'Side effects and concerns noted', Hindi: 'नोट किए गए दुष्प्रभाव और चिंताएं', Hinglish: 'Side effects and concerns', Marathi: 'दुष्परिणाम आणि चिंता नोंदवल्या', Gujarati: 'નોંધાયેલ આડઅસરો અને ચિંતાઓ' },
    'reports.privacy_title': { English: '🔒 Privacy', Hindi: '🔒 गोपनीयता', Hinglish: '🔒 Privacy', Marathi: '🔒 गोपनीयता', Gujarati: '🔒 ગોપનીયતા' },
    'reports.privacy_desc': { English: 'All reports are encrypted and HIPAA-compliant. Your medical data is never shared without your explicit consent.', Hindi: 'सभी रिपोर्ट एन्क्रिप्टेड और HIPAA-अनुपालन वाले हैं। आपकी चिकित्सा जानकारी आपकी स्पष्ट सहमति के बिना कभी साझा नहीं की जाती है।', Hinglish: 'Encrypted and HIPAA-compliant. Data not shared without consent.', Marathi: 'सर्व अहवाल एनक्रिप्टेड आणि HIPAA-सुसंगत आहेत. तुमची वैद्यकीय माहिती तुमच्या स्पष्ट संमतीशिवाय कधीही शेअर केली जात नाही.', Gujarati: 'તમામ અહેવાલો એન્ક્રિપ્ટેડ અને HIPAA-સુસંગત છે. તમારી તબીબી માહિતી તમારી સ્પષ્ટ સંમતિ વિના ક્યારેય શેર કરવામાં આવતી નથી.' },

    // Caregiver & Safety
    'safety.status': { English: 'Safety Status', Hindi: 'सुरक्षा स्थिति', Hinglish: 'Safety Status', Marathi: 'सुरक्षितता स्थिती', Gujarati: 'સુરક્ષા સ્થિતિ' },
    'safety.all_good': { English: 'All Good', Hindi: 'सब ठीक है', Hinglish: 'All Good', Marathi: 'सर्व काही ठीक आहे', Gujarati: 'બધું બરાબર છે' },
    'safety.last_checkin': { English: 'Last Check-in', Hindi: 'पिछली जांच', Hinglish: 'Last Check-in', Marathi: 'शेवटचे चेक-इन', Gujarati: 'છેલ્લી તપાસ' },
    'safety.add_caregiver': { English: 'Add Caregiver / Doctor', Hindi: 'केयरगिवर / डॉक्टर जोड़ें', Hinglish: 'Add Caregiver', Marathi: 'केअरगिव्हर / डॉक्टर जोडा', Gujarati: 'કેરગિવર / ડૉક્ટર ઉમેરો' },
    'safety.link_title': { English: 'Link to Caregiver', Hindi: 'केयरगिवर से जुड़ें', Hinglish: 'Link to Caregiver', Marathi: 'केअरगिव्हरशी लिंक करा', Gujarati: 'કેરગિવર સાથે લિંક કરો' },
    'safety.link_desc': { English: "Enter your Caregiver's Unique ID to share your health data with them.", Hindi: 'अपने स्वास्थ्य डेटा को साझा करने के लिए अपने केयरगिवर की विशिष्ट आईडी दर्ज करें।', Hinglish: 'Enter Caregiver ID to share data', Marathi: 'तुमचा आरोग्य डेटा त्यांच्याशी शेअर करण्यासाठी तुमच्या केअरगिव्हरचा युनिक आयडी प्रविष्ट करा.', Gujarati: 'તમારો હેલ્થ ડેટા તેમની સાથે શેર કરવા માટે તમારા કેરગિવરનો યુનિક આઈડી દાખલ કરો.' },
    'safety.id_label': { English: 'Caregiver ID', Hindi: 'केयरगिवर आईडी', Hinglish: 'Caregiver ID', Marathi: 'केअरगिव्हर आयडी', Gujarati: 'કેરગિવર આઈડી' },
    'safety.link_button': { English: 'Link Caregiver', Hindi: 'केयरगिवर को लिंक करें', Hinglish: 'Link Caregiver', Marathi: 'केअरगिव्हर लिंक करा', Gujarati: 'કેરગિવર લિંક કરો' },
    'safety.care_team': { English: 'Your Care Team', Hindi: 'आपकी देखभाल टीम', Hinglish: 'Your Care Team', Marathi: 'तुमची काळजी घेणारी टीम', Gujarati: 'તમારી સંભાળ ટીમ' },
    'safety.no_caregivers': { English: 'No caregivers connected yet.', Hindi: 'अभी तक कोई केयरगिवर नहीं जुड़ा है।', Hinglish: 'No caregivers connected', Marathi: 'अद्याप कोणतेही केअरगिव्हर्स कनेक्ट केलेले नाहीत.', Gujarati: 'હજી સુધી કોઈ કેરગિવર જોડાયેલ નથી.' },
    'safety.add_hint': { English: 'Tap "Add Caregiver" to link one.', Hindi: 'एक को जोड़ने के लिए "केयरगिवर जोड़ें" पर टैप करें।', Hinglish: 'Tap Add Caregiver to link', Marathi: 'एक लिंक करण्यासाठी "केअरगिव्हर जोडा" वर टॅप करा.', Gujarati: 'એકી લિંક કરવા માટે "કેરગિવર ઉમેરો" પર ટેપ કરો.' },
    'safety.alerts_on': { English: 'Alerts ON', Hindi: 'अलर्ट चालू', Hinglish: 'Alerts ON', Marathi: 'अलर्ट चालू', Gujarati: 'અલર્ટ ચાલુ' },
    'safety.alert_triggers': { English: 'Automatic Alert Triggers', Hindi: 'स्वचालित अलर्ट ट्रिगर्स', Hinglish: 'Auto Alert Triggers', Marathi: 'स्वयंचलित अलर्ट ट्रिगर्स', Gujarati: 'સ્વચાલિત એલર્ટ ટ્રિગર્સ' },
    'safety.alert_hint': { English: 'Caregivers will be automatically notified when:', Hindi: 'केयरगिवर को स्वचालित रूप से सूचित किया जाएगा जब:', Hinglish: 'Caregivers will be notified when:', Marathi: 'केअरगिव्हर्सना स्वयंचलितपणे सूचित केले जाईल जेव्हा:', Gujarati: 'કેરગિવરને આપમેળે જાણ કરવામાં આવશે જ્યારે:' },
    'safety.alert_settings': { English: 'Configure Alert Settings', Hindi: 'अलर्ट सेटिंग्स कॉन्फ़िगर करें', Hinglish: 'Configure Alerts', Marathi: 'अलर्ट सेटिंग्ज कॉन्फिगर करा', Gujarati: 'એલર્ટ સેટિંગ્સ ગોઠવો' },
    'safety.visibility_title': { English: 'What Caregivers Can See', Hindi: 'केयरगिवर क्या देख सकते हैं', Hinglish: 'What caregivers can see', Marathi: 'केअरगिव्हर्स काय पाहू शकतात', Gujarati: 'કેરગિવર શું જોઈ શકે છે' },
    'safety.permanent': { English: 'PERMANENT', Hindi: 'स्थायी', Hinglish: 'PERMANENT', Marathi: 'कायमस्वरूपी', Gujarati: 'કાયમી' },
    'safety.missed_meds': { English: 'Missed medications', Hindi: 'छूटी हुई दवाएं', Hinglish: 'Missed meds', Marathi: 'चुकलेली औषधे', Gujarati: 'ચૂકી ગયેલ દવાઓ' },
    'safety.mandatory': { English: 'MANDATORY', Hindi: 'अनिवार्य', Hinglish: 'MANDATORY', Marathi: 'अनिवार्य', Gujarati: 'ફરજિયાત' },
    'safety.shared': { English: 'SHARED', Hindi: 'साझा', Hinglish: 'SHARED', Marathi: 'शेअर केलेले', Gujarati: 'શેર કરેલ' },
    'safety.benefits_title': { English: 'Connected Care Benefits', Hindi: 'जुड़ी हुई देखभाल के लाभ', Hinglish: 'Connected care benefits', Marathi: 'कनेक्टेड केअर बेनिफिट्स', Gujarati: 'જોડાયેલ સંભાળના ફાયદા' },
    'safety.ben_monitoring': { English: 'Real-time adherence monitoring', Hindi: 'वास्तविक समय पालन निगरानी', Hinglish: 'Real-time monitoring', Marathi: 'रिअल-टाइम पालन मॉनिटरिंग', Gujarati: 'રીઅલ-ટાઇમ પાલન મોનિટરિંગ' },
    'safety.ben_alerts': { English: 'Automatic emergency alerts', Hindi: 'स्वचालित आपातकालीन अलर्ट', Hinglish: 'Auto emergency alerts', Marathi: 'स्वयंचलित आणीबाणी अलर्ट', Gujarati: 'સ્વચાલિત કટોકટી ચેતવણીઓ' },
    'safety.ben_comm': { English: 'Two-way communication with care team', Hindi: 'देखभाल टीम के साथ दो-तरफा संचार', Hinglish: 'Two-way communication', Marathi: 'केअर टीमसोबत दुतर्फा संवाद', Gujarati: 'કેર ટીમ સાથે દ્વિમાર્ગી સંચાર' },
    'safety.ben_reports': { English: 'Shared medical reports', Hindi: 'साझा मेडिकल रिपोर्ट', Hinglish: 'Shared medical reports', Marathi: 'शेअर केलेले वैद्यकीय अहवाल', Gujarati: 'શેર કરેલ તબીબી અહેવાલો' },
    'safety.privacy_title': { English: '🔒 Privacy Control', Hindi: '🔒 गोपनीयता नियंत्रण', Hinglish: '🔒 Privacy Control', Marathi: '🔒 गोपनीयता नियंत्रण', Gujarati: '🔒 ગોપનીયતા નિયંત્રણ' },
    'safety.privacy_desc': { English: 'You have full control over what caregivers can see. Permissions can be changed anytime from settings.', Hindi: 'केयरगिवर क्या देख सकते हैं, इस पर आपका पूरा नियंत्रण है। सेटिंग्स से कभी भी अनुमतियाँ बदली जा सकती हैं।', Hinglish: 'Full control over data sharing. Change anytime in settings.', Marathi: 'केअरगिव्हर्स काय पाहू शकतात यावर तुमचे पूर्ण नियंत्रण आहे. परवानग्या सेटिंग्जमधून कधीही बदलल्या जाऊ शकतात.', Gujarati: 'કેરગિવર શું જોઈ શકે છે તેના પર તમારું સંપૂર્ણ નિયંત્રણ છે. સેટિંગ્સમાંથી કોઈપણ સમયે પરવાનગીઓ બદલી શકાય છે.' },
    'safety.emergency_protocol': { English: 'Emergency Protocol', Hindi: 'आपातकालीन प्रोटोकॉल', Hinglish: 'Emergency Protocol', Marathi: 'आणीबाणी प्रोटोकॉल', Gujarati: 'ઇમરજન્સી પ્રોટોકોલ' },

    // Settings additions
    // Settings screen
    'settings.title': { English: 'Settings', Hindi: 'सेटिंग्स', Hinglish: 'Settings', Marathi: 'सेटिंग्ज', Gujarati: 'સેટિંગ્સ' },
    'settings.subtitle': { English: 'Customize your experience', Hindi: 'अपने अनुभव को कस्टमाइज़ करें', Hinglish: 'Customize your experience', Marathi: 'तुमच्या अनुभवानुसार बदल करा', Gujarati: 'તમારા અનુભવને કસ્ટમાઇઝ કરો' },
    'settings.edit_profile': { English: 'Edit Profile', Hindi: 'प्रोफ़ाइल संपादित करें', Hinglish: 'Edit Profile', Marathi: 'प्रोफाइल संपादित करा', Gujarati: 'પ્રોફાઇલ એડિટ કરો' },
    'settings.name_label': { English: 'NAME', Hindi: 'नाम', Hinglish: 'NAME', Marathi: 'नाव', Gujarati: 'નામ' },
    'settings.name_placeholder': { English: 'Enter your name', Hindi: 'अपना नाम प्रविष्ट करें', Hinglish: 'Enter your name', Marathi: 'तुमचे नाव प्रविष्ट करा', Gujarati: 'તમારું નામ દાખલ કરો' },
    'settings.email_label': { English: 'EMAIL ADDRESS', Hindi: 'ईमेल पता', Hinglish: 'EMAIL ADDRESS', Marathi: 'ईमेल पत्ता', Gujarati: 'ઈમેલ એડ્રેસ' },
    'settings.email_placeholder': { English: 'Enter your email', Hindi: 'अपना ईमेल प्रविष्ट करें', Hinglish: 'Enter your email', Marathi: 'तुमचा ईमेल प्रविष्ट करा', Gujarati: 'તમારો ઈમેલ દાખલ કરો' },
    'settings.voice_lang_section': { English: 'VOICE & LANGUAGE', Hindi: 'आवाज और भाषा', Hinglish: 'VOICE & LANGUAGE', Marathi: 'आवाज आणि भाषा', Gujarati: 'અવાજ અને ભાષા' },
    'settings.language': { English: 'Language', Hindi: 'भाषा', Hinglish: 'Language', Marathi: 'भाषा', Gujarati: 'ભાષા' },
    'settings.select_language': { English: 'Select Language', Hindi: 'भाषा चुनें', Hinglish: 'Select Language', Marathi: 'भाषा निवडा', Gujarati: 'ભાષા પસંદ કરો' },
    'settings.language_desc': { English: 'Choose your preferred language for the AI assistant and interface.', Hindi: 'एआई सहायक और इंटरफ़ेस के लिए अपनी पसंदीदा भाषा चुनें।', Hinglish: 'Choose preferred language', Marathi: 'AI सहाय्यक आणि इंटरफेससाठी तुमची पसंतीची भाषा निवडा.', Gujarati: 'AI સહાયક અને ઇન્ટરફેસ માટે તમારી પસંદગીની ભાષા પસંદ કરો.' },
    'settings.voice_assistant': { English: 'Voice Assistant', Hindi: 'वॉयस असिस्टेंट', Hinglish: 'Voice Assistant', Marathi: 'व्हॉइस असिस्टंट', Gujarati: 'વૉઇસ આસિસ્ટન્ટ' },
    'settings.audio_reminders': { English: 'Audio Reminders', Hindi: 'ऑडियो अनुस्मारक', Hinglish: 'Audio Reminders', Marathi: 'ऑडिओ स्मरणपत्रे', Gujarati: 'ઓડિયો રીમાઇન્ડર્સ' },
    'settings.notifications_section': { English: 'NOTIFICATIONS', Hindi: 'सूचनाएं', Hinglish: 'NOTIFICATIONS', Marathi: 'सूचना', Gujarati: 'સૂચનાઓ' },
    'settings.notifications': { English: 'Notification Preferences', Hindi: 'सूचना प्राथमिकताएं', Hinglish: 'Notif Preferences', Marathi: 'सूचना प्राधान्ये', Gujarati: 'સૂચના પસંદગીઓ' },
    'settings.med_reminders': { English: 'Medication Reminders', Hindi: 'दवा अनुस्मारक', Hinglish: 'Med Reminders', Marathi: 'औषध स्मरणपत्रे', Gujarati: 'દવા રીમાઇન્ડર્સ' },
    'settings.med_reminders_desc': { English: '15 min before dose', Hindi: 'खुराक से 15 मिनट पहले', Hinglish: '15 min before dose', Marathi: 'डोसच्या १५ मिनिटे आधी', Gujarati: 'ડોઝના ૧૫ મિનિટ પહેલા' },
    'settings.ai_insights_desc': { English: 'Daily summary', Hindi: 'दैनिक सारांश', Hinglish: 'Daily summary', Marathi: 'दैनिक सारांश', Gujarati: 'દૈનિક સારાંશ' },
    'settings.caregiver_alerts': { English: 'Caregiver Alerts', Hindi: 'केयरगिवर अलर्ट', Hinglish: 'Caregiver Alerts', Marathi: 'केअरगिव्हर अलर्ट', Gujarati: 'કેરગિવર એલર્ટ' },
    'settings.caregiver_alerts_desc': { English: 'Emergency only • Permanent', Hindi: 'केवल आपातकालीन • स्थायी', Hinglish: 'Emergency only • Permanent', Marathi: 'फक्त आणीबाणी • कायमस्वरूपी', Gujarati: 'ફક્ત કટોકટી • કાયમી' },
    'settings.always_on': { English: 'ALWAYS ON', Hindi: 'हमेशा चालू', Hinglish: 'ALWAYS ON', Marathi: 'नेहमी चालू', Gujarati: 'હંમેશા ચાલુ' },
    'settings.preferences_section': { English: 'PREFERENCES', Hindi: 'वरीयताएँ', Hinglish: 'PREFERENCES', Marathi: 'प्राधान्ये', Gujarati: 'પસંદગીઓ' },
    'settings.appearance': { English: 'Appearance', Hindi: 'रूप-रंग', Hinglish: 'Appearance', Marathi: 'देखावा', Gujarati: 'દેખાવ' },
    'settings.appearance_mode': { English: 'Appearance Mode', Hindi: 'रूप-रंग मोड', Hinglish: 'Appearance Mode', Marathi: 'देखावा मोड', Gujarati: 'દેખાવ મોડ' },
    'settings.cycle': { English: 'Cycle', Hindi: 'साइकिल', Hinglish: 'Cycle', Marathi: 'सायकल', Gujarati: 'સાયકલ' },
    'settings.change_password': { English: 'Change Password', Hindi: 'पासवर्ड बदलें', Hinglish: 'Change Password', Marathi: 'पासवर्ड बदला', Gujarati: 'પાસવર્ડ બદલો' },
    'settings.password_desc': { English: 'Enter your current password and a new password to secure your account.', Hindi: 'अपने खाते को सुरक्षित करने के लिए अपना वर्तमान पासवर्ड और एक नया पासवर्ड दर्ज करें।', Hinglish: 'Enter current and new password', Marathi: 'तुमचे खाते सुरक्षित करण्यासाठी तुमचा वर्तमान पासवर्ड आणि नवीन पासवर्ड प्रविष्ट करा.', Gujarati: 'તમારા ખાતાને સુરક્ષિત કરવા માટે તમારો વર્તમાન પાસવર્ડ અને નવો પાસવર્ડ દાખલ કરો.' },
    'settings.current_password': { English: 'Current Password', Hindi: 'वर्तमान पासवर्ड', Hinglish: 'Current Password', Marathi: 'वर्तमान पासवर्ड', Gujarati: 'વર્તમાન પાસવર્ડ' },
    'settings.new_password': { English: 'New Password', Hindi: 'नया पासवर्ड', Hinglish: 'New Password', Marathi: 'नवीन पासवर्ड', Gujarati: 'નવો પાસવર્ડ' },
    'settings.confirm_password': { English: 'Confirm New Password', Hindi: 'नए पासवर्ड की पुष्टि करें', Hinglish: 'Confirm New Password', Marathi: 'नवीन पासवर्डची पुष्टी करा', Gujarati: 'નવા પાસવર્ડની પુષ્ટિ કરો' },
    'settings.update_password': { English: 'Update Password', Hindi: 'पासवर्ड अपडेट करें', Hinglish: 'Update Password', Marathi: 'पासवर्ड अपडेट करा', Gujarati: 'પાસવર્ડ અપડેટ કરો' },
    'settings.privacy_security': { English: 'Privacy & Security', Hindi: 'गोपनीयता और सुरक्षा', Hinglish: 'Privacy & Security', Marathi: 'गोपनीयता आणि सुरक्षा', Gujarati: 'ગોપનીયતા અને સુરક્ષા' },
    'settings.security': { English: 'Security', Hindi: 'सुरक्षा', Hinglish: 'Security', Marathi: 'सुरक्षा', Gujarati: 'સુરક્ષા' },
    'settings.support_section': { English: 'SUPPORT & INFO', Hindi: 'समर्थन और जानकारी', Hinglish: 'SUPPORT & INFO', Marathi: 'समर्थन आणि माहिती', Gujarati: 'સપોર્ટ અને માહિતી' },
    'settings.help_center': { English: 'Help Center', Hindi: 'सहायता केंद्र', Hinglish: 'Help Center', Marathi: 'मदत केंद्र', Gujarati: 'સહાયતા કેન્દ્ર' },
    'settings.live_support': { English: 'Live Support Available', Hindi: 'लाइव सहायता उपलब्ध', Hinglish: 'Live Support Available', Marathi: 'थेट मदत उपलब्ध', Gujarati: 'લાઇવ સપોર્ટ ઉપલબ્ધ' },
    'settings.about': { English: 'About AdherAI', Hindi: 'अधेरएआई (AdherAI) के बारे में', Hinglish: 'About AdherAI', Marathi: 'AdherAI बद्दल', Gujarati: 'AdherAI વિશે' },
    'settings.logout': { English: 'Log Out', Hindi: 'लॉग आउट', Hinglish: 'Log Out', Marathi: 'लॉग आउट', Gujarati: 'લોગ આઉટ' },

    // Common Actions
    'common.save_changes': { English: 'Save Changes', Hindi: 'परिवर्तन सहेजें', Hinglish: 'Save Changes', Marathi: 'बदल जतन करा', Gujarati: 'ફેરફારો સાચવો' },
    'common.cancel': { English: 'Cancel', Hindi: 'रद्द करें', Hinglish: 'Cancel', Marathi: 'रद्द करा', Gujarati: 'રદ કરો' },
    'common.at': { English: 'at', Hindi: 'को', Hinglish: 'at', Marathi: 'ला', Gujarati: 'એ' },
    'common.logout': { English: 'Log Out', Hindi: 'लॉग आउट', Hinglish: 'Log Out', Marathi: 'लॉग आउट', Gujarati: 'લોગ આઉટ' },
    'common.edit': { English: 'Edit', Hindi: 'संपादित करें', Hinglish: 'Edit', Marathi: 'संपादित करा', Gujarati: 'એડિટ કરો' },
    'common.call': { English: 'Call', Hindi: 'कॉल करें', Hinglish: 'Call', Marathi: 'कॉल करा', Gujarati: 'કોલ કરો' },
    'common.notify': { English: 'Notify', Hindi: 'सूचित करें', Hinglish: 'Notify', Marathi: 'सूचित करा', Gujarati: 'કોઈપણ' },
    'common.profile': { English: 'Profile', Hindi: 'प्रोफ़ाइल', Hinglish: 'Profile', Marathi: 'प्रोफाइल', Gujarati: 'પ્રોફાઇલ' },
    'common.enabled': { English: 'Enabled', Hindi: 'सक्षम', Hinglish: 'Enabled', Marathi: 'सक्षम', Gujarati: 'સક્ષમ' },
    'common.disabled': { English: 'Disabled', Hindi: 'अक्षम', Hinglish: 'Disabled', Marathi: 'अक्षम', Gujarati: 'અક્ષમ' },
    'common.patient': { English: 'Patient', Hindi: 'मरीज', Hinglish: 'Patient', Marathi: 'रुग्ण', Gujarati: 'દર્દી' },
    'common.caretaker': { English: 'Caretaker', Hindi: 'केयरगिवर', Hinglish: 'Caretaker', Marathi: 'केअरगિવ्ह्र', Gujarati: 'કેરગીવર' },

    // Scan Screen
    'scan.title': { English: 'AI Verification Lab', Hindi: 'एआई सत्यापन लैब', Hinglish: 'AI Verification Lab', Marathi: 'AI सत्यापन लॅब', Gujarati: 'AI વેરિફિકેશન લેબ' },
    'scan.subtitle': { English: 'Scan medication packaging to verify authenticity', Hindi: 'प्रामाणिकता सत्यापित करने के लिए दवा की पैकेजिंग स्कैन करें', Hinglish: 'Scan medication to verify', Marathi: 'प्रामाणिकपणा तपासण्यासाठी औषध पॅकेजिंग स्कॅन करा', Gujarati: 'અધિકૃતતા ચકાસવા માટે દવાના પેકેજિંગને સ્કેન કરો' },
    'scan.instruction': { English: 'Position medication in frame', Hindi: 'दवा को फ्रेम में रखें', Hinglish: 'Position med in frame', Marathi: 'औषध फ्रेममध्ये ठेवा', Gujarati: 'દવાને ફ્રેમમાં રાખો' },
    'scan.analyzing': { English: 'Analyzing medication...', Hindi: 'दवा का विश्लेषण हो रहा है...', Hinglish: 'Analyzing med...', Marathi: 'औषधाचे विश्लेषण होत आहे...', Gujarati: 'દવાનું વિશ્लेषण થઈ રહ્યું છે...' },
    'scan.verified': { English: 'Verified Successfully', Hindi: 'सफलतापूर्वक सत्यापित', Hinglish: 'Verified Successfully', Marathi: 'यशस्वीरित्या सत्यापित', Gujarati: 'સફળતાપૂર્વક ચકાસાયેલ' },
    'scan.confidence': { English: '{confidence}% Match Confidence', Hindi: '{confidence}% मिलान विश्वास', Hinglish: '{confidence}% Match Confidence', Marathi: '{confidence}% मॅच कॉन्फिडन्स', Gujarati: '{confidence}% મેચ આત્મવિશ્વાસ' },
    'scan.results': { English: 'Scan Results', Hindi: 'स्कैन परिणाम', Hinglish: 'Scan Results', Marathi: 'स्कॅन निकाल', Gujarati: 'સ્કેન પરિણામો' },
    'scan.med_name': { English: 'Medication Name', Hindi: 'दवा का नाम', Hinglish: 'Medication Name', Marathi: 'औषधाचे नाव', Gujarati: 'દવાનું નામ' },
    'scan.dosage': { English: 'Dosage', Hindi: 'खुराक', Hinglish: 'Dosage', Marathi: 'डोस', Gujarati: 'ડોઝ' },
    'scan.manufacturer': { English: 'Manufacturer', Hindi: 'निर्माता', Hinglish: 'Manufacturer', Marathi: 'निर्माता', Gujarati: 'ઉત્પાદક' },
    'scan.batch': { English: 'Batch Number', Hindi: 'बैच नंबर', Hinglish: 'Batch Number', Marathi: 'बॅच नंबर', Gujarati: 'બેચ નંબર' },
    'scan.expiry': { English: 'Expiry Date', Hindi: 'समाप्ति तिथि', Hinglish: 'Expiry Date', Marathi: 'कालबाह्यता तारीख', Gujarati: 'એક્સપાયરી ડેટ' },
    'scan.status': { English: 'Verification Status', Hindi: 'सत्यापन स्थिति', Hinglish: 'Verification Status', Marathi: 'सत्यापन स्थिती', Gujarati: 'વેરિફિકેશન સ્ટેટસ' },
    'scan.authentic': { English: 'Authentic', Hindi: 'प्रामाणिक', Hinglish: 'Authentic', Marathi: 'अस्सल', Gujarati: 'અધિકૃત' },
    'scan.complete': { English: 'Verification Complete', Hindi: 'सत्यापन पूर्ण', Hinglish: 'Verification Complete', Marathi: 'सत्यापन पूर्ण', Gujarati: 'વેરિફિકેશન પૂર્ણ' },
    'scan.safety_msg': { English: 'This medication has been verified as authentic and safe to consume.', Hindi: 'इस दवा को प्रामाणिक और उपभोग के लिए सुरक्षित माना गया है।', Hinglish: 'This med is verified and safe', Marathi: 'हे औषध अस्सल आणि उपभोगण्यासाठी सुरक्षित म्हणून सत्यापित केले गेले आहे.', Gujarati: 'આ દવા અધિકૃત અને વપરાશ માટે સુરક્ષિત તરીકે ચકાસવામાં આવી છે.' },
    'scan.another': { English: 'Scan Another', Hindi: 'दूसरा स्कैन करें', Hinglish: 'Scan Another', Marathi: 'दुसरे स्कॅन करा', Gujarati: 'બીજું સ્કેન કરો' },
    'scan.start': { English: 'Start Scan', Hindi: 'स्कैन शुरू करें', Hinglish: 'Start Scan', Marathi: 'स्कॅन सुरू करा', Gujarati: 'સ્કેન શરૂ કરો' },
    'scan.how_it_works': { English: 'How AI Verification Works', Hindi: 'एआई सत्यापन कैसे काम करता है', Hinglish: 'How AI Verification Works', Marathi: 'AI सत्यापन कसे कार्य करते', Gujarati: 'AI વેરિફિકેશન કેવી રીતે કામ કરે છે' },
    'scan.step1': { English: 'Scans pill shape, color, and markings', Hindi: 'गोली के आकार, रंग और चिह्नों को स्कैन करता है', Hinglish: 'Scans pill shape and color', Marathi: 'गोळीचा आकार, रंग आणि खुणा स्कॅन करते', Gujarati: 'ગોળીનો આકાર, રંગ અને નિશાનો સ્કેન કરે છે' },
    'scan.step2': { English: 'Verifies packaging and batch information', Hindi: 'पैकेजिंग और बैच की जानकारी सत्यापित करता है', Hinglish: 'Verifies packaging info', Marathi: 'पॅकेजिंग आणि बॅच माहिती सत्यापित करते', Gujarati: 'પેકેજિંગ અને બેચની માહિતી ચકાસે છે' },
    'scan.step3': { English: 'Checks authenticity against database', Hindi: 'डेटाबेस के खिलाफ प्रामाणिकता की जांच करता है', Hinglish: 'Checks authenticity', Marathi: 'डेटाबेस विरुद्ध प्रामाणिकपणा तपासते', Gujarati: 'ડેટાબેઝ સામે અધિકૃતતા તપાસે છે' },
    'scan.step4': { English: 'Warns of counterfeit or expired medication', Hindi: 'नकली या पुरानी दवा की चेतावनी देता है', Hinglish: 'Warns of fake/expired med', Marathi: 'बनावट किंवा कालबाह्य औषधाचा इशारा देते', Gujarati: 'બનાવટી અથવા એક્સપાયર થયેલી દવાની ચેતવણી આપે છે' },
    'scan.chatbot_title': { English: 'Have Questions?', Hindi: 'सवाल हैं?', Hinglish: 'Have questions?', Marathi: 'काही प्रश्न आहेत का?', Gujarati: 'કોઈ પ્રશ્નો છે?' },
    'scan.chatbot_desc': { English: 'Ask our AI assistant about your scan results or medications.', Hindi: 'अपने स्कैन परिणामों या दवाओं के बारे में हमारे एआई सहायक से पूछें।', Hinglish: 'Ask AI about scans/meds', Marathi: 'तुमच्या स्कॅन निकालांबद्दल किंवा औषधांबद्दल आमच्या AI सहाय्यकाला विचारा.', Gujarati: 'તમારા સ્કેન પરિણામો અથવા દવાઓ વિશે અમારા AI આસિસ્ટન્ટને પૂછો.' },
    'scan.chatbot_button': { English: 'Open AI Chatbot', Hindi: 'एआई चैटबॉट खोलें', Hinglish: 'Open AI Chatbot', Marathi: 'AI चॅटबॉट उघडा', Gujarati: 'AI ચેટબોટ ખોલો' },

    // Caretaker Specifics
    'caretaker.welcome': { English: 'Welcome', Hindi: 'नमस्ते', Hinglish: 'Welcome', Marathi: 'स्वागत आहे', Gujarati: 'સ્વાગત છે' },
    'caretaker.managing': { English: 'Managing patients', Hindi: 'मरीजों का प्रबंधन', Hinglish: 'Managing patients', Marathi: 'रुग्णांचे व्यवस्थापन', Gujarati: 'દર્દીઓનું સંચાલન' },
    'caretaker.view_details': { English: 'View Details', Hindi: 'विवरण देखें', Hinglish: 'View Details', Marathi: 'तपशील पहा', Gujarati: 'વિગતો જુઓ' },
    'caretaker.add_patient': { English: 'Add Patient', Hindi: 'मरीज जोड़ें', Hinglish: 'Add Patient', Marathi: 'रुग्ण जोडा', Gujarati: 'દર્દી ઉમેરો' },

    // Modals
    'modal.add_patient.title': { English: 'Add New Patient', Hindi: 'नया मरीज जोड़ें', Hinglish: 'Add New Patient', Marathi: 'नवीन रुग्ण जोडा', Gujarati: 'નવો દર્દી ઉમેરો' },
    'modal.add_med.title': { English: 'Add Medication', Hindi: 'दवा जोड़ें', Hinglish: 'Add Medication', Marathi: 'औषध जोडा', Gujarati: 'દવા ઉમેરો' },
    'modal.add_med.step': { English: 'Step', Hindi: 'चरण', Hinglish: 'Step', Marathi: 'पाऊल', Gujarati: 'પગલું' },
    'modal.next': { English: 'Next', Hindi: 'अगला', Hinglish: 'Next', Marathi: 'पुढील', Gujarati: 'આગળ' },

    // Home Screen specific
    'home.healthy_day': { English: 'Have a healthy day ahead', Hindi: 'आपका दिन स्वस्थ रहे', Hinglish: 'Have a healthy day ahead', Marathi: 'तुमचा दिवस आरोग्याचा जावो', Gujarati: 'તમારો દિવસ સ્વસ્થ રહે' },
    'home.overdue': { English: 'Overdue', Hindi: 'समय बीत गया', Hinglish: 'Overdue', Marathi: 'वेळ उलटून गेली', Gujarati: 'બાકી છે' },
    'home.due': { English: 'Due', Hindi: 'देय', Hinglish: 'Due', Marathi: 'देय', Gujarati: 'બાકી' },
    'home.no_meds_title': { English: 'All Caught Up!', Hindi: 'सब ठीक है!', Hinglish: 'All Caught Up!', Marathi: 'सर्व काही ठीक आहे!', Gujarati: 'બધું બરાબર છે!' },
    'home.view_tomorrow': { English: "View Tomorrow's Schedule", Hindi: 'कल का शेड्यूल देखें', Hinglish: "View Tomorrow's Schedule", Marathi: 'उद्याचे वेळापत्रक पहा', Gujarati: 'કાલનું શેડ્યૂલ જુઓ' },
    'home.no_meds_yet': { English: 'No Medications Yet', Hindi: 'अभी तक कोई दवा नहीं है', Hinglish: 'No Medications Yet', Marathi: 'अद्याप कोणतीही औषधे नाहीत', Gujarati: 'હજી સુધી કોઈ દવા નથી' },
    'home.add_first_med': { English: 'Add your first medication to get started.', Hindi: 'शुरू करने के लिए अपनी पहली दवा जोड़ें।', Hinglish: 'Add your first med to start.', Marathi: 'सुरू करण्यासाठी तुमचे पहिले औषध जोडा.', Gujarati: 'શરૂ કરવા માટે તમારી પ્રથમ દવા ઉમેરો.' },
    'home.excellent_progress': { English: 'Excellent progress, {name}!', Hindi: 'शानदार प्रगति, {name}!', Hinglish: 'Excellent progress, {name}!', Marathi: 'उत्तम प्रगती, {name}!', Gujarati: 'ઉત્તમ પ્રગતિ, {name}!' },
    'common.coming_soon': { English: 'Coming soon!', Hindi: 'जल्द आ रहा है!', Hinglish: 'Coming soon!', Marathi: 'लवकरच येत आहे!', Gujarati: 'ટૂંક સમયમાં આવી રહ્યું છે!' },
    'schedule.month_year': { English: 'January 2026', Hindi: 'जनवरी २०२६', Hinglish: 'January 2026', Marathi: 'जानेवारी २०२६', Gujarati: 'જાન્યુઆરી ૨૦૨૬' },
    'schedule.week': { English: 'Week', Hindi: 'सप्ताह', Hinglish: 'Week', Marathi: 'आठवडा', Gujarati: 'અઠવાડિયું' },
    'schedule.morning': { English: 'Morning', Hindi: 'सुबह', Hinglish: 'Morning', Marathi: 'सकाळ', Gujarati: 'સવાર' },
    'schedule.evening': { English: 'Evening', Hindi: 'शाम', Hinglish: 'Evening', Marathi: 'संध्याकाळ', Gujarati: 'સાંજ' },
    'days.mon': { English: 'Mon', Hindi: 'सोम', Hinglish: 'Mon', Marathi: 'सोम', Gujarati: 'સોમ' },
    'days.tue': { English: 'Tue', Hindi: 'मंगल', Hinglish: 'Tue', Marathi: 'मंगळ', Gujarati: 'મંગળ' },
    'days.wed': { English: 'Wed', Hindi: 'बुध', Hinglish: 'Wed', Marathi: 'बुध', Gujarati: 'બુધ' },
    'days.thu': { English: 'Thu', Hindi: 'गुरु', Hinglish: 'Thu', Marathi: 'गुरु', Gujarati: 'ગુરુ' },
    'days.fri': { English: 'Fri', Hindi: 'शुक्र', Hinglish: 'Fri', Marathi: 'शुक्र', Gujarati: 'શુક્ર' },
    'days.sat': { English: 'Sat', Hindi: 'शनि', Hinglish: 'Sat', Marathi: 'शनी', Gujarati: 'શનિ' },
    'days.sun': { English: 'Sun', Hindi: 'रवि', Hinglish: 'Sun', Marathi: 'रवी', Gujarati: 'રવિ' },
    'logs.activity_log': { English: 'Activity Log', Hindi: 'गतिविधि लॉग', Hinglish: 'Activity Log', Marathi: 'क्रियाकलाप लॉग', Gujarati: 'પ્રવૃત્તિ લોગ' },
    'logs.scheduled_time': { English: 'Scheduled', Hindi: 'निर्धारित समय', Hinglish: 'Scheduled', Marathi: 'नियोजित वेळ', Gujarati: 'નિર્ધારિત સમય' },
    'logs.actual_time': { English: 'Actual', Hindi: 'वास्तविक समय', Hinglish: 'Actual', Marathi: 'प्रत्यक्ष वेळ', Gujarati: 'વાસ્તવિક સમય' },
    'logs.verification': { English: 'Verification', Hindi: 'सत्यापन', Hinglish: 'Verification', Marathi: 'सत्यापन', Gujarati: 'ચકાસણી' },
    'logs.export_desc': { English: 'Generate a complete audit report for your healthcare provider', Hindi: 'अपने स्वास्थ्य सेवा प्रदाता के लिए एक पूर्ण ऑडिट रिपोर्ट तैयार करें', Hinglish: 'Generate audit report for doctor', Marathi: 'तुमच्या आरोग्य निगा पुरवठादारासाठी संपूर्ण ऑडिट अहवाल तयार करा', Gujarati: 'તમારા આરોગ્યસંભાળ પ્રદાતા માટે સંપૂર્ણ ઓડિટ રિપોર્ટ બનાવો' },
    'logs.disclaimer_title': { English: 'Medical Notice', Hindi: 'चिकित्सा सूचना', Hinglish: 'Medical Notice', Marathi: 'वैद्यकीय सूचना', Gujarati: 'તબીબી સૂચના' },
    'notif.subtitle': { English: 'Manage your medication reminders', Hindi: 'अपने दवा अनुस्मारक प्रबंधित करें', Hinglish: 'Manage your med reminders', Marathi: 'तुमची औषध स्मरणपत्रे व्यवस्थापित करा', Gujarati: 'તમારા દવાના રિમાઇન્ડર્સ મેનેજ કરો' },
    'notif.quick_actions': { English: 'Quick Actions', Hindi: 'त्वरित कार्रवाई', Hinglish: 'Quick Actions', Marathi: 'त्वरित कृती', Gujarati: 'ત્વરિત ક્રિયાઓ' },
    'notif.sample_notifs': { English: 'Generate sample medication reminders', Hindi: 'नमूना दवा अनुस्मारक तैयार करें', Hinglish: 'Generate sample med reminders', Marathi: 'नमुना औषध स्मरणपत्रे तयार करा', Gujarati: 'નમૂના દવાના રિમાઇન્ડર્સ બનાવો' },
    'notif.all_caught_up': { English: "You're all caught up! Use Quick Actions to test.", Hindi: 'सब ठीक है! परीक्षण के लिए त्वरित कार्रवाई का उपयोग करें।', Hinglish: "You're all caught up! Use Quick Actions to test.", Marathi: 'सर्व काही ठीक आहे! चाचणीसाठी त्वरित कृती वापरा.', Gujarati: 'બધું બરાબર છે! પરીક્ષણ માટે ઝડપી ક્રિયાઓનો ઉપયોગ કરો.' },
    'notif.how_it_works': { English: 'How it works', Hindi: 'यह कैसे काम करता है', Hinglish: 'How it works', Marathi: 'हे कसे कार्य करते', Gujarati: 'તે કેવી રીતે કાર્ય કરે છે' },
    'notif.schedule_new': { English: 'Schedule New Reminder', Hindi: 'नया रिमाइंडर शेड्यूल करें', Hinglish: 'Schedule New Reminder', Marathi: 'नवीन स्मरणपत्र शेड्यूल करा', Gujarati: 'નવું રિમાઇન્ડર શેડ્યૂલ કરો' },
    'notif.upcoming': { English: 'Upcoming Reminders', Hindi: 'आगामी रिमाइंडर', Hinglish: 'Upcoming Reminders', Marathi: 'आगामी स्मरणपत्रे', Gujarati: 'આગામી રિમાઇન્ડર્સ' },
    'notif.min_1': { English: '1 minute', Hindi: '१ मिनट', Hinglish: '1 minute', Marathi: '१ मिनिट', Gujarati: '૧ મિનિટ' },
    'notif.min_2': { English: '2 minutes', Hindi: '२ मिनट', Hinglish: '2 minutes', Marathi: '२ मिनिटे', Gujarati: '૨ મિનિટ' },
    'notif.min_5': { English: '5 minutes', Hindi: '५ मिनट', Hinglish: '5 minutes', Marathi: '५ मिनिटे', Gujarati: '૫ મિનિટ' },
    'notif.min_10': { English: '10 minutes', Hindi: '१० मिनट', Hinglish: '10 minutes', Marathi: '१० मिनिटे', Gujarati: '૧૦ મિનિટ' },
    'notif.min_15': { English: '15 minutes', Hindi: '१५ मिनट', Hinglish: '15 minutes', Marathi: '१५ मिनिटे', Gujarati: '૧૫ મિનિટ' },
    'notif.min_30': { English: '30 minutes', Hindi: '३० मिनट', Hinglish: '30 minutes', Marathi: '३० मिनिटे', Gujarati: '૩० મિનિટ' },
    'notif.hour_1': { English: '1 hour', Hindi: '१ घंटा', Hinglish: '1 hour', Marathi: '१ तास', Gujarati: '૧ કલાક' },
    'ai.health_score': { English: 'AI Health Score', Hindi: 'एआई स्वास्थ्य स्कोर', Hinglish: 'AI Health Score', Marathi: 'AI आरोग्य स्कोर', Gujarati: 'AI હેલ્થ સ્કોર' },
    'ai.risk_level': { English: 'Risk Level', Hindi: 'जोखिम स्तर', Hinglish: 'Risk Level', Marathi: 'धोका पातळी', Gujarati: 'જોખમ સ્તર' },
    'ai.streak': { English: 'Streak', Hindi: 'सिलसिला', Hinglish: 'Streak', Marathi: 'सिलसिला', Gujarati: 'સિલસિલો' },
    'ai.best_time': { English: 'Best Time for Evening Meds', Hindi: 'शाम की दवाओं के लिए सबसे अच्छा समय', Hinglish: 'Best time for evening meds', Marathi: 'संध्याकाळच्या औषधांसाठी सर्वोत्तम वेळ', Gujarati: 'સાંજની દવાઓ માટે શ્રેષ્ઠ સમય' },
    'ai.note': { English: '🤖 AI Note', Hindi: '🤖 एआई नोट', Hinglish: '🤖 AI Note', Marathi: '🤖 AI टीप', Gujarati: '🤖 AI નોંધ' },
    'ai.low_risk': { English: 'Low', Hindi: 'कम', Hinglish: 'Low', Marathi: 'कमी', Gujarati: 'ઓછું' },
    'ai.insights': { English: 'AI Insights', Hindi: 'एआई अंतर्दृष्टि', Hinglish: 'AI Insights', Marathi: 'AI अंतर्दृष्टी', Gujarati: 'AI આંતરદૃષ્ટિ' },
    'settings.profile_updated': { English: 'Profile updated successfully!', Hindi: 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!', Hinglish: 'Profile updated successfully!', Marathi: 'प्रोफाइल यशस्वीरित्या अपडेट केली!', Gujarati: 'પ્રોફાઇલ સફળતાપૂર્વક અપડેટ કરવામાં આવી!' },
    'settings.guest_user': { English: 'Guest User', Hindi: 'अतिथि उपयोगकर्ता', Hinglish: 'Guest User', Marathi: 'अतिथी वापरकर्ता', Gujarati: 'અતિથિ વપરાશકર્તા' },
    'settings.fill_all': { English: 'Please fill in all fields', Hindi: 'कृपया सभी फ़ील्ड भरें', Hinglish: 'Please fill in all fields', Marathi: 'कृपया सर्व फील्ड भरा', Gujarati: 'કૃપા કરીને બધી ફીલ્ડ્સ ભરો' },
    'settings.pass_mismatch': { English: 'New passwords do not match', Hindi: 'नए पासवर्ड मेल नहीं खाते', Hinglish: 'New passwords do not match', Marathi: 'नवीन पासवर्ड जुळत नाहीत', Gujarati: 'નવા પાસવર્ડ્સ મેળ ખાતા નથી' },
    'settings.pass_success': { English: 'Password changed successfully', Hindi: 'पासवर्ड सफलतापूर्वक बदल दिया गया', Hinglish: 'Password changed successfully', Marathi: 'पासवर्ड यशस्वीरित्या बदलला', Gujarati: 'પાસવર્ડ સફળતાપૂર્વક બદલાઈ ગયો' },
    'settings.lang_changed': { English: 'Language changed to {lang}', Hindi: 'भाषा बदलकर {lang} हो गई', Hinglish: 'Language changed to {lang}', Marathi: 'भाषा {lang} वर बदलली', Gujarati: 'ભાષા {lang} માં બદલાઈ ગઈ' },
    'settings.voice_enabled_toast': { English: 'Voice Assistant enabled', Hindi: 'वॉयस असिस्टेंट सक्षम', Hinglish: 'Voice Assistant enabled', Marathi: 'व्हॉइस असिस्टंट सक्षम', Gujarati: 'વૉઇસ આસિસ્ટન્ટ સક્ષમ' },
    'settings.voice_disabled_toast': { English: 'Voice Assistant disabled', Hindi: 'वॉयस असिस्टेंट अक्षम', Hinglish: 'Voice Assistant disabled', Marathi: 'व्हॉइस असिस्टंट अक्षम', Gujarati: 'વૉઇસ આસિસ્ટન્ટ અક્ષમ' },
    'settings.audio_enabled_toast': { English: 'Audio Reminders enabled', Hindi: 'ऑडियो रिमाइंडर सक्षम', Hinglish: 'Audio Reminders enabled', Marathi: 'ऑडिओ स्मरणपत्रे सक्षम', Gujarati: 'ઓડિયો રીમાઇન્ડર્સ સક્ષમ' },
    'settings.audio_disabled_toast': { English: 'Audio Reminders disabled', Hindi: 'ऑडियो रिमाइंडर अक्षम', Hinglish: 'Audio Reminders disabled', Marathi: 'ऑडिओ स्मरणपत्रे अक्षम', Gujarati: 'ઓડિયો રીમાઇન્ડર્સ અક્ષમ' },
    'settings.med_reminders_toast': { English: 'Medication Reminders toggled', Hindi: 'दवा अनुस्मारक टॉगल किया गया', Hinglish: 'Med Reminders toggled', Marathi: 'औषध स्मरणपत्रे टॉगल केली', Gujarati: 'દવા રીમાઇન્ડર્સ ટોગલ કરવામાં આવ્યા' },
    'settings.ai_insights_toast': { English: 'AI Insights toggled', Hindi: 'एआई अंतर्दृष्टि टॉगल की गई', Hinglish: 'AI Insights toggled', Marathi: 'AI अंतर्दृष्टी टॉगल केली', Gujarati: 'AI આંતરદૃષ્ટિ ટોગલ કરવામાં આવી' },
    'settings.version_toast': { English: 'AdherAI v2.1.0 is the latest version.', Hindi: 'AdherAI v2.1.0 नवीनतम संस्करण है।', Hinglish: 'AdherAI v2.1.0 is the latest version.', Marathi: 'AdherAI v2.1.0 ही नवीनतम आवृत्ती आहे.', Gujarati: 'AdherAI v2.1.0 નવીનતમ સંસ્કરણ છે.' },
    'settings.version_label': { English: 'v2.1.0 • System Normal', Hindi: 'v2.1.0 • सिस्टम सामान्य', Hinglish: 'v2.1.0 • System Normal', Marathi: 'v2.1.0 • सिस्टम नॉर्मल', Gujarati: 'v2.1.0 • સિસ્ટમ નોર્મલ' },
    'settings.live_support_toast': { English: 'Connecting you to a support agent...', Hindi: 'आपको सहायता एजेंट से जोड़ रहे हैं...', Hinglish: 'Connecting you to support...', Marathi: 'तुम्हाला सपोर्ट एजंटशी जोडत आहे...', Gujarati: 'તમને સપોર્ટ એજન્ટ સાથે કનેક્ટ કરી રહ્યાં છીએ...' },
    'settings.voice_status_off': { English: 'Disabled', Hindi: 'अक्षम', Hinglish: 'Disabled', Marathi: 'अक्षम', Gujarati: 'અક્ષમ' },

    // Medication Data
    'med.purpose.diabetes': { English: 'Type 2 Diabetes Management', Hindi: 'टाइप 2 मधुमेह प्रबंधन', Hinglish: 'Type 2 Diabetes Management', Marathi: 'टाइप २ मधुमेह व्यवस्थापन', Gujarati: 'ટાઇપ ૨ ડાયાબિટીસ મેનેજમેન્ટ' },
    'med.side.nausea': { English: 'Nausea', Hindi: 'जी मिचलाना', Hinglish: 'Nausea', Marathi: 'मळमळ', Gujarati: 'ઉબકા' },
    'med.side.diarrhea': { English: 'Diarrhea', Hindi: 'दस्त', Hinglish: 'Diarrhea', Marathi: 'अतिसार', Gujarati: 'ઝાડા' },
    'med.side.stomach': { English: 'Stomach upset', Hindi: 'पेट खराब', Hinglish: 'Stomach upset', Marathi: 'पोट खराब', Gujarati: 'પેટ ખરાબ' },
    'med.instr.meals': { English: 'Take with meals. Avoid alcohol.', Hindi: 'भोजन के साथ लें। शराब से बचें।', Hinglish: 'Take with meals. Avoid alcohol.', Marathi: 'जेवणासोबत घ्या. अल्कोहोल टाळा.', Gujarati: 'જમતી વખતે લો. આલ્કોહોલ ટાળો.' },
    'med.purpose.bp': { English: 'Blood Pressure Control', Hindi: 'रक्तचाप नियंत्रण', Hinglish: 'Blood Pressure Control', Marathi: 'रक्तदाब नियंत्रण', Gujarati: 'બ્લડ પ્રેશર નિયંત્રણ' },
    'med.side.dizziness': { English: 'Dizziness', Hindi: 'चक्कर आना', Hinglish: 'Dizziness', Marathi: 'चक्कर येणे', Gujarati: 'ચક્કર આવવા' },
    'med.side.cough': { English: 'Dry cough', Hindi: 'सूखी खांसी', Hinglish: 'Dry cough', Marathi: 'कोरडा खोकला', Gujarati: 'સૂકી ખાંસી' },
    'med.side.headache': { English: 'Headache', Hindi: 'सिरदर्द', Hinglish: 'Headache', Marathi: 'डोकेदुखी', Gujarati: 'માથાનો દુખાવો' },
    'med.instr.bp': { English: 'Take at same time daily. Monitor blood pressure.', Hindi: 'प्रतिदिन एक ही समय पर लें। रक्तचाप की निगरानी करें।', Hinglish: 'Take same time daily', Marathi: 'दररोज एकाच वेळी घ्या. रक्तदाब तपासा.', Gujarati: 'દરરોજ એક જ સમયે લો. બ્લડ પ્રેશર મોનિટર કરો.' },
    'med.purpose.cholesterol': { English: 'Cholesterol Management', Hindi: 'कोलेस्ट्रॉल प्रबंधन', Hinglish: 'Cholesterol Management', Marathi: 'कोलेस्टेरॉल व्यवस्थापन', Gujarati: 'કોલેસ્ટ્રોલ મેનેજમેન્ટ' },
    'med.side.muscle': { English: 'Muscle pain', Hindi: 'मांसपेशियों में दर्द', Hinglish: 'Muscle pain', Marathi: 'स्नायू दुखणे', Gujarati: 'સ્નાયુનો દુખાવો' },
    'med.side.fatigue': { English: 'Fatigue', Hindi: 'थकान', Hinglish: 'Fatigue', Marathi: 'थकवा', Gujarati: 'થાક' },
    'med.side.digestive': { English: 'Digestive issues', Hindi: 'पाचन संबंधी समस्याएं', Hinglish: 'Digestive issues', Marathi: 'पचनाच्या समस्या', Gujarati: 'પાચન સમસ્યાઓ' },
    'med.instr.evening': { English: 'Take in evening. Avoid grapefruit.', Hindi: 'शाम को लें। चकोतरा (grapefruit) से बचें।', Hinglish: 'Take in evening. Avoid grapefruit.', Marathi: 'संध्याकाळी घ्या. ग्रेपफ्रूट टाळा.', Gujarati: 'સાંજે લો. ગ્રેપફ્રૂટ ટાળો.' },
    'med.purpose.heart': { English: 'Heart Health', Hindi: 'हृदय स्वास्थ्य', Hinglish: 'Heart Health', Marathi: 'हृदय आरोग्य', Gujarati: 'હૃદયનું સ્વાસ્થ્ય' },
    'med.side.irritation': { English: 'Stomach irritation', Hindi: 'पेट में जलन', Hinglish: 'Stomach irritation', Marathi: 'पोटात जळजळ', Gujarati: 'પેટમાં બળતરા' },
    'med.side.bleeding': { English: 'Bleeding risk', Hindi: 'रक्तस्राव का जोखिम', Hinglish: 'Bleeding risk', Marathi: 'रक्तस्त्रावाचा धोका', Gujarati: 'રક્તસ્રાવનું જોખમ' },
    'med.instr.heart': { English: 'Take with food. Report unusual bleeding.', Hindi: 'भोजन के साथ लें। असामान्य रक्तस्राव की रिपोर्ट करें।', Hinglish: 'Take with food.', Marathi: 'जेवणासोबत घ्या. असामान्य रक्तस्त्रावाची तक्रार करा.', Gujarati: 'ખોરાક સાથે લો. અસામાન્ય રક્તસ્રાવની જાણ કરો.' },
    'med.purpose.thyroid': { English: 'Thyroid Management', Hindi: 'थायराइड प्रबंधन', Hinglish: 'Thyroid Management', Marathi: 'थायरॉईड व्यवस्थापन', Gujarati: 'થાઇરોઇડ મેનેજમેન્ટ' },
    'med.side.weight': { English: 'Weight changes', Hindi: 'वजन में बदलाव', Hinglish: 'Weight changes', Marathi: 'वजनातील बदल', Gujarati: 'વજનમાં ફેરફાર' },
    'med.side.insomnia': { English: 'Insomnia', Hindi: 'अनिद्रा', Hinglish: 'Insomnia', Marathi: 'अनिद्रा', Gujarati: 'અનિદ્રા' },
    'med.instr.thyroid': { English: 'Take on empty stomach, 30 min before breakfast.', Hindi: 'खाली पेट लें, नाश्ते से 30 मिनट पहले।', Hinglish: 'Take on empty stomach', Marathi: 'रिकाम्या पोटी, न्याहारीच्या ३० मिनिटे आधी घ्या.', Gujarati: 'ખાલી પેટે લો, નાસ્તાના ૩૦ મિનિટ પહેલા.' },

    // AI dashboard
    'ai.insight.delay': { English: 'You often delay evening medicines. Consider setting an alarm.', Hindi: 'आप अक्सर शाम की दवाओं में देरी करते हैं। अलार्म सेट करने पर विचार करें।', Hinglish: 'Often delay evening meds. Set alarm.', Marathi: 'तुम्ही अनेकदा संध्याकाळच्या औषधांना उशीर करता. अलार्म लावण्याचा विचार करा.', Gujarati: 'તમે વારંવાર સાંજની દવાઓમાં વિલંબ કરો છો. એલાર્મ સેટ કરવાનું વિચારો.' },
    'ai.insight.improve': { English: 'Your adherence improved by 12% this week. Great progress!', Hindi: 'इस सप्ताह आपके अनुपालन में 12% सुधार हुआ है। शानदार प्रगति!', Hinglish: 'Adherence improved by 12%. Great progress!', Marathi: 'या आठवड्यात तुमच्या पालनात १२% सुधारणा झाली आहे. उत्तम प्रगती!', Gujarati: 'આ અઠવાડિયે તમારા પાલનમાં ૧૨% સુધારો થયો છે. મહાન પ્રગતિ!' },
    'ai.insight.streak': { English: 'Perfect adherence for 3 days in a row. Keep it up!', Hindi: 'लगातार 3 दिनों तक पूर्ण अनुपालन। इसे जारी रखें!', Hinglish: 'Perfect adherence for 3 days. Keep it up!', Marathi: 'सलग ३ दिवस परिपूर्ण पालन. असेच चालू ठेवा!', Gujarati: 'સળંગ ૩ દિવસ સુધી સંપૂર્ણ પાલન. તેને ચાલુ રાખો!' },
    'ai.prediction.best_time_desc': { English: 'Based on your routine, take evening medications between 7:30 - 8:00 PM for optimal adherence.', Hindi: 'अपनी दिनचर्या के आधार पर, सर्वोत्तम अनुपालन के लिए शाम 7:30 - 8:00 के बीच शाम की दवाएं लें।', Hinglish: 'Take evening meds between 7:30-8:00 PM', Marathi: 'तुमच्या नित्यक्रमानुसार, चांगल्या पालनासाठी संध्याकाळी ७:३० - ८:०० दरम्यान संध्याकाळची औषधे घ्या.', Gujarati: 'તમારી દિનચર્યાના આધારે, શ્રેષ્ઠ પાલન માટે સાંજે ૭:૩૦ - ૮:०० ની વચ્ચે સાંજની દવાઓ લો.' },
    'ai.prediction.goal': { English: 'Goal Achievement', Hindi: 'लक्ष्य प्राप्ति', Hinglish: 'Goal Achievement', Marathi: 'ध्येय प्राप्ती', Gujarati: 'ધ્યેય પ્રાપ્તિ' },
    'ai.prediction.goal_desc': { English: "You're on track to achieve 95% adherence this month. Keep up the excellent work!", Hindi: 'आप इस महीने 95% अनुपालन प्राप्त करने की राह पर हैं। शानदार काम जारी रखें!', Hinglish: 'On track to 95% adherence. Keep it up!', Marathi: 'तुम्ही या महिन्यात ९५% पालन साध्य करण्याच्या मार्गावर आहात. उत्तम काम चालू ठेवा!', Gujarati: 'તમે આ મહિને ૯५% पालन प्राप्त કરવાના માર્ગ પર છો. ઉત્તમ कार्य चालू રાખો!' },

    // Additional Reports & Notifications
    'reports.monthly_title': { English: 'Monthly Adherence Report', Hindi: 'मासिक अनुपालन रिपोर्ट', Hinglish: 'Monthly Adherence Report', Marathi: 'मासिक पालन अहवाल', Gujarati: 'માસિક અનુપાલન અહેવાલ' },
    'reports.quarterly_title': { English: 'Quarterly Health Summary', Hindi: 'त्रैमासिक स्वास्थ्य सारांश', Hinglish: 'Quarterly Health Summary', Marathi: 'त्रैमासिक आरोग्य सारांश', Gujarati: 'ત્રિમાસિક આરોગ્ય સારાંશ' },
    'reports.annual_title': { English: 'Annual Medical Record', Hindi: 'वार्षिक चिकित्सा रिकॉर्ड', Hinglish: 'Annual Medical Record', Marathi: 'वार्षिक वैद्यकीय रेकॉर्ड', Gujarati: 'વાર્ષિક તબીબી રેકોર્ડ' },
    'reports.dec_2025': { English: 'December 2025', Hindi: 'दिसंबर 2025', Hinglish: 'December 2025', Marathi: 'डिसेंबर २०२५', Gujarati: 'ડિસેમ્બર ૨૦૨૫' },
    'reports.q4_2025': { English: 'Q4 2025', Hindi: 'Q4 2025', Hinglish: 'Q4 2025', Marathi: 'Q4 २०२५', Gujarati: 'Q4 ૨૦૨૫' },
    'reports.year_2025': { English: '2025', Hindi: '2025', Hinglish: '2025', Marathi: '२०२५', Gujarati: '૨૦૨૫' },
    'notif.active_reminders': { English: 'Active Reminders', Hindi: 'सक्रिय रिमाइंडर', Hinglish: 'Active Reminders', Marathi: 'सक्रिय स्मरणपत्रे', Gujarati: 'સક્રિય રીમાઇન્ડર્સ' },
    'notif.no_scheduled': { English: 'No Scheduled Reminders', Hindi: 'कोई निर्धारित रिमाइंडर नहीं', Hinglish: 'No Scheduled Reminders', Marathi: 'कोणतेही नियोजित स्मरणपत्र नाहीत', Gujarati: 'કોઈ પણ શિડ્યુઅલ રીમાઇન્ડર્સ નથી' },
    'notif.schedule_first': { English: 'Schedule your first reminder above', Hindi: 'ऊपर अपना पहला रिमाइंडर निर्धारित करें', Hinglish: 'Schedule your first reminder', Marathi: 'वर तुमचे पहिले स्मरणपत्र शेड्यूल करा', Gujarati: 'ઉપર તમારું પ્રથમ રીમાઇન્ડર શિડ્યુઅલ કરો' },
    'notif.pending': { English: 'Pending', Hindi: 'लंबित', Hinglish: 'Pending', Marathi: 'प्रलंबित', Gujarati: 'બાકી' },
    'notif.sent': { English: 'Sent', Hindi: 'भेजा गया', Hinglish: 'Sent', Marathi: 'पाठवले', Gujarati: 'મોકલેલ' },
    'notif.fill_fields': { English: 'Please fill all fields', Hindi: 'कृपया सभी फ़ील्ड भरें', Hinglish: 'Please fill all fields', Marathi: 'कृपया सर्व फील्ड भरा', Gujarati: 'કૃપા કરીને બધી વિગતો ભરો' },
    'notif.how_step1': { English: 'Schedule reminders for future times', Hindi: 'भविष्य के समय के लिए रिमाइंडर निर्धारित करें', Hinglish: 'Schedule for future', Marathi: 'भविष्यातील वेळेसाठी स्मरणपत्रे शेड्यूल करा', Gujarati: 'ભવિષ્યના સમય માટે રીમાઇન્ડર્સ શિડ્યુઅલ કરો' },
    'notif.how_step2': { English: 'Browser notifications will appear at scheduled time', Hindi: 'निर्धारित समय पर ब्राउज़र सूचनाएं दिखाई देंगी', Hinglish: 'Notifs appear at scheduled time', Marathi: 'नियोजित वेळी ब्राउझर सूचना दिसतील', Gujarati: 'શિડ્યુઅલ કરેલા સમયે બ્રાઉઝર સૂચનાઓ દેખાશે' },
    'notif.how_step3': { English: 'Keep browser tab open (can be minimized)', Hindi: 'ब्राउज़र टैब खुला रखें (मिनिमाइज़ किया जा सकता है)', Hinglish: 'Keep browser tab open', Marathi: 'ब्राउझर टॅब उघडा ठेवा (मिनिमाइझ केले जाऊ शकते)', Gujarati: 'બ્રાઉઝર ટેબ ખુલ્લી રાખો (મિનિમાઇઝ કરી શકાય છે)' },
    'notif.how_step4': { English: "Works even if you're on another tab", Hindi: 'भले ही आप दूसरे टैब पर हों, यह काम करता है', Hinglish: 'Works on another tab too', Marathi: 'तुम्ही दुसऱ्या टॅबवर असलात तरीही कार्य करते', Gujarati: 'ભલે તમે બીજા ટેબ પર હોવ, આ કામ કરે છે' },

    // Caretaker Screens
    'caretaker.back_to_patients': { English: 'Back to Patients', Hindi: 'मरीजों पर वापस जाएं', Hinglish: 'Back to Patients', Marathi: 'रुग्णांकडे परत जा', Gujarati: 'દર્દીઓ પર પાછા જાઓ' },
    'caretaker.add_medication': { English: 'Add Medication', Hindi: 'दवा जोड़ें', Hinglish: 'Add Medication', Marathi: 'औषध जोडा', Gujarati: 'દવા ઉમેરો' },
    'caretaker.years_old': { English: '{age} years old', Hindi: '{age} साल के', Hinglish: '{age} years old', Marathi: '{age} वर्षांचे', Gujarati: '{age} વર્ષીય' },
    'caretaker.current_adherence': { English: 'Current Adherence', Hindi: 'वर्तमान अनुपालन', Hinglish: 'Current Adherence', Marathi: 'सध्याचे पालन', Gujarati: 'વર્તમાન અનુપાલન' },
    'caretaker.overview': { English: 'Overview', Hindi: 'अवलोकन', Hinglish: 'Overview', Marathi: 'आढावा', Gujarati: 'ઝાંખી' },
    'caretaker.schedule': { English: 'Schedule', Hindi: 'समय सारणी', Hinglish: 'Schedule', Marathi: 'वेळापत्रक', Gujarati: 'શિડ્યુઅલ' },
    'caretaker.logs': { English: 'Logs', Hindi: 'लॉग्स', Hinglish: 'Logs', Marathi: 'नोंदी', Gujarati: 'લોગ્સ' },
    'caretaker.missed_today': { English: 'Missed Today', Hindi: 'आज छूटी हुई', Hinglish: 'Missed Today', Marathi: 'आज चुकलेले', Gujarati: 'આજે ચૂકી ગયેલ' },
    'caretaker.last_checkin': { English: 'Last Check-in', Hindi: 'पिछला चेक-इन', Hinglish: 'Last Check-in', Marathi: 'शेवटचे चेक-इन', Gujarati: 'છેલ્લું ચેક-ઇન' },
    'caretaker.recent_activity': { English: 'Recent Activity', Hindi: 'हाल की गतिविधि', Hinglish: 'Recent Activity', Marathi: 'अलीकडील क्रियाकलाप', Gujarati: 'તાજેતરની પ્રવૃત્તિ' },
    'caretaker.taken_at': { English: 'Taken at {time}', Hindi: '{time} पर ली गई', Hinglish: 'Taken at {time}', Marathi: '{time} वाजता घेतले', Gujarati: '{time} વાગ્યે લીધેલ' },
    'caretaker.missed_at': { English: 'Missed - scheduled for {time}', Hindi: 'छूट गई - {time} के लिए निर्धारित', Hinglish: 'Missed - scheduled for {time}', Marathi: 'चुकले - {time} साठी नियोजित', Gujarati: 'ચૂકી ગયેલ - {time} માટે શિડ્યુઅલ' },
    'caretaker.pending_at': { English: 'Pending - {time}', Hindi: 'लंबित - {time}', Hinglish: 'Pending - {time}', Marathi: 'प्रलंबित - {time}', Gujarati: 'બાકી - {time}' },
    'caretaker.med_schedule': { English: 'Medication Schedule', Hindi: 'दवाओं की समय सारणी', Hinglish: 'Medication Schedule', Marathi: 'औषध वेळापत्रक', Gujarati: 'દવાનું શિડ્યુઅલ' },
    'caretaker.med_logs': { English: 'Medication Logs', Hindi: 'दवाओं के लॉग्स', Hinglish: 'Medication Logs', Marathi: 'औषध नोंदी', Gujarati: 'દવા લોગ્સ' },
    'caretaker.scheduled': { English: 'Scheduled', Hindi: 'निर्धारित', Hinglish: 'Scheduled', Marathi: 'नियोजित', Gujarati: 'શિડ્યુઅલ' },
    'caretaker.actual': { English: 'Actual', Hindi: 'वास्तविक', Hinglish: 'Actual', Marathi: 'वास्तविक', Gujarati: 'વાસ્તવિક' },
    'caretaker.verified_by': { English: 'Verified by', Hindi: 'इनके द्वारा सत्यापित', Hinglish: 'Verified by', Marathi: 'द्वारे सत्यापित', Gujarati: 'દ્વારા ચકાસાયેલ' },
    'caretaker.reports_title': { English: 'Reports & Analytics', Hindi: 'रिपोर्ट्स और एनालिटिक्स', Hinglish: 'Reports & Analytics', Marathi: 'अहवाल आणि विश्लेषण', Gujarati: 'અહેવાલો અને એનાલિટિક્સ' },
    'caretaker.reports_desc': { English: 'Overview of all patients', Hindi: 'सभी मरीजों का अवलोकन', Hinglish: 'Overview of all patients', Marathi: 'सर्व रुग्णांचा आढावा', Gujarati: 'બધા દર્દીઓની ઝાંખી' },
    'caretaker.export_all': { English: 'Export All', Hindi: 'सभी एक्सपोर्ट करें', Hinglish: 'Export All', Marathi: 'सर्व एक्सपोर्ट करा', Gujarati: 'બધું નિકાસ કરો' },
    'caretaker.overall_stats': { English: 'Overall Statistics', Hindi: 'कुल आँकड़े', Hinglish: 'Overall Statistics', Marathi: 'एकूण आकडेवारी', Gujarati: 'એકંદર આંકડા' },
    'caretaker.total_patients': { English: 'Total Patients', Hindi: 'कुल मरीज', Hinglish: 'Total Patients', Marathi: 'एकूण रुग्ण', Gujarati: 'કુલ દર્દીઓ' },
    'caretaker.avg_adherence': { English: 'Avg Adherence', Hindi: 'औसत अनुपालन', Hinglish: 'Avg Adherence', Marathi: 'सरासरी पालन', Gujarati: 'સરેરાશ પાલન' },
    'caretaker.total_meds': { English: 'Total Meds', Hindi: 'कुल दवाएं', Hinglish: 'Total Meds', Marathi: 'एकूण औषधे', Gujarati: 'કુલ દવાઓ' },
    'caretaker.missed_total': { English: 'Missed Total', Hindi: 'कुल छूटी हुई', Hinglish: 'Missed Total', Marathi: 'एकूण चुकलेले', Gujarati: 'કુલ ચૂકી ગયેલ' },
    'caretaker.patient_details': { English: 'Patient Details', Hindi: 'मरीजों का विवरण', Hinglish: 'Patient Details', Marathi: 'रुग्ण तपशील', Gujarati: 'દર્દીની વિગતો' },
    'caretaker.recent_med_activity': { English: 'Recent Medication Activity', Hindi: 'हाल की दवा गतिविधि', Hinglish: 'Recent Medication Activity', Marathi: 'अलीकडील औषध क्रियाकलाप', Gujarati: 'તાજેતરની દવા પ્રવૃત્તિ' },

    // Add Medication Modal
    'addmed.title': { English: 'Add Medication', Hindi: 'दवा जोड़ें', Hinglish: 'Add Medication', Marathi: 'औषध जोडा', Gujarati: 'દવા ઉમેરો' },
    'addmed.step_info': { English: 'Step {current} of {total}: {title}', Hindi: 'चरण {current}/{total}: {title}', Hinglish: 'Step {current} of {total}: {title}', Marathi: 'टप्पा {current}/{total}: {title}', Gujarati: 'પગલું {current}/{total}: {title}' },
    'addmed.basic': { English: 'Basic Details', Hindi: 'बुनियादी विवरण', Hinglish: 'Basic Details', Marathi: 'मूलभूत तपशील', Gujarati: 'મૂળભૂત વિગતો' },
    'addmed.schedule': { English: 'Schedule', Hindi: 'समय सारणी', Hinglish: 'Schedule', Marathi: 'वेळापत्रक', Gujarati: 'શિડ્યુઅલ' },
    'addmed.appearance': { English: 'Appearance & Instructions', Hindi: 'दिखावट और निर्देश', Hinglish: 'Appearance & Instructions', Marathi: 'स्वरूप आणि सूचना', Gujarati: 'દેખાવ અને સૂચનાઓ' },
    'addmed.name_label': { English: 'Medication Name', Hindi: 'दवा का नाम', Hinglish: 'Medication Name', Marathi: 'औषधाचे नाव', Gujarati: 'દવાનું નામ' },
    'addmed.dosage_label': { English: 'Dosage', Hindi: 'खुराक', Hinglish: 'Dosage', Marathi: 'डोस', Gujarati: 'ડોઝ' },
    'addmed.purpose_label': { English: 'Purpose', Hindi: 'उद्देश्य', Hinglish: 'Purpose', Marathi: 'उद्देश', Gujarati: 'હેતુ' },
    'addmed.freq_label': { English: 'Frequency', Hindi: 'आवृत्ति', Hinglish: 'Frequency', Marathi: 'वारंवारता', Gujarati: 'વારંવારતા' },
    'addmed.times_label': { English: 'Times', Hindi: 'समय', Hinglish: 'Times', Marathi: 'वेळ', Gujarati: 'સમય' },
    'addmed.color_label': { English: 'Color', Hindi: 'रंग', Hinglish: 'Color', Marathi: 'रंग', Gujarati: 'રંગ' },
    'addmed.shape_label': { English: 'Shape', Hindi: 'आकार', Hinglish: 'Shape', Marathi: 'आकार', Gujarati: 'આકાર' },
    'addmed.add_time': { English: 'Add Time', Hindi: 'समय जोड़ें', Hinglish: 'Add Time', Marathi: 'वेळ जोडा', Gujarati: 'સમય ઉમેરો' },
    'addmed.freq_1x': { English: 'Once daily', Hindi: 'दिन में एक बार', Hinglish: 'Once daily', Marathi: 'दिवसातून एकदा', Gujarati: 'દિવસમાં એકવાર' },
    'addmed.freq_2x': { English: 'Twice daily', Hindi: 'दिन में दो बार', Hinglish: 'Twice daily', Marathi: 'दिवसातून दोनदा', Gujarati: 'દિવસમાં બે વાર' },
    'addmed.freq_3x': { English: 'Three times daily', Hindi: 'दिन में तीन बार', Hinglish: 'Three times daily', Marathi: 'दिवसातून तीनदा', Gujarati: 'દિવસમાં ત્રણ વાર' },
    'addmed.freq_4x': { English: 'Four times daily', Hindi: 'दिन में चार बार', Hinglish: 'Four times daily', Marathi: 'दिवसातून चारदा', Gujarati: 'દિવસમાં चार વાર' },
    'addmed.freq_needed': { English: 'As needed', Hindi: 'जरूरत के अनुसार', Hinglish: 'As needed', Marathi: 'गरजेनुसार', Gujarati: 'જરૂર મુજબ' },

    // Time Formatting
    'time.just_now': { English: 'Just now', Hindi: 'अभी-अभी', Hinglish: 'Just now', Marathi: 'आत्ताच', Gujarati: 'હમણાં જ' },
    'time.hours_ago': { English: '{count}h ago', Hindi: '{count} घंटे पहले', Hinglish: '{count}h ago', Marathi: '{count} तासांपूर्वी', Gujarati: '{count} કલાક પહેલા' },
    'time.days_ago': { English: '{count}d ago', Hindi: '{count} दिन पहले', Hinglish: '{count}d ago', Marathi: '{count} दिवसांपूर्वी', Gujarati: '{count} દિવસ પહેલા' },

    // Login Screen
    'login.welcome': { English: 'Welcome to AdherAI', Hindi: 'AdherAI में आपका स्वागत है', Hinglish: 'Welcome to AdherAI', Marathi: 'AdherAI मध्ये आपले स्वागत आहे', Gujarati: 'AdherAI માં આપનું સ્વાગત છે' },
    'login.tagline': { English: 'Your voice-first medication intelligence platform', Hindi: 'आपका वॉयस-फर्स्ट मेडिकेशन इंटेलिजेंस प्लेटफॉर्म', Hinglish: 'Aapka voice-first medication intelligence platform', Marathi: 'तुमचे व्हॉइस-फर्स्ट मेडिकेशन इंटेलिजन्स प्लॅटफॉर्म', Gujarati: 'તમારું વૉઇસ-ફર્સ્ટ મેડિકેશન ઇન્ટેલિजન્સ પ્લેटफॉर्म' },
    'login.sign_in': { English: 'Sign In', Hindi: 'साइन इन करें', Hinglish: 'Sign In', Marathi: 'साइन इन करा', Gujarati: 'સાઇન ઇન કરો' },
    'login.sign_up': { English: 'Sign Up', Hindi: 'साइन अप करें', Hinglish: 'Sign Up', Marathi: 'साइन अप करा', Gujarati: 'સાઇન અપ કરો' },
    'login.i_am_a': { English: 'I am a...', Hindi: 'मैं हूँ एक...', Hinglish: 'Main hoon ek...', Marathi: 'मी आहे एक...', Gujarati: 'હું છું એક...' },
    'login.patient': { English: 'Patient', Hindi: 'मरीज', Hinglish: 'Patient', Marathi: 'रुग्ण', Gujarati: 'દર્દી' },
    'login.caretaker': { English: 'Caretaker', Hindi: 'केयरगिवर', Hinglish: 'Caretaker', Marathi: 'केअरगिव्हर', Gujarati: 'કેરગીવર' },
    'login.demo_caretaker': { English: 'Demo Caretaker Access', Hindi: 'डेमो केयरगिवर एक्सेस', Hinglish: 'Demo Caretaker Access', Marathi: 'डेमो केअरगिव्हर ॲक्सेस', Gujarati: 'ડેમો કેરગીવર એક્સેસ' },
    'login.demo_patient': { English: 'Demo Patient Access', Hindi: 'डेमो मरीज एक्सेस', Hinglish: 'Demo Patient Access', Marathi: 'डेमो रुग्ण ॲक्सेस', Gujarati: 'डेमो पેશન્ટ એક્से स' },
    'login.email_label': { English: 'Email Address', Hindi: 'ईमेल पता', Hinglish: 'Email Address', Marathi: 'ईमेल पत्ता', Gujarati: 'ઈમેલ એડ્રેસ' },
    'login.email_placeholder': { English: 'you@example.com', Hindi: 'aap@example.com', Hinglish: 'you@example.com', Marathi: 'tumhi@example.com', Gujarati: 'tame@example.com' },
    'login.password_label': { English: 'Password', Hindi: 'पासवर्ड', Hinglish: 'Password', Marathi: 'पासवर्ड', Gujarati: 'પાસવર્ડ' },
    'login.password_placeholder': { English: 'Enter password', Hindi: 'पासवर्ड दर्ज करें', Hinglish: 'Enter password', Marathi: 'पासवर्ड प्रविष्ट करा', Gujarati: 'પાસવર્ડ દાખલ કરો' },
    'login.full_name': { English: 'Full Name', Hindi: 'पूरा नाम', Hinglish: 'Full Name', Marathi: 'पूर्ण नाव', Gujarati: 'પૂરું નામ' },
    'login.full_name_placeholder': { English: 'John Doe', Hindi: 'जॉन डो', Hinglish: 'John Doe', Marathi: 'जॉन डो', Gujarati: 'જ્હોન ડો' },
    'login.processing': { English: 'Processing...', Hindi: 'प्रसंस्करण हो रहा है...', Hinglish: 'Processing...', Marathi: 'प्रक्रिया करत आहे...', Gujarati: 'પ્રક્રિયા થઈ રહી છે...' },
    'login.create_account': { English: 'Create Account', Hindi: 'खाता बनाएँ', Hinglish: 'Create Account', Marathi: 'खाते तयार करा', Gujarati: 'ખાતું બનાવો' },
    'login.secure_hint': { English: 'Secure HIPAA-Compliant Login', Hindi: 'सुरक्षित HIPAA-अनुपालन लॉगिन', Hinglish: 'Secure HIPAA-Compliant Login', Marathi: 'सुरक्षित HIPAA-सुसंगत लॉगिन', Gujarati: 'સુરક્ષિત HIPAA-સુસંગત લોગિન' },
    'login.error_fields': { English: 'Please fill in all fields', Hindi: 'कृपया सभी फ़ील्ड भरें', Hinglish: 'Please fill in all fields', Marathi: 'कृपया सर्व फील्ड भरा', Gujarati: 'કૃપા કરીને બધી ફીલ્ડ्स ભરો' },
    'login.error_name': { English: 'Name is required', Hindi: 'नाम आवश्यक है', Hinglish: 'Name is required', Marathi: 'नाव आवश्यक आहे', Gujarati: 'નામ જરૂરી છે' },
};







interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('app_language');
        return (saved as Language) || 'English';
    });

    useEffect(() => {
        localStorage.setItem('app_language', language);
    }, [language]);

    const t = (key: string): string => {
        if (!translations[key]) return key;
        return translations[key][language] || translations[key]['English'];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
