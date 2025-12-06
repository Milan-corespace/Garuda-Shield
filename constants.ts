import { Transaction, ConsentItem, CreditFactor, Language, Bank, Persona, CommitteeMember, FamilyMember, ErrorCode, Subscription, ScamAlert, SearchIntent, Tab, BlogPost } from './types';

// --- DATA TRANSLATIONS DICTIONARY ---
// This contains the raw translated strings for data entities.

const DATA_STRINGS: Record<string, Record<Language, string>> = {
  // Bank Names (Fictionalized)
  'bank_sbi': { en: 'Lumina Bank', hi: 'लुमिना बैंक', bn: 'লুমিনা ব্যাংক', mr: 'लुमिना बँक', ta: 'லுமினா வங்கி', te: 'లుమినా బ్యాంక్', kn: 'ಲುಮಿನಾ ಬ್ಯಾಂಕ್', gu: 'લ્યુમિના બેંક', ml: 'ലുമിന ബാങ്ക്', pa: 'ਲੁਮਿਨਾ ਬੈਂਕ', or: 'ଲୁମିନା ବ୍ୟାଙ୍କ' },
  'bank_hdfc': { en: 'Titanium Trust', hi: 'टाइटेनियम ट्रस्ट', bn: 'টাইটানিয়াম ট্রাস্ট', mr: 'टायटॅनियम ट्रस्ट', ta: 'டைட்டானியம் டிரஸ்ட்', te: 'టైటానియం ట్రస్ట్', kn: 'ಟೈಟಾನಿಯಂ ಟ್ರಸ್ಟ್', gu: 'ટાઇટેનિયમ ટ્રસ્ટ', ml: 'ടൈറ്റാനിയം ട്രസ്റ്റ്', pa: 'ਟਾਈਟੇਨੀਅਮ ਟਰੱਸਟ', or: 'ଟାଇଟାନିୟମ୍ ଟ୍ରଷ୍ଟ' },
  'bank_icici': { en: 'Orbit Finance', hi: 'ऑर्बिट फाइनेंस', bn: 'অরবিট ফাইন্যান্স', mr: 'ऑर्बिट फायनान्स', ta: 'ஆர்பிட் ஃபைனான்ஸ்', te: 'ఆర్బిట్ ఫైనాన్స్', kn: 'ಆರ್ಬಿಟ್ ಫೈನಾನ್ಸ್', gu: 'ઓર્બિટ ફાઇનાન્સ', ml: 'ഓർബിറ്റ് ഫിനാൻസ്', pa: 'ਔਰਬਿਟ ਫਾਇਨਾਂਸ', or: 'ଅର୍ବିଟ୍ ଫାଇନାନ୍ସ' },
  'bank_pnb': { en: 'Apex Bank', hi: 'एपेक्स बैंक', bn: 'অ্যাপেক্স ব্যাংক', mr: 'एपेक्स बँक', ta: 'அபெக்ஸ் வங்கி', te: 'అపెక్స్ బ్యాంక్', kn: 'ಅಪೆಕ್ಸ್ ಬ್ಯಾಂಕ್', gu: 'એપેક્સ બેંક', ml: 'അപെക്സ് ബാങ്ക്', pa: 'ਐਪੈਕਸ ਬੈਂਕ', or: 'ଆପେକ୍ସ ବ୍ୟାଙ୍କ' },
  'bank_kotak': { en: 'Zenith Global', hi: 'ज़ीनिथ ग्लोबल', bn: 'জেনিথ গ্লোবাল', mr: 'झिनिथ ग्लोबल', ta: 'ஜெனித் குளோபல்', te: 'జెనిత్ గ్లోబల్', kn: 'ಜೆನಿತ್ ಗ್ಲೋಬಲ್', gu: 'ઝેનિથ ગ્લોબલ', ml: 'സെനിത്ത് ഗ്ലോബൽ', pa: 'ਜ਼ੈਨੀਥ ਗਲੋਬਲ', or: 'ଜେନିଥ୍ ଗ୍ଲୋବାଲ' },
  'bank_indian': { en: 'Nova Bank', hi: 'नोवा बैंक', bn: 'নোভা ব্যাংক', mr: 'नोव्हा बँक', ta: 'நோவா வங்கி', te: 'నోవా బ్యాంక్', kn: 'ನೋವಾ ಬ್ಯಾಂಕ್', gu: 'નોવા બેંક', ml: 'നോവ ബാങ്ക്', pa: 'ਨੋਵਾ ਬੈਂਕ', or: 'ନୋଭା ବ୍ୟାଙ୍କ' },

  // Consent Titles
  'cons_fraud': { en: 'Allow Fraud Detection', hi: 'धोखाधड़ी का पता लगाने की अनुमति दें', bn: 'প্রতারণা সনাক্তকরণের অনুমতি দিন', mr: 'फसवणूक शोधण्यास अनुमती द्या', ta: 'மோசடி கண்டறிதலை அனுமதிக்கவும்', te: 'మోసం గుర్తింపును అనుమతించండి', kn: 'ವಂಚನೆ ಪತ್ತೆಗೆ ಅನುಮತಿಸಿ', gu: 'છેતરપિંડી શોધવાની મંજૂરી આપો', ml: 'തട്ടിപ്പ് കണ്ടെത്തൽ അനുവദിക്കുക', pa: 'ਧੋਖਾਧੜੀ ਦਾ ਪਤਾ ਲਗਾਉਣ ਦੀ ਆਗਿਆ ਦਿਓ', or: 'ଠକେଇ ଚିହ୍ନଟ ପାଇଁ ଅନୁମତି ଦିଅନ୍ତୁ' },
  'cons_market': { en: 'Allow Marketing Calls', hi: 'मार्केटिंग कॉल की अनुमति दें', bn: 'মার্কেটিং কলের অনুমতি দিন', mr: 'मार्केटिंग कॉलला अनुमती द्या', ta: 'சந்தைப்படுத்தல் அழைப்புகளை அனுமதிக்கவும்', te: 'మార్కెటింగ్ కాల్‌లను అనుమతించండి', kn: 'ಮಾರ್ಕೆಟಿಂಗ್ ಕರೆಗಳಿಗೆ ಅನುಮತಿಸಿ', gu: 'માર્કેટિંગ કોલ્સની મંજૂરી આપો', ml: 'മാർക്കറ്റിംഗ് കോളുകൾ അനുവദിക്കുക', pa: 'ਮਾਰਕੀਟਿੰਗ ਕਾਲਾਂ ਦੀ ਆਗਿਆ ਦਿਓ', or: 'ମାର୍କେଟିଂ କଲ୍ ପାଇଁ ଅନୁମତି ଦିଅନ୍ତୁ' },
  'cons_loc': { en: 'Share Location for Security', hi: 'सुरक्षा के लिए स्थान साझा करें', bn: 'সুরক্ষার জন্য অবস্থান শেয়ার করুন', mr: 'सुरक्षेसाठी स्थान सामायिक करा', ta: 'பாதுகாப்பிற்காக இருப்பிடத்தைப் பகிரவும்', te: 'భద్రత కోసం లొకేషన్‌ను షేర్ చేయండి', kn: 'ಸುರಕ್ಷತೆಗಾಗಿ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ', gu: 'સુરક્ષા માટે સ્થાન શેર કરો', ml: 'സുരക്ഷയ്ക്കായി ലൊക്കേഷൻ പങ്കിടുക', pa: 'ਸੁਰੱਖਿਆ ਲਈ ਸਥਾਨ ਸਾਂਝਾ ਕਰੋ', or: 'ସୁରକ୍ଷା ପାଇଁ ସ୍ଥାନ ସେୟାର କରନ୍ତୁ' },

  // Family Relations
  'rel_father': { en: 'Father', hi: 'पिता', bn: 'বাবা', mr: 'वडील', ta: 'அப்பா', te: 'తండ్రి', kn: 'ತಂದೆ', gu: 'પિતા', ml: 'അച്ഛൻ', pa: 'ਪਿਤਾ', or: 'ବାପା' },
  'rel_mother': { en: 'Mother', hi: 'माँ', bn: 'মা', mr: 'आई', ta: 'அம்மா', te: 'తల్లి', kn: 'ತಾಯಿ', gu: 'માતા', ml: 'അമ്മ', pa: 'ਮਾਂ', or: 'ମା' },
  'fam_dad': { en: 'Ramesh (Dad)', hi: 'रमेश (पापा)', bn: 'রমেশ (বাবা)', mr: 'रमेश (बाबा)', ta: 'ரமேஷ் (அப்பா)', te: 'రమేష్ (నాన్న)', kn: 'ರಮೇಶ್ (ಅಪ್ಪ)', gu: 'રમેશ (પપ્પા)', ml: 'രമേഷ് (അച്ഛൻ)', pa: 'ਰਮੇਸ਼ (ਡੈਡੀ)', or: 'ରମେଶ (ବାପା)' },
  'fam_mom': { en: 'Sunita (Mom)', hi: 'सुनीता (माँ)', bn: 'সুনিতা (মা)', mr: 'सुनिता (आई)', ta: 'சுனிதா (அம்மா)', te: 'సునీత (అమ్మ)', kn: 'ಸುನಿತಾ (ಅಮ್ಮ)', gu: 'સુનિતા (મમ્મી)', ml: 'സുനിത (അമ്മ)', pa: 'ਸੁਨੀਤਾ (ਮੰਮੀ)', or: 'ସୁନିତା (ਮਾ)' },

  // Persona Roles
  'role_biz': { en: 'Small Business Owner', hi: 'लघु व्यवसाय स्वामी', bn: 'ক্ষুদ্র ব্যবসার মালিক', mr: 'लघु उद्योग मालक', ta: 'சிறு தொழில் உரிமையாளர்', te: 'చిన్న వ్యాపార యజమాని', kn: 'ಸಣ್ಣ ವ್ಯಾಪಾರ ಮಾಲೀಕರು', gu: 'નાના વ્યવસાયના માલિક', ml: 'ചെറുകിട ബിസിനസ്സ് ഉടമ', pa: 'ਛੋਟੇ ਕਾਰੋਬਾਰੀ ਮਾਲਕ', or: 'କ୍ଷୁଦ୍ର ବ୍ୟବସାୟୀ' },
  'role_gig': { en: 'Gig Economy Worker', hi: 'गिग इकॉनमी वर्कर', bn: 'গিগ ইকোনমি কর্মী', mr: 'गिग इकॉनॉमी कामगार', ta: 'கிக் பொருளாதார பணியாளர்', te: 'గిగ్ ఎకానమీ వర్కర్', kn: 'ಗಿಗ್ ಎಕಾನಮಿ ಕೆಲಸಗಾರ', gu: 'ગીગ ઈકોનોમી વર્કર', ml: 'ഗിഗ് എക്കണോമി വർക്കർ', pa: 'ਗਿਗ ਆਰਥਿਕਤਾ ਵਰਕਰ', or: 'ଗିଗ୍ ଇକୋନୋମି କର୍ମଚାରୀ' },

  // Scam Titles
  'scam_kyc': { en: 'The "KYC Expired" SMS', hi: '"KYC समाप्त" वाला SMS', bn: '"KYC মেয়াদোত্তীর্ণ" এসএমএস', mr: '"KYC कालबाह्य" SMS', ta: '"KYC முடிந்தது" SMS', te: '"KYC గడువు ముగిసింది" SMS', kn: '"KYC ಅವಧಿ ಮುಗಿದಿದೆ" SMS', gu: '"KYC સમાપ્ત" SMS', ml: '"KYC കാലഹരണപ്പെട്ടു" SMS', pa: '"KYC ਦੀ ਮਿਆਦ ਪੁੱਗ ਗਈ" SMS', or: '"KYC ସମାପ୍ତ" SMS' },
  'scam_lott': { en: 'Fake Lottery WhatsApp', hi: 'फर्जी लॉटरी व्हाट्सएप', bn: 'নকল লটারি হোয়াটসঅ্যাপ', mr: 'बनावट लॉटरी व्हॉट्सअ‍ॅप', ta: 'போலி லாட்டரி வாட்ஸ்அப்', te: 'నకిలీ లాటరీ వాట్సాప్', kn: 'ನಕಲಿ ಲಾಟರಿ ವಾಟ್ಸಾಪ್', gu: 'નકલી લોટરી વોટ્સએપ', ml: 'വ്യാജ ലോട്ടറി വാട്ട്‌സ്ആപ്പ്', pa: 'ਫਰਜ਼ੀ ਲਾਟਰੀ ਵਟਸਐਪ', or: 'ନକଲି ଲଟେରୀ ହ୍ୱାଟ୍ସଆପ୍' },
  'scam_screen': { en: 'Screen Share Fraud', hi: 'स्क्रीन शेयर फ्रॉड', bn: 'স্ক্রিন শেয়ার জালিয়াতি', mr: 'स्क्रीन शेअर फसवणूक', ta: 'திரை பகிர்வு மோசடி', te: 'స్క్రీన్ షేర్ మోసం', kn: 'ಸ್ಕ್ರೀನ್ ಹಂಚಿಕೆ ವಂಚನೆ', gu: 'સ્ક્રીન શેર છેતરપિંડી', ml: 'സ്ക്രീൻ ഷെയർ തട്ടിപ്പ്', pa: 'ਸਕ੍ਰੀਨ ਸ਼ੇਅਰ ਧੋਖਾਧੜੀ', or: 'ସ୍କ୍ରିନ୍ ସେୟାର୍ ଠକେଇ' },

  // Transaction Descriptions
  'txn_elec': { 
    en: 'Online Purchase - ElectroWorld', 
    hi: 'ऑनलाइन खरीद - इलेक्ट्रोवर्ल्ड', 
    bn: 'অনলাইন ক্রয় - ইলেক্ট্রোওয়ার্ল্ড', 
    mr: 'ऑनलाइन खरेदी - इलेक्ट्रोवर्ल्ड', 
    ta: 'ஆன்லைன் கொள்முதல் - எலக்ட்ரோவேர்ல்ட்',
    te: 'ఆన్‌లైన్ కొనుగోలు - ఎలక్ట్రోవరల్డ్',
    kn: 'ಆನ್‌ಲೈನ್ ಖರೀದಿ - ಎಲೆಕ್ಟ್ರೋವರ್ಲ್ಡ್',
    gu: 'ઓનલાઇન ખરીદી - ઇલેક્ટ્રોવર્લ્ડ',
    ml: 'ഓൺലൈൻ വാങ്ങൽ - ഇലക്ട്രോവേൾഡ്',
    pa: 'ਆਨਲਾਈਨ ਖਰੀਦ - ਇਲੈਕਟ੍ਰੋਵਰਲਡ',
    or: 'ଅନଲାଇନ୍ କ୍ରୟ - ଇଲେକ୍ଟ୍ରୋ ୱାର୍ଲ୍ଡ'
  },
  'txn_ldn': { 
    en: 'Overseas Debit - London Cafe', 
    hi: 'विदेशी डेबिट - लंदन कैफे', 
    bn: 'বিদেশী ডেবিট - লন্ডন ক্যাফে', 
    mr: 'परदेशी डेबिट - लंडन कॅफे', 
    ta: 'வெளிநாட்டு பற்று - லண்டன் கஃபே',
    te: 'విదేశీ డెబిట్ - లండన్ కేఫ్',
    kn: 'ವಿದೇಶಿ ಡೆಬಿಟ್ - ಲಂಡನ್ ಕೆಫೆ',
    gu: 'વિદેશી ડેબિટ - લંડન કાફે',
    ml: 'വിദേശ ഡെബിറ്റ് - ലണ്ടൻ കഫേ',
    pa: 'ਵਿਦੇਸ਼ੀ ਡੈਬਿਟ - ਲੰਡਨ ਕੈਫੇ',
    or: 'ବିଦେଶୀ ଡେବିଟ୍ - ଲଣ୍ଡନ କାଫେ'
  },
  'txn_bulk': { 
    en: 'Bulk Transfer - Unknown Account', 
    hi: 'थोक हस्तांतरण - अज्ञात खाता', 
    bn: 'বাল্ক ট্রান্সফার - অজানা অ্যাকাউন্ট', 
    mr: 'बल्क ट्रान्सफर - अज्ञात खाते', 
    ta: 'மொத்த பரிமாற்றம் - அறியப்படாத கணக்கு',
    te: 'భారీ బదిలీ - తెలియని ఖాతా',
    kn: 'ಬೃಹತ್ ವರ್ಗಾವಣೆ - ಅಪರಿಚಿತ ಖಾತೆ',
    gu: 'જથ્થાબંધ ટ્રાન્સફર - અજ્ઞાત ખાતું',
    ml: 'ബൾക്ക് ട്രാൻസ്ഫർ - അജ്ഞാത അക്കൗണ്ട്',
    pa: 'ਬਲਕ ਟ੍ਰਾਂਸਫਰ - ਅਣਜਾਣ ਖਾਤਾ',
    or: 'ବଲ୍କ ଟ୍ରାନ୍ସଫର - ଅଜ୍ଞାତ ଆକାଉଣ୍ଟ'
  },

  // Transaction Reasons
  'rsn_elec': { 
    en: 'Pattern matches user history. Device fingerprint verified.', 
    hi: 'पैटर्न उपयोगकर्ता इतिहास से मेल खाता है। डिवाइस फिंगरप्रिंट सत्यापित।', 
    bn: 'প্যাটার্ন ব্যবহারকারীর ইতিহাসের সাথে মেলে।', 
    mr: 'पॅटर्न वापरकर्त्याच्या इतिहासाशी जुळतो.', 
    ta: 'பயனர் வரலாற்றோடு பொருந்துகிறது.',
    te: 'వినియోగదారు చరిత్రతో సరిపోలుతుంది.',
    kn: 'ಬಳಕೆದಾರರ ಇತಿಹಾಸಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.',
    gu: 'પેટર્ન વપરાશકર્તા ઇતિહાસ સાથે મેળ ખાય છે.',
    ml: 'ഉപയോക്തൃ ചരിത്രവുമായി പൊരുത്തപ്പെടുന്നു.',
    pa: 'ਪੈਟਰਨ ਯੂਜ਼ਰ ਇਤਿਹਾਸ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ.',
    or: 'ପ୍ୟାଟର୍ନ ବ୍ୟବହାରକାରୀ ଇତିହାସ ସହିତ ମେଳ ଖାଉଛି।'
  },
  'rsn_ldn': { 
    en: 'Geolocational anomaly. User location matches Mumbai, transaction origin London.', 
    hi: 'भौगोलिक विसंगति। उपयोगकर्ता का स्थान मुंबई है, लेनदेन लंदन से।', 
    bn: 'ভৌগলিক অসঙ্গতি।', 
    mr: 'भौगोलिक विसंगती.', 
    ta: 'புவியியல் முரண்பாடு.',
    te: 'భౌగోళిక ವೈరుధ్యం.',
    kn: 'ಭೌಗೋಳಿಕ ವೈಪರೀತ್ಯ.',
    gu: 'ભૌગોલિક વિસંગતતા.',
    ml: 'ജിയോലൊക്കേഷണൽ അപാകത.',
    pa: 'ਭੂਗੋਲਿਕ ਵਿਗਾੜ.',
    or: 'ଭୌଗୋଳିକ ଅସଙ୍ଗତି।'
  },
  'rsn_bulk': { 
    en: 'High value transfer to new beneficiary. Requires secondary biometric approval.', 
    hi: 'नए लाभार्थी को उच्च मूल्य हस्तांतरण। बायोमेट्रिक अनुमोदन आवश्यक।', 
    bn: 'উচ্চ মূল্যের স্থানান্তর।', 
    mr: 'उच्च मूल्य हस्तांतरण.', 
    ta: 'அதிக மதிப்பு பரிமாற்றம்.',
    te: 'అధిక విలువ బదిలీ.',
    kn: 'ಹೆಚ್ಚಿನ ಮೌಲ್ಯದ ವರ್ಗಾವಣೆ.',
    gu: 'ઉચ્ચ મૂલ્ય ટ્રાન્સફર.',
    ml: 'ഉയർന്ന മൂല്യമുള്ള കൈമാറ്റം.',
    pa: 'ਉੱਚ ਮੁੱਲ ਟ੍ਰਾਂਸਫਰ.',
    or: 'ଉଚ୍ଚ ମୂଲ୍ୟ ସ୍ଥାନାନ୍ତର।'
  },

  // Ethics Roles
  'role_ethicist': { 
    en: 'Chief AI Ethicist', 
    hi: 'मुख्य AI नीतिशास्त्री', 
    bn: 'প্রধান এআই নীতিবিদ', 
    mr: 'मुख्य एआय नीतिशास्त्रज्ञ', 
    ta: 'தலைமை AI நெறிமுறையாளர்',
    te: 'ప్రధాన AI ఎథిసిస్ట్',
    kn: 'ಮುಖ್ಯ AI ನೈತಿಕತಾವಾದಿ',
    gu: 'મુખ્ય AI નૈતિકવાદી',
    ml: 'ചീഫ് AI എത്തിിസിസ്റ്റ്',
    pa: 'ਮੁੱਖ AI ਨੈਤਿਕਵਾਦੀ',
    or: 'ମୁଖ୍ୟ AI ନୀତିଶାସ୍ତ୍ରଜ୍ଞ'
  },
  'role_advocate': { 
    en: 'Consumer Rights Advocate', 
    hi: 'उपभोक्ता अधिकार अधिवक्ता', 
    bn: 'ভোক্তা অধিকার অ্যাডভোকেট', 
    mr: 'ग्राहक हक्क वकील', 
    ta: 'நுகர்வோர் உரிமை வழக்கறிஞர்',
    te: 'వినియోగదారు హక్కుల న్యాయవాది',
    kn: 'ಗ್ರಾಹಕ ಹಕ್ಕುಗಳ ವಕೀಲ',
    gu: 'ગ્રાહક અધિકાર વકીલ',
    ml: 'ഉപഭോക്തൃ അവകാശ അഭിഭാഷകൻ',
    pa: 'ਖਪਤਕਾਰ ਅਧਿਕਾਰ ਵਕੀਲ',
    or: 'ଉପଭୋକ୍ତା ଅଧିକାର ଓକିଲ'
  },
  'role_privacy': { 
    en: 'Data Privacy Lead', 
    hi: 'डेटा गोपनीयता प्रमुख', 
    bn: 'ডেটা গোপনীয়তা লিড', 
    mr: 'डेटा गोपनीयता प्रमुख', 
    ta: 'தரவு தனியுரிமை தலைவர்',
    te: 'డేటా గోప్యత లీడ్',
    kn: 'ಡೇಟಾ ಗೌಪ್ಯತೆ ಮುಖ್ಯಸ್ಥ',
    gu: 'ડેટા ગોપનીયતા લીડ',
    ml: 'ഡാറ്റ പ്രൈവസി ലീഡ്',
    pa: 'ਡਾਟਾ ਪਰਦੇਦਾਰੀ ਲੀਡ',
    or: 'ଡାଟା ଗୋପନୀୟତା ମୁଖ୍ୟ'
  },

  // Blog Titles
  'blog1_title': { 
    en: 'Why we adjusted our credit scoring model', 
    hi: 'हमने अपना क्रेडिट स्कोरिंग मॉडल क्यों बदला', 
    bn: 'কেন আমরা আমাদের ক্রেডিট স্কোরিং মডেল সামঞ্জস্য করেছি', 
    mr: 'आम्ही आमचे क्रेडिट स्कोअरिंग मॉडेल का बदलले', 
    ta: 'எங்கள் கடன் மதிப்பீட்டு மாதிரியை ஏன் மாற்றினோம்',
    te: 'మేము మా క్రెడిట్ స్కోరింగ్ మోడల్‌ను ఎందుకు మార్చాము',
    kn: 'ನಮ್ಮ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರಿಂಗ್ ಮಾದರಿಯನ್ನು ನಾವು ಏಕೆ ಸರಿಹೊಂದಿಸಿದ್ದೇವೆ',
    gu: 'અમે અમારું ક્રેડિટ સ્કોરિંગ મોડેલ કેમ બદલ્યું',
    ml: 'ഞങ്ങളുടെ ക്രെഡിറ്റ് സ്കോറിംഗ് മോഡൽ ഞങ്ങൾ മാറ്റിയത് എന്തുകൊണ്ട്',
    pa: 'ਅਸੀਂ ਆਪਣਾ ਕ੍ਰੈਡਿਟ ਸਕੋਰਿੰਗ ਮਾਡਲ ਕਿਉਂ ਬਦਲਿਆ',
    or: 'ଆମେ କାହିଁକି ଆମର କ୍ରେଡିଟ୍ ସ୍କୋରିଂ ମଡେଲ୍ ବଦଳାଇଲୁ'
  },
  'blog1_desc': { 
    en: 'Traditional models penalize irregular income. We voted to weigh "Consistent Utility Payments" higher.', 
    hi: 'पारंपरिक मॉडल अनियमित आय को दंडित करते हैं। हमने उपयोगिता बिलों को अधिक महत्व दिया।', 
    bn: 'ঐতিহ্যগত মডেল অনিয়মিত আয়কে শাস্তি দেয়।', 
    mr: 'पारंपारिक मॉडेल अनियमित उत्पन्नाला शिक्षा देतात.', 
    ta: 'பாரம்பரிய மாதிரிகள் ஒழுங்கற்ற வருமானத்தை தண்டிக்கும்.',
    te: 'సాంప్రదాయ నమూనాలు క్రమరహిత ఆదాయాన్ని శిక్షిస్తాయి.',
    kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಮಾದರಿಗಳು ಅನಿಯಮಿತ ಆದಾಯವನ್ನು ಶಿಕ್ಷಿಸುತ್ತವೆ.',
    gu: 'પરંપરાગત મોડેલો અનિયમિત આવકને દંડ કરે છે.',
    ml: 'പരമ്പരാഗത മോഡലുകൾ ക്രമരഹിതമായ വരുമാനത്തെ ശിക്ഷിക്കുന്നു.',
    pa: 'ਰਵਾਇਤੀ ਮਾਡਲ ਅਨਿਯਮਿਤ ਆਮਦਨੀ ਨੂੰ ਸਜ਼ਾ ਦਿੰਦੇ ਹਨ.',
    or: 'ପାରମ୍ପାରିକ ମଡେଲଗୁଡିକ ଅନିୟମିତ ଆୟକୁ ଦଣ୍ଡିତ କରନ୍ତି |'
  },
  'blog2_title': { 
    en: 'Handling the "Deepfake Voice" Attack Vector', 
    hi: '"डीपफेक वॉयस" हमले को संभालना', 
    bn: '"ডিপফেক ভয়েস" আক্রমণ পরিচালনা করা', 
    mr: '"डीपफेक व्हॉइस" हाताळणे', 
    ta: '"டீப்ஃபேக் குரல்" தாக்குதலை கையாளுதல்',
    te: '"డీప్‌ఫేక్ వాయిస్" దాడిని నిర్వహించడం',
    kn: '"ಡೀಪ್‌ಫೇಕ್ ವಾಯ್ಸ್" ದಾಳಿಯನ್ನು ನಿರ್ವಹಿಸುವುದು',
    gu: '"ડીપફેક વોઈસ" હુમલાને હેન્ડલ કરવું',
    ml: '"ഡീപ്ഫേക്ക് വോയ്സ്" ആക്രമണം കൈകാര്യം ചെയ്യുന്നു',
    pa: '"ਡੀਪਫੇਕ ਵਾਇਸ" ਹਮਲੇ ਨੂੰ ਸੰਭਾਲਣਾ',
    or: '"ଡିପ୍ ଫେକ୍ ଭଏସ୍" ଆକ୍ରମଣକୁ ପରିଚାଳନା କରିବା'
  },
  'blog2_desc': { 
    en: 'We updated biometric thresholds without increasing friction for elderly users.', 
    hi: 'हमने बुजुर्ग उपयोगकर्ताओं के लिए घर्षण बढ़ाए बिना बायोमेट्रिक सीमाएं अपडेट कीं।', 
    bn: 'আমরা বায়োমেট্রিক থ্রেশহোল্ড আপডেট করেছি।', 
    mr: 'आम्ही बायोमेट्रिक थ्रेशहोल्ड अपडेट केले.', 
    ta: 'நாங்கள் பயோமெட்ரிக் வரம்புகளைப் புதுப்பித்துள்ளோம்.',
    te: 'మేము బయోమెట్రిక్ థ్రెషోల్డ్‌లను నవీకరించాము.',
    kn: 'ನಾವು ಬಯೋಮೆಟ್ರಿಕ್ ಮಿತಿಗಳನ್ನು ನವೀಕರಿಸಿದ್ದೇವೆ.',
    gu: 'અમે બાયોમેટ્રિક થ્રેશોલ્ડ અપડેટ કર્યા છે.',
    ml: 'ഞങ്ങൾ ബയോമെട്രിക് പരിധികൾ അപ്‌ഡേറ്റുചെയ്‌തു.',
    pa: 'ਅਸੀਂ ਬਾਇਓਮੈਟ੍ਰਿਕ ਥ੍ਰੈਸ਼ਹੋਲਡ ਅੱਪਡੇਟ ਕੀਤੇ ਹਨ.',
    or: 'ଆମେ ବାୟୋମେଟ୍ରିକ୍ ସୀମା ଅପଡେଟ୍ କରିଛୁ |'
  },
};

// Helper to get string
const getStr = (key: string, lang: Language): string => {
  return DATA_STRINGS[key]?.[lang] || DATA_STRINGS[key]?.[Language.EN] || DATA_STRINGS[key]?.[Language.HI] || key; // Fallback chain
};

// --- DYNAMIC DATA FUNCTIONS ---

export const getBanks = (lang: Language): Bank[] => [
  {
    id: 'sbi',
    name: getStr('bank_sbi', lang),
    logo: 'LB',
    color: '#1a73e8',
    ussdCode: '*99*41#',
    mockBalance: 45200.50,
    activePlan: lang === Language.HI ? 'लुमिना प्लेटिनम' : 'Lumina Platinum',
    loans: [
      { id: 'l1', name: lang === Language.HI ? 'लुमिना होम लोन' : 'Lumina Home Loan', interestRate: 8.4, type: 'Home', minTenure: 120, description: lang === Language.HI ? 'महिला उधारकर्ताओं के लिए शून्य प्रसंस्करण शुल्क।' : 'Zero processing fee for women borrowers.' },
      { id: 'l2', name: lang === Language.HI ? 'लुमिना एक्सप्रेस' : 'Lumina Xpress', interestRate: 11.5, type: 'Personal', minTenure: 24, description: lang === Language.HI ? 'वेतनभोगी कर्मचारियों के लिए तत्काल स्वीकृति।' : 'Instant approval for salaried employees.' }
    ]
  },
  {
    id: 'hdfc',
    name: getStr('bank_hdfc', lang),
    logo: 'TT',
    color: '#004c8f',
    ussdCode: '*99*43#',
    mockBalance: 128000.00,
    activePlan: lang === Language.HI ? 'टाइटेनियम सैलरी प्लस' : 'Titanium Salary Plus',
    loans: [
      { id: 'l3', name: lang === Language.HI ? 'टाइटेनियम ड्राइव' : 'Titanium Drive', interestRate: 9.0, type: 'Auto', minTenure: 36, description: 'Fixed interest rates with minimal documentation.' },
      { id: 'l4', name: lang === Language.HI ? 'टाइटेनियम गोल्ड' : 'Titanium Gold', interestRate: 9.5, type: 'Gold', minTenure: 12, description: 'Loan against gold ornaments.' }
    ]
  },
  {
    id: 'icici',
    name: getStr('bank_icici', lang),
    logo: 'OF',
    color: '#f37e20',
    ussdCode: '*99*44#',
    mockBalance: 2350.75,
    activePlan: lang === Language.HI ? 'ऑर्बिट सिल्वर' : 'Orbit Silver',
    loans: [
      { id: 'l5', name: lang === Language.HI ? 'ऑर्बिट आवास' : 'Orbit Awas', interestRate: 8.75, type: 'Home', minTenure: 180, description: 'Affordable housing focus.' },
      { id: 'l6', name: lang === Language.HI ? 'ऑर्बिट पर्सनल' : 'Orbit Personal', interestRate: 10.8, type: 'Personal', minTenure: 12, description: 'Flexible tenure options up to 6 years.' }
    ]
  },
  {
    id: 'pnb',
    name: getStr('bank_pnb', lang),
    logo: 'AB',
    color: '#a20a3a',
    ussdCode: '*99*42#',
    mockBalance: 8900.00,
    activePlan: lang === Language.HI ? 'एपेक्स बचत' : 'Apex Savings',
    loans: [
      { id: 'l7', name: lang === Language.HI ? 'एपेक्स प्राइड' : 'Apex Pride', interestRate: 8.9, type: 'Personal', minTenure: 12, description: 'Special rates for government employees.' },
      { id: 'l8', name: lang === Language.HI ? 'एपेक्स हाउसिंग' : 'Apex Housing', interestRate: 8.5, type: 'Home', minTenure: 120, description: 'Linked to RLLR.' }
    ]
  },
  {
    id: 'kotak',
    name: getStr('bank_kotak', lang),
    logo: 'ZG',
    color: '#ed1c24',
    ussdCode: '*99*68#',
    mockBalance: 210500.00,
    activePlan: 'Zenith 811 Edge',
    loans: [
      { id: 'l9', name: lang === Language.HI ? 'ज़ीनिथ स्मार्ट होम' : 'Zenith Smart Home', interestRate: 8.8, type: 'Home', minTenure: 120, description: 'Digital sanction in 30 minutes.' }
    ]
  },
  {
    id: 'indian',
    name: getStr('bank_indian', lang),
    logo: 'NB',
    color: '#103664',
    ussdCode: '*99*58#',
    mockBalance: 5600.25,
    activePlan: lang === Language.HI ? 'नोवा स्मार्ट किड' : 'Nova Smart Kid',
    loans: [
      { id: 'l10', name: lang === Language.HI ? 'नोवा होम' : 'Nova Home', interestRate: 8.6, type: 'Home', minTenure: 120, description: 'Low processing charges.' }
    ]
  }
];

export const getFamilyMembers = (lang: Language): FamilyMember[] => [
  { id: 'fm1', name: getStr('fam_dad', lang), relation: getStr('rel_father', lang), safetyStatus: 'safe', lastActivity: '2h ago', alerts: 0 },
  { id: 'fm2', name: getStr('fam_mom', lang), relation: getStr('rel_mother', lang), safetyStatus: 'risk', lastActivity: '10m ago', alerts: 1 },
];

export const getConsent = (lang: Language): ConsentItem[] => [
  { id: 'c1', title: getStr('cons_fraud', lang), description: 'AI analyzes spending to stop identity theft.', isGranted: true, lastUpdated: '2023-08-15', category: 'security' },
  { id: 'c2', title: getStr('cons_market', lang), description: 'Banks can contact you for new offers.', isGranted: false, lastUpdated: '2023-09-01', category: 'marketing' },
  { id: 'c3', title: getStr('cons_loc', lang), description: 'Use GPS to verify you are near the transaction.', isGranted: true, lastUpdated: '2023-01-10', category: 'security' }
];

export const getPersonas = (lang: Language): Persona[] => [
  {
    id: 'p1',
    name: 'Riya',
    role: getStr('role_biz', lang),
    avatar: '👩🏽‍💼',
    trustScore: 720,
    incomeStability: 'High',
    spendingRisk: 'Medium',
    aiNote: lang === Language.HI ? 'हम देख रहे हैं कि आप इन्वेंट्री का विस्तार कर रहे हैं, जिससे आपका नकदी प्रवाह अस्थायी रूप से कम हो गया है। इसे दंडित नहीं किया गया है।' : 'We see you are expanding inventory, which temporarily lowered your cash flow. This is not penalized.',
    factors: [
      { subject: 'Cash Flow', A: 60, fullMark: 100 },
      { subject: 'Vendor Payments', A: 90, fullMark: 100 },
      { subject: 'Savings', A: 40, fullMark: 100 },
      { subject: 'Loan History', A: 85, fullMark: 100 },
      { subject: 'Digi-Transactions', A: 95, fullMark: 100 },
    ]
  },
  {
    id: 'p2',
    name: 'Arjun',
    role: getStr('role_gig', lang),
    avatar: '👨🏽‍💻',
    trustScore: 680,
    incomeStability: 'Medium',
    spendingRisk: 'Low',
    aiNote: lang === Language.HI ? 'अनियमित आय का पता चला, लेकिन लगातार बिजली बिल भुगतान ने आपके स्कोर को बढ़ा दिया है।' : 'Irregular income detected, but consistent utility bill payments have boosted your score.',
    factors: [
      { subject: 'Income Regularity', A: 50, fullMark: 100 },
      { subject: 'Bill Payments', A: 95, fullMark: 100 },
      { subject: 'Savings', A: 60, fullMark: 100 },
      { subject: 'Micro-Loans', A: 80, fullMark: 100 },
      { subject: 'Platform Ratings', A: 90, fullMark: 100 },
    ]
  }
];

export const getScams = (lang: Language): ScamAlert[] => [
  { id: 'sc1', title: getStr('scam_kyc', lang), description: 'Scammers send a link saying your account is blocked. Official banks NEVER send links for KYC.', severity: 'High', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 'sc2', title: getStr('scam_lott', lang), description: 'A message from "KBC" asking for processing fees. This is always a scam.', severity: 'Medium', image: 'https://images.unsplash.com/photo-1514473776127-61e2dc1dded3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 'sc3', title: getStr('scam_screen', lang), description: 'Fraudsters ask you to download "AnyDesk" to fix an issue. They then steal your OTPs.', severity: 'High', image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
];

export const getSubscriptions = (lang: Language): Subscription[] => [
  { id: 's1', serviceName: 'Netflix', amount: 649, frequency: 'Monthly', nextDueDate: '2023-11-05', isTrial: false, logo: 'N' },
  { id: 's2', serviceName: 'Spotify', amount: 119, frequency: 'Monthly', nextDueDate: '2023-11-12', isTrial: true, logo: 'S' },
  { id: 's3', serviceName: 'Adobe Cloud', amount: 1999, frequency: 'Monthly', nextDueDate: '2023-11-28', isTrial: false, logo: 'A' },
];

export const getTransactions = (lang: Language): Transaction[] => [
  {
    id: 'TXN-9928-XJ',
    date: '2023-10-24',
    description: getStr('txn_elec', lang),
    amount: -12999,
    status: 'approved',
    aiReason: getStr('rsn_elec', lang),
    garudaView: 'This purchase fits your usual buying habits for electronics. Device used: iPhone 14 (Verified).',
    category: 'Electronics',
    merchant: 'ElectroWorld'
  },
  {
    id: 'TXN-3321-AF',
    date: '2023-10-23',
    description: getStr('txn_ldn', lang),
    amount: -5000,
    status: 'blocked',
    aiReason: getStr('rsn_ldn', lang),
    garudaView: 'We blocked this because it was attempted at 3 AM from a device we don\'t recognize in a different country (UK), while your phone is in Mumbai.',
    category: 'Dining',
    merchant: 'London Cafe'
  },
  {
    id: 'TXN-1102-BB',
    date: '2023-10-22',
    description: getStr('txn_bulk', lang),
    amount: -50000,
    status: 'flagged',
    aiReason: getStr('rsn_bulk', lang),
    garudaView: 'This is a large amount to a person you have never paid before. We paused it just to double-check it\'s really you.',
    category: 'Transfer',
    merchant: 'P2P'
  }
];

export const getEthicsCommittee = (lang: Language): CommitteeMember[] => [
  {
    name: 'Dr. Anjali Menon',
    role: getStr('role_ethicist', lang),
    bio: 'Former RBI consultant on digital lending fairness. Reviews all high-impact algorithm changes.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Rajesh Kumar',
    role: getStr('role_advocate', lang),
    bio: 'Ensures that "Computer says no" is never the final answer. Manages the dispute resolution board.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Sarah Jenkins',
    role: getStr('role_privacy', lang),
    bio: 'Expert in Differential Privacy. Ensures your raw data is never seen by human eyes, only the patterns.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }
];

export const getEthicsPosts = (lang: Language): BlogPost[] => [
  {
      id: 'b1', date: 'Oct 24, 2023', category: 'Decision Log',
      title: getStr('blog1_title', lang),
      excerpt: getStr('blog1_desc', lang)
  },
  {
      id: 'b2', date: 'Sep 12, 2023', category: 'Transparency Report',
      title: getStr('blog2_title', lang),
      excerpt: getStr('blog2_desc', lang)
  }
];

export const ERROR_CODES: ErrorCode[] = [
  { code: '503', technical: 'Service Unavailable', human: "The bank's server is taking a nap. Your money hasn't left your account.", action: "Please wait 10 minutes and try again." },
  { code: '401', technical: 'Unauthorized', human: "We couldn't verify your identity with the PIN provided.", action: "Try entering your PIN again carefully." },
  { code: '402', technical: 'Payment Required', human: "Insufficient funds for this transaction.", action: "Check your balance and try a smaller amount." },
  { code: '408', technical: 'Request Timeout', human: "The connection was too slow.", action: "Move to a place with better signal and retry." },
];

export const SEARCH_INTENTS: SearchIntent[] = [
  { keywords: ['lost', 'stolen', 'block', 'card'], actionLabel: 'Block Lost Card', targetTab: Tab.LEDGER },
  { keywords: ['book', 'cheque', 'leaf'], actionLabel: 'Request Chequebook', targetTab: Tab.BANKS },
  { keywords: ['statement', 'pdf', 'history'], actionLabel: 'Download Statement', targetTab: Tab.LEDGER },
  { keywords: ['password', 'pin', 'reset', 'change'], actionLabel: 'Reset PIN', targetTab: Tab.PROFILE },
  { keywords: ['loan', 'money', 'credit'], actionLabel: 'View Loan Offers', targetTab: Tab.BANKS },
  { keywords: ['fraud', 'scam', 'report'], actionLabel: 'Report Fraud', targetTab: Tab.LEDGER },
  { keywords: ['balance', 'account'], actionLabel: 'Check Balance', targetTab: Tab.BANKS },
];

const DEFAULT_EN_TRANSLATIONS = {
  nav: { home: 'Home', ledger: 'Ledger', consent: 'Privacy', profile: 'Profile', banks: 'My Bank', guide: 'Guide', transact: 'Transfer', family: 'Family Safety', b2b: 'Enterprise', impact: 'Impact', ethics: 'Ethics' },
  hero: {
    title: 'The Fortress of Trust.',
    subtitle: 'Banking where the AI explains itself, and you hold the keys.',
    cta: 'View My Trust Score',
    verifierTitle: 'Is this real? Check Instantly',
    verifierPlaceholder: 'Paste SMS text, Email subject, or Phone number here...',
    verifyBtn: 'Verify',
    scamTitle: 'Visual Scam Gallery',
    savedTitle: 'Saved by Garuda',
    scanQR: 'Scan QR',
    panicBtn: 'Simulate Emergency'
  },
  ledger: {
    title: 'Glass Box Ledger',
    desc: 'Your transparent transaction history.',
    explainBtn: 'Why did this happen?',
    loading: 'Consulting AI Ethics Engine...',
    verified: 'Verified by Garuda-Shield',
    fraud: 'Fraud Prevention Active',
    addBtn: 'Make Transaction',
    addTitle: 'New Transaction',
    addDesc: 'Initiate a secure transfer. Our AI checks for fraud in real-time.',
    processing: 'AI Analyzing Risk...',
    inputMerchant: 'Beneficiary / Merchant',
    inputAmount: 'Amount (INR)',
    inputCategory: 'Type',
    clearAll: 'Clear History',
    safetyHeader: 'How to be safe:',
    appHeader: 'Recommended App:',
    offlineMode: 'Internet Issue? Use Offline Mode',
    offlineDesc: 'Dial the USSD code below from your registered mobile number to complete this transaction without internet.',
    dial: 'Dial',
    translatorTitle: 'Transaction Translator',
    translatorDesc: 'Paste error codes here to understand what went wrong.',
    translatorPlaceholder: 'e.g. Error 503, 401...',
    translateBtn: 'Translate Error',
    watchdogTitle: 'Auto-Pay Watchdog',
    watchdogDesc: 'Cancel hidden subscriptions to stop bleeding money.',
    safeToSpend: 'Safe-to-Spend',
    coolingOff: 'Cooling Off...',
    undoBtn: 'UNDO Transfer',
    status_approved: 'Approved',
    status_blocked: 'Blocked',
    status_flagged: 'Flagged',
    status_pending: 'Pending'
  },
  consent: {
    title: 'Privacy & Control',
    desc: 'Manage your data permissions like your phone settings.',
    revoked: 'OFF',
    granted: 'ON'
  },
  profile: {
    title: 'Explain My Profile',
    desc: 'Visualize how our AI sees your financial health. Correct us if we are wrong.',
    score: 'Trust Score',
    aiNote: 'AI Analyst Note',
    correctionTitle: 'See something wrong?',
    correctionDesc: 'If the AI has misinterpreted a transaction (e.g., a medical emergency flagged as "High Risk Spending"), you can submit a correction.',
    correctionBtn: 'Correct This',
    submitted: 'Correction Submitted',
    underReview: 'Our Human Ethics Committee will review this within 24 hours.',
    submit: 'Submit',
    cancel: 'Cancel',
    placeholder: 'e.g. That large withdrawal was for a medical emergency...'
  },
  banks: {
    title: 'Financial Growth Advisor',
    desc: 'Select a bank to see ethical loan options. Our AI analyzes if a plan builds wealth or creates debt.',
    analyzeBtn: 'Analyze Profit/Loss',
    myAccount: 'My Account Dashboard',
    linkAccount: 'Link Your Account',
    linkDesc: 'Link your account to see live balance and tailored advice.',
    balance: 'Available Balance',
    activePlan: 'Active Plan',
    historyBtn: 'View Full History',
    fillDetails: 'Enter Bank Details',
    cancel: 'Cancel',
    save: 'Link Account',
    skip: 'Skip for Now'
  },
  guide: {
    title: 'User Guide',
    desc: 'Learn how to navigate Garuda-Shield to protect your financial identity.'
  },
  b2b: {
    title: 'The Technical Fortress',
    subtitle: 'Enterprise-grade architecture for CTOs and Compliance Officers. Built on Differential Privacy and RBI-aligned security frameworks.',
    ocrTitle: 'Differential Privacy & Smart OCR',
    ocrDesc: 'Our proprietary OCR engine processes documents on the edge. Personal Identifiers (Names, Aadhaar #) are blurred instantly. Only financial metadata is transmitted.',
    testingTitle: 'Adversarial Testing Lab',
    testingDesc: 'We run 24/7 simulated attacks against our own models using "Red Team" AI to identify bias or security vulnerabilities before they affect customers.',
    regTitle: 'Regulatory Compliance Map',
    mandate: 'Mandate',
    implementation: 'Garuda-Shield Implementation',
    status: 'Status',
    researchTitle: 'Research & Whitepapers',
    whitepaper1: 'The Economics of Trust',
    whitepaper2: 'Algorithmic Fairness in Rural Lending'
  },
  impact: {
    title: 'Impact Dashboard',
    subtitle: 'Moving beyond abstract promises to concrete economic numbers.',
    underserved: 'Total Underserved Users Onboarded',
    fraudBlocked: 'Fraud Attempts Blocked',
    trustScore: 'Avg. Trust Score',
    gdpTitle: 'GDP Impact Calculator',
    gdpDesc: 'See how bringing underserved populations into the formal credit system via our Anti-Bias AI stimulates local economies.',
    churnTitle: 'Trust vs. Churn Rate',
    churnDesc: 'As customer trust increases through transparency, churn drops significantly.'
  },
  ethics: {
    title: 'Trust & Ethics Center',
    subtitle: 'The humans behind the algorithms.',
    integrityStatus: 'Model Integrity Status',
    healthy: 'Healthy',
    biasDesc: 'No bias drift detected in the last 24 hours.',
    blogTitle: 'The Ethics Board Blog',
    readFull: 'Read Full Decision'
  },
  family: {
    title: 'Family Safety View',
    subtitle: 'Protect your loved ones. Monitor linked accounts for suspicious activity.',
    actionNeeded: 'Action Needed',
    safe: 'Safe',
    lastActivity: 'Last Activity',
    alertsToday: 'Alerts Today',
    suspiciousBlock: 'Suspicious Transfer Blocked',
    call: 'Call'
  },
  login: {
    welcome: 'Welcome to Garuda-Shield',
    subtitle: 'Secure, Ethical, and Human-Centered Banking.',
    selectBank: 'Select Your Primary Bank',
    skip: 'Skip Linking (View Only Mode)',
    verified: 'Verified Gateway',
    nameLabel: 'Account Holder Name',
    accLabel: 'Account Number',
    secureLink: 'Secure Link & Login',
    skipForNow: 'Skip for now'
  },
  panic: {
    title: 'Emergency Mode',
    subtitle: 'Biometric Identity Verified. Select immediate action.',
    freeze: 'FREEZE ALL ACCOUNTS',
    locked: 'ACCOUNTS LOCKED',
    helpline: 'Cyber Crime Helpline',
    police: 'Draft Police Complaint',
    disclaimer: '*All UPI IDs, Credit Cards, and NetBanking access have been suspended across linked banks.'
  }
};

// --- HINDI TRANSLATION ---
const HI_TRANSLATIONS = {
  nav: { home: 'होम', ledger: 'लेज़र', consent: 'गोपनीयता', profile: 'प्रोफ़ाइल', banks: 'मेरा बैंक', guide: 'गाइड', transact: 'ट्रांसफर', family: 'परिवार सुरक्षा', b2b: 'एंटरप्राइज़', impact: 'प्रभाव', ethics: 'नीति' },
  hero: {
    title: 'विश्वास का किला।',
    subtitle: 'बैंकिंग जहां एआई खुद को समझाता है, और चाबियां आपके पास हैं।',
    cta: 'मेरा ट्रस्ट स्कोर देखें',
    verifierTitle: 'क्या यह असली है? तुरंत जांचें',
    verifierPlaceholder: 'SMS टेक्स्ट, ईमेल विषय या फ़ोन नंबर यहाँ पेस्ट करें...',
    verifyBtn: 'सत्यापित करें',
    scamTitle: 'विजुअल स्कैम गैलरी',
    savedTitle: 'गरुड़ द्वारा सुरक्षित',
    scanQR: 'QR स्कैन करें',
    panicBtn: 'आपातकाल सिमुलेशन'
  },
  ledger: {
    title: 'ग्लास बॉक्स लेज़र',
    desc: 'आपका पारदर्शी लेनदेन इतिहास।',
    explainBtn: 'ऐसा क्यों हुआ?',
    loading: 'AI एथिक्स इंजन से परामर्श कर रहा है...',
    verified: 'गरुड़-शील्ड द्वारा सत्यापित',
    fraud: 'धोखाधड़ी रोकथाम सक्रिय',
    addBtn: 'लेनदेन करें',
    addTitle: 'नया लेनदेन',
    addDesc: 'सुरक्षित ट्रांसफर शुरू करें। हमारा AI रीयल-टाइम में जांच करता है।',
    processing: 'AI विश्लेषण कर रहा है...',
    inputMerchant: 'लाभार्थी / व्यापारी',
    inputAmount: 'राशि (INR)',
    inputCategory: 'प्रकार',
    clearAll: 'इतिहास मिटाएं',
    safetyHeader: 'सुरक्षित कैसे रहें:',
    appHeader: 'अनुशंसित ऐप:',
    offlineMode: 'इंटरनेट समस्या? ऑफलाइन मोड का उपयोग करें',
    offlineDesc: 'बिना इंटरनेट के इस लेनदेन को पूरा करने के लिए अपने पंजीकृत मोबाइल नंबर से नीचे दिए गए USSD कोड को डायल करें।',
    dial: 'डायल करें',
    translatorTitle: 'लेनदेन अनुवादक',
    translatorDesc: 'गलती समझने के लिए कोड यहाँ पेस्ट करें।',
    translatorPlaceholder: 'उदाहरण: Error 503, 401...',
    translateBtn: 'अनुवाद करें',
    watchdogTitle: 'ऑटो-पे वॉचडॉग',
    watchdogDesc: 'पैसे बचाने के लिए छिपी हुई सदस्यताओं को रद्द करें।',
    safeToSpend: 'खर्च करने के लिए सुरक्षित',
    coolingOff: 'रुकिए...',
    undoBtn: 'रद्द करें',
    status_approved: 'स्वीकृत',
    status_blocked: 'अवरुद्ध',
    status_flagged: 'चिह्नित',
    status_pending: 'लंबित'
  },
  consent: {
    title: 'गोपनीयता और नियंत्रण',
    desc: 'फ़ोन सेटिंग की तरह अपना डेटा प्रबंधित करें।',
    revoked: 'बंद',
    granted: 'चालू'
  },
  profile: {
    title: 'मेरी प्रोफ़ाइल समझाएं',
    desc: 'देखें कि हमारा AI आपके वित्तीय स्वास्थ्य को कैसे देखता है।',
    score: 'विश्वास स्कोर',
    aiNote: 'AI विश्लेषक नोट',
    correctionTitle: 'क्या कुछ गलत है?',
    correctionDesc: 'यदि AI ने किसी लेनदेन की गलत व्याख्या की है (जैसे, चिकित्सा आपातकाल), तो आप सुधार जमा कर सकते हैं।',
    correctionBtn: 'इसे सुधारें',
    submitted: 'सुधार जमा किया गया',
    underReview: 'हमारी मानव नैतिकता समिति 24 घंटे के भीतर समीक्षा करेगी।',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    placeholder: 'उदा. वह बड़ी निकासी एक चिकित्सा आपातकाल के लिए थी...'
  },
  banks: {
    title: 'वित्तीय विकास सलाहकार',
    desc: 'नैतिक ऋण विकल्प देखने के लिए बैंक चुनें।',
    analyzeBtn: 'लाभ/हानि विश्लेषण',
    myAccount: 'मेरा खाता डैशबोर्ड',
    linkAccount: 'अपना खाता लिंक करें',
    linkDesc: 'लाइव बैलेंस और सलाह देखने के लिए अपना खाता लिंक करें।',
    balance: 'उपलब्ध शेष राशि',
    activePlan: 'सक्रिय योजना',
    historyBtn: 'पूरा इतिहास देखें',
    fillDetails: 'बैंक विवरण दर्ज करें',
    cancel: 'रद्द करें',
    save: 'खाता लिंक करें',
    skip: 'अभी के लिए छोड़ें'
  },
  guide: {
    title: 'उपयोगकर्ता गाइड',
    desc: 'अपनी वित्तीय पहचान की सुरक्षा के लिए गरुड़-शील्ड का उपयोग करना सीखें।'
  },
  b2b: {
      title: 'तकनीकी किला',
      subtitle: 'CTO और अनुपालन अधिकारियों के लिए उद्यम-श्रेणी वास्तुकला।',
      ocrTitle: 'डिफरेंशियल प्राइवेसी और स्मार्ट OCR',
      ocrDesc: 'व्यक्तिगत पहचानकर्ता (नाम, आधार) तुरंत धुंधले कर दिए जाते हैं।',
      testingTitle: 'विरोध परीक्षण लैब',
      testingDesc: 'हम अपने मॉडलों के खिलाफ 24/7 सिम्युलेटेड हमले चलाते हैं।',
      regTitle: 'नियामक अनुपालन मानचित्र',
      mandate: 'जनादेश',
      implementation: 'गरुड़-शील्ड कार्यान्वयन',
      status: 'स्थिति',
      researchTitle: 'अनुसंधान और श्वेतपत्र',
      whitepaper1: 'विश्वास का अर्थशास्त्र',
      whitepaper2: 'ग्रामीण ऋण में निष्पक्षता'
  },
  impact: {
      title: 'प्रभाव डैशबोर्ड',
      subtitle: 'ठोस आर्थिक आंकड़े।',
      underserved: 'वंचित उपयोगकर्ता',
      fraudBlocked: 'रोकी गई धोखाधड़ी',
      trustScore: 'विश्वास स्कोर',
      gdpTitle: 'GDP प्रभाव',
      gdpDesc: 'स्थानीय अर्थव्यवस्था को बढ़ावा।',
      churnTitle: 'विश्वास बनाम मंथन',
      churnDesc: 'पारदर्शिता से ग्राहकों का मंथन कम होता है।'
  },
  ethics: {
      title: 'विश्वास और नैतिकता केंद्र',
      subtitle: 'एल्गोरिदम के पीछे के इंसान।',
      integrityStatus: 'मॉडल अखंडता',
      healthy: 'स्वस्थ',
      biasDesc: 'कोई पूर्वाग्रह नहीं।',
      blogTitle: 'एथिक्स बोर्ड ब्लॉग',
      readFull: 'पूरा निर्णय पढ़ें'
  },
  family: {
      title: 'परिवार सुरक्षा दृश्य',
      subtitle: 'अपने प्रियजनों की रक्षा करें।',
      actionNeeded: 'कार्रवाई की आवश्यकता',
      safe: 'सुरक्षित',
      lastActivity: 'अंतिम गतिविधि',
      alertsToday: 'आज के अलर्ट',
      suspiciousBlock: 'संदिग्ध ट्रांसफर रोका गया',
      call: 'कॉल करें'
  },
  login: {
      welcome: 'गरुड़-शील्ड में स्वागत है',
      subtitle: 'सुरक्षित, नैतिक और मानव-केंद्रित बैंकिंग।',
      selectBank: 'बैंक चुनें',
      skip: 'लिंकिंग छोड़ें',
      verified: 'सत्यापित',
      nameLabel: 'नाम',
      accLabel: 'खाता संख्या',
      secureLink: 'लॉगिन करें',
      skipForNow: 'अभी के लिए छोड़ें'
  },
  panic: {
      title: 'आपातकालीन मोड',
      subtitle: 'बायोमेट्रिक सत्यापित। कार्रवाई चुनें।',
      freeze: 'सभी खाते फ्रीज करें',
      locked: 'खाते लॉक किए गए',
      helpline: 'हेल्पलाइन',
      police: 'पुलिस शिकायत',
      disclaimer: '*सभी एक्सेस निलंबित।'
  }
};

// --- BENGALI TRANSLATION ---
const BN_TRANSLATIONS = {
  ...DEFAULT_EN_TRANSLATIONS,
  nav: { home: 'নীড়', ledger: 'লেজার', consent: 'গোপনীয়তা', profile: 'প্রোফাইল', banks: 'আমার ব্যাংক', guide: 'গাইড', transact: 'ট্রান্সফার', family: 'পারিবারিক সুরক্ষা', b2b: 'এন্টারপ্রাইজ', impact: 'প্রভাব', ethics: 'নীতি' },
  hero: { ...DEFAULT_EN_TRANSLATIONS.hero, title: 'বিশ্বাসের দুর্গ।', subtitle: 'ব্যাংকিং যেখানে এআই নিজেকে ব্যাখ্যা করে।', cta: 'ট্রাস্ট স্কোর দেখুন', verifierTitle: 'এটি কি আসল?', verifierPlaceholder: 'এখানে এসএমএস, ইমেল বা নম্বর পেস্ট করুন...', verifyBtn: 'যাচাই করুন', scamTitle: 'প্রতারণার গ্যালারি', savedTitle: 'সুরক্ষিত' },
  ledger: { ...DEFAULT_EN_TRANSLATIONS.ledger, title: 'গ্লাস বক্স লেজার', desc: 'আপনার স্বচ্ছ লেনদেনের ইতিহাস।', explainBtn: 'কেন এমন হল?', addBtn: 'লেনদেন', clearAll: 'মুছুন', offlineMode: 'অফলাইন মোড', safetyHeader: 'কিভাবে নিরাপদ থাকবেন', appHeader: 'প্রস্তাবিত অ্যাপ', safeToSpend: 'ব্যয় করার জন্য নিরাপদ', coolingOff: 'কুলিং অফ', undoBtn: 'বাতিল', translatorTitle: 'লেনদেন অনুবাদক', status_approved: 'অনুমোদিত', status_blocked: 'অবরুদ্ধ', status_flagged: 'চিহ্নিত' },
  consent: { title: 'গোপনীয়তা ও নিয়ন্ত্রণ', desc: 'আপনার ডেটা অনুমতিগুলি পরিচালনা করুন।', revoked: 'বন্ধ', granted: 'চালু' },
  profile: { title: 'আমার প্রোফাইল', desc: 'এআই আপনার আর্থিক স্বাস্থ্য কীভাবে দেখে তা জানুন।', score: 'ট্রাস্ট স্কোর', aiNote: 'এআই বিশ্লেষক নোট', correctionTitle: 'ভুল কিছু দেখছেন?', correctionBtn: 'সংশোধন করুন' },
  banks: { ...DEFAULT_EN_TRANSLATIONS.banks, title: 'আর্থিক উপদেষ্টা', desc: 'নৈতিক ঋণের বিকল্পগুলি দেখুন।', analyzeBtn: 'লাভ/ক্ষতি বিশ্লেষণ', myAccount: 'আমার অ্যাকাউন্ট', linkAccount: 'অ্যাকাউন্ট লিঙ্ক করুন', balance: 'ব্যালেন্স', historyBtn: 'ইতিহাস', save: 'সংরক্ষণ', cancel: 'বাতিল' },
  family: { ...DEFAULT_EN_TRANSLATIONS.family, title: 'পারিবারিক সুরক্ষা দৃশ্য', subtitle: 'আপনার প্রিয়জনদের রক্ষা করুন।' },
  panic: { ...DEFAULT_EN_TRANSLATIONS.panic, title: 'জরুরী মোড', freeze: 'সব অ্যাকাউন্ট ফ্রিজ করুন', locked: 'অ্যাকাউন্ট লক করা হয়েছে', helpline: 'হেল্পলাইন', police: 'পুলিশ' },
  impact: { ...DEFAULT_EN_TRANSLATIONS.impact, title: 'প্রভাব ড্যাশবোর্ড', subtitle: 'কংক্রিট অর্থনৈতিক সংখ্যা।', underserved: 'সুবিধাবঞ্চিত ব্যবহারকারী', fraudBlocked: 'প্রতারণা প্রতিরোধ', trustScore: 'গড় বিশ্বাস স্কোর', gdpTitle: 'জিডিপি প্রভাব', gdpDesc: 'স্থানীয় অর্থনীতিকে উদ্দীপিত করা।' },
  ethics: { ...DEFAULT_EN_TRANSLATIONS.ethics, title: 'বিশ্বাস ও নীতি কেন্দ্র', subtitle: 'অ্যালগরিদমের পিছনের মানুষ।', integrityStatus: 'মডেল স্ট্যাটাস', healthy: 'সুস্থ', biasDesc: 'কোন পক্ষপাত সনাক্ত হয়নি।', readFull: 'সম্পূর্ণ পড়ুন' },
  guide: { title: 'ব্যবহারকারী গাইড', desc: 'আপনার আর্থিক পরিচয় সুরক্ষিত রাখতে শিখুন।' },
  b2b: { ...DEFAULT_EN_TRANSLATIONS.b2b, title: 'প্রযুক্তিগত দুর্গ', subtitle: 'এন্টারপ্রাইজ-গ্রেড আর্কিটেকচার।' }
};

// --- MARATHI TRANSLATION ---
const MR_TRANSLATIONS = {
  ...DEFAULT_EN_TRANSLATIONS,
  nav: { home: 'मुख्यपृष्ठ', ledger: 'लेजर', consent: 'गोपनीयता', profile: 'प्रोफाइल', banks: 'माझी बँक', guide: 'गाईड', transact: 'ट्रान्सफर', family: 'कुटुंब सुरक्षा', b2b: 'एंटरप्राइझ', impact: 'प्रभाव', ethics: 'नीतिमत्ता' },
  hero: { ...DEFAULT_EN_TRANSLATIONS.hero, title: 'विश्वासाचा किल्ला.', subtitle: 'बँकिंग जिथे एआय स्वतःचे स्पष्टीकरण देते.', cta: 'विश्वास स्कोर पहा', verifierTitle: 'हे खरे आहे का?', verifierPlaceholder: 'येथे एसएमएस, ईमेल किंवा नंबर पेस्ट करा...', verifyBtn: 'तपासा', scamTitle: 'फसवणूक गॅलरी', savedTitle: 'गरुड द्वारे संरक्षित' },
  ledger: { ...DEFAULT_EN_TRANSLATIONS.ledger, title: 'ग्लास बॉक्स लेजर', desc: 'तुमचा पारदर्शक व्यवहार इतिहास.', explainBtn: 'हे का झाले?', addBtn: 'व्यवहार करा', clearAll: 'साफ करा', offlineMode: 'ऑफलाइन मोड', safetyHeader: 'सुरक्षित कसे राहावे', appHeader: 'शिफारस केलेले ॲप', safeToSpend: 'खर्च करण्यासाठी सुरक्षित', coolingOff: 'कूलिंग ऑफ', undoBtn: 'रद्द करा', translatorTitle: 'व्यवहार अनुवादक', status_approved: 'मंजूर', status_blocked: 'ब्लॉक केले', status_flagged: 'फ्लॅग केले' },
  consent: { title: 'गोपनीयता आणि नियंत्रण', desc: 'तुमच्या डेटा परवानग्या व्यवस्थापित करा.', revoked: 'बंद', granted: 'चालू' },
  profile: { title: 'माझी प्रोफाइल', desc: 'एआय तुमची आर्थिक स्थिती कशी पाहते ते पहा.', score: 'विश्वास स्कोर', aiNote: 'एआय विश्लेषक टीप', correctionTitle: 'काही चूक आहे का?', correctionBtn: 'दुरुस्त करा' },
  banks: { ...DEFAULT_EN_TRANSLATIONS.banks, title: 'आर्थिक सल्लागार', desc: 'नैतिक कर्ज पर्याय निवडा.', analyzeBtn: 'नफा/तोटा विश्लेषण', myAccount: 'माझे खाते', linkAccount: 'खाते लिंक करा', balance: 'शिल्लक', historyBtn: 'इतिहास', save: 'जतन करा', cancel: 'रद्द करा' },
  family: { ...DEFAULT_EN_TRANSLATIONS.family, title: 'कुटुंब सुरक्षा दृश्य', subtitle: 'आपल्या प्रियजनांचे रक्षण करा.' },
  panic: { ...DEFAULT_EN_TRANSLATIONS.panic, title: 'आणीबाणी मोड', freeze: 'सर्व खाती गोठवा', locked: 'खाती लॉक केली आहेत', helpline: 'हेल्पलाइन', police: 'पोलीस' },
  impact: { ...DEFAULT_EN_TRANSLATIONS.impact, title: 'प्रभाव डॅशबोर्ड', subtitle: 'ठोस आर्थिक आकडेवारी.', underserved: 'वंचित वापरकर्ते', fraudBlocked: 'रोखलेली फसवणूक', trustScore: 'सरासरी विश्वास गुण', gdpTitle: 'जीडीपी प्रभाव', gdpDesc: 'स्थानिक अर्थव्यवस्थेला चालना.' },
  ethics: { ...DEFAULT_EN_TRANSLATIONS.ethics, title: 'विश्वास आणि नीतिमत्ता केंद्र', subtitle: 'अल्गोरिदमच्या मागील माणसे.', integrityStatus: 'मॉडेल स्थिती', healthy: 'चांगले', biasDesc: 'कोणताही पक्षपात नाही.', readFull: 'पूर्ण वाचा' },
  guide: { title: 'वापरकर्ता मार्गदर्शक', desc: 'तुमची आर्थिक ओळख सुरक्षित करा.' },
  b2b: { ...DEFAULT_EN_TRANSLATIONS.b2b, title: 'तांत्रिक किल्ला', subtitle: 'एंटरप्राइझ-ग्रेड आर्किटेक्चर.' }
};

// --- TAMIL TRANSLATION ---
const TA_TRANSLATIONS = {
  ...DEFAULT_EN_TRANSLATIONS,
  nav: { home: 'முகப்பு', ledger: 'லெட்ஜர்', consent: 'தனியுரிமை', profile: 'சுயவிவரம்', banks: 'வங்கி', guide: 'வழிகாட்டி', transact: 'பரிமாற்றம்', family: 'குடும்பம்', b2b: 'நிறுவனம்', impact: 'தாக்கம்', ethics: 'நெறிமுறை' },
  hero: { ...DEFAULT_EN_TRANSLATIONS.hero, title: 'நம்பிக்கையின் கோட்டை.', subtitle: 'AI தன்னை விளக்கும் வங்கி சேவை.', cta: 'மதிப்பெண்ணைப் பார்', verifierTitle: 'இது உண்மையானதா?', verifierPlaceholder: 'உரை, மின்னஞ்சல் அல்லது எண்ணை இங்கே ஒட்டவும்...', verifyBtn: 'சரிபார்', scamTitle: 'மோசடி தொகுப்பு', savedTitle: 'கருடாவால் சேமிக்கப்பட்டது' },
  ledger: { ...DEFAULT_EN_TRANSLATIONS.ledger, title: 'கண்ணாடி பெட்டி லெட்ஜர்', desc: 'உங்கள் வெளிப்படையான பரிவர்த்தனை வரலாறு.', explainBtn: 'ஏன் இது நடந்தது?', addBtn: 'பரிவர்த்தனை செய்', clearAll: 'அழி', offlineMode: 'ஆஃப்லைன் முறை', safetyHeader: 'பாதுகாப்பாக இருப்பது எப்படி', appHeader: 'பரிந்துரைக்கப்பட்ட செயலி', safeToSpend: 'செலவழிக்க பாதுகாப்பானது', coolingOff: 'காத்திருப்பு', undoBtn: 'தவிர்', translatorTitle: 'பரிவர்த்தனை மொழிபெயர்ப்பாளர்', status_approved: 'அனுமதிக்கப்பட்டது', status_blocked: 'தடுக்கப்பட்டது', status_flagged: 'குறிக்கப்பட்டது' },
  consent: { title: 'தனியுரிமை & கட்டுப்பாடு', desc: 'தரவு அனுமதிகளை நிர்வகிக்கவும்.', revoked: 'இல்லை', granted: 'ஆம்' },
  profile: { title: 'என் சுயவிவரம்', desc: 'AI உங்களை எப்படி பார்க்கிறது.', score: 'நம்பிக்கை மதிப்பெண்', aiNote: 'AI பகுப்பாய்வு குறிப்பு', correctionTitle: 'ஏதேனும் தவறாக உள்ளதா?', correctionBtn: 'இதை சரிசெய்யவும்' },
  banks: { ...DEFAULT_EN_TRANSLATIONS.banks, title: 'நிதி ஆலோசகர்', desc: 'நெறிமுறை கடன் விருப்பங்களை தேர்வு செய்யவும்.', analyzeBtn: 'லாப/நட்ட பகுப்பாய்வு', myAccount: 'என் கணக்கு', linkAccount: 'கணக்கை இணைக்கவும்', balance: 'இருப்பு', historyBtn: 'வரலாறு', save: 'சேமி', cancel: 'ரத்து' },
  family: { ...DEFAULT_EN_TRANSLATIONS.family, title: 'குடும்ப பாதுகாப்பு பார்வை' },
  panic: { ...DEFAULT_EN_TRANSLATIONS.panic, title: 'அவசர நிலை', freeze: 'கணக்குகளை முடக்கு', locked: 'முடக்கப்பட்டது', helpline: 'உதவி எண்', police: 'காவல்துறை' },
  impact: { ...DEFAULT_EN_TRANSLATIONS.impact, title: 'தாக்கக் குழு', subtitle: 'உறுதியான பொருளாதார எண்கள்.', underserved: 'பயனர்கள்', fraudBlocked: 'மோசடி தடுக்கப்பட்டது', trustScore: 'நம்பிக்கை மதிப்பெண்', gdpTitle: 'மொத்த உள்நாட்டு உற்பத்தி', gdpDesc: 'உள்ளூர் பொருளாதாரத்தை உயர்த்துதல்.' },
  ethics: { ...DEFAULT_EN_TRANSLATIONS.ethics, title: 'நெறிமுறை மையம்', subtitle: 'அல்காரிதமிற்கு பின்னால் உள்ள மனிதர்கள்.', integrityStatus: 'மாதிரி நிலை', healthy: 'ஆரோக்கியம்', biasDesc: 'சார்பு இல்லை.', readFull: 'முழுமையாக படிக்க' },
  guide: { title: 'பயனர் வழிகாட்டி', desc: 'நிதி பாதுகாப்பை கற்றுக்கொள்ளுங்கள்.' },
  b2b: { ...DEFAULT_EN_TRANSLATIONS.b2b, title: 'தொழில்நுட்ப கோட்டை', subtitle: 'நிறுவனத் தரக் கட்டமைப்பு.' }
};

// --- TELUGU TRANSLATION ---
const TE_TRANSLATIONS = {
  ...DEFAULT_EN_TRANSLATIONS,
  nav: { home: 'హోమ్', ledger: 'లెడ్జర్', consent: 'గోప్యత', profile: 'ప్రొఫైల్', banks: 'నా బ్యాంక్', guide: 'గైడ్', transact: 'బదిలీ', family: 'కుటుంబం', b2b: 'ఎంటర్ప్రైజ్', impact: 'ప్రభావం', ethics: 'నైతికత' },
  hero: { ...DEFAULT_EN_TRANSLATIONS.hero, title: 'నమ్మకం యొక్క కోట.', subtitle: 'AI స్వయంగా వివరించే బ్యాంకింగ్.', cta: 'నా స్కోరు చూడండి', verifierTitle: 'ఇది నిజమేనా?', verifierPlaceholder: 'వచనం, ఇమెయిల్ లేదా నంబర్‌ని ఇక్కడ పేస్ట్ చేయండి...', verifyBtn: 'ధృవీకరించండి', scamTitle: 'స్కామ్ గ్యాలరీ', savedTitle: 'గరుడ ద్వారా రక్షించబడింది' },
  ledger: { ...DEFAULT_EN_TRANSLATIONS.ledger, title: 'గ్లాస్ బాక్స్ లెడ్జర్', desc: 'మీ పారదర్శక లావాదేవీ చరిత్ర.', explainBtn: 'ఇది ఎందుకు జరిగింది?', addBtn: 'లావాదేవీ చేయండి', clearAll: 'క్లియర్', offlineMode: 'ఆఫ్‌లైన్ మోడ్', safetyHeader: 'సురక్షితంగా ఉండటం ఎలా', appHeader: 'సిఫార్సు చేయబడిన యాప్', safeToSpend: 'ఖర్చు చేయడానికి సురక్షితం', coolingOff: 'కూలింగ్ ఆఫ్', undoBtn: 'రద్దు చేయి', translatorTitle: 'లావాదేవీ అనువాదకుడు', status_approved: 'ఆమోదించబడింది', status_blocked: 'బ్లాక్ చేయబడింది', status_flagged: 'గుర్తించబడింది' },
  consent: { title: 'గోప్యత & నియಂತ್ರణ', desc: 'డేటా అనుమతులను నిర్వహించండి.', revoked: 'ఆఫ్', granted: 'ఆన్' },
  profile: { title: 'నా ప్రొఫైల్', desc: 'AI మిమ్మల్ని ఎలా చూస్తుందో చూడండి.', score: 'నమ్మక స్కోరు', aiNote: 'AI విశ్లేషకుడు గమనిక', correctionTitle: 'ఏదో తప్పుగా ఉందా?', correctionBtn: 'సరి చేయండి' },
  banks: { ...DEFAULT_EN_TRANSLATIONS.banks, title: 'ఆర్థిక సలహాదారు', desc: 'నైతిక రుణ ఎంపికలను ఎంచుకోండి.', analyzeBtn: 'లాభం/నష్టం విశ్లేషణ', myAccount: 'నా ఖాతా', linkAccount: 'ఖాతాను లింక్ చేయండి', balance: 'బ్యాలెన్స్', historyBtn: 'చరిత్ర', save: 'సేవ్', cancel: 'రద్దు' },
  family: { ...DEFAULT_EN_TRANSLATIONS.family, title: 'కుటుంబ భద్రత వీక్షణ' },
  panic: { ...DEFAULT_EN_TRANSLATIONS.panic, title: 'అత్యవసర మోడ్', freeze: 'ఖాతాలను స్తంభింపజేయండి', locked: 'లాక్ చేయబడింది', helpline: 'హెల్ప్‌లైన్', police: 'పోలీస్' },
  impact: { ...DEFAULT_EN_TRANSLATIONS.impact, title: 'ప్రభావ డాష్‌బోర్డ్', subtitle: 'ఆర్థిక గణాంకాలు.', underserved: 'వినియోగదారులు', fraudBlocked: 'మోసాలు నిరోధించబడ్డాయి', trustScore: 'నమ్మక స్కోరు', gdpTitle: 'GDP ప్రభావం', gdpDesc: 'స్థానిక ఆర్థిక వ్యవస్థను పెంచడం.' },
  ethics: { ...DEFAULT_EN_TRANSLATIONS.ethics, title: 'నైతిక కేంద్రం', subtitle: 'అల్గోరిథం వెనుక ఉన్న మనుషులు.', integrityStatus: 'మోడల్ స్థితి', healthy: 'ఆరోగ్యకరమైన', biasDesc: 'పక్షపాతం లేదు.', readFull: 'పూర్తిగా చదవండి' },
  guide: { title: 'వినియోగదారు గైడ్', desc: 'ఆర్థిక భద్రత గురించి తెలుసుకోండి.' },
  b2b: { ...DEFAULT_EN_TRANSLATIONS.b2b, title: 'సాంకేతిక కోట', subtitle: 'ఎంటర్ప్రైజ్ స్థాయి నిర్మాణం.' }
};

// --- KANNADA TRANSLATION ---
const KN_TRANSLATIONS = {
  ...DEFAULT_EN_TRANSLATIONS,
  nav: { home: 'ಮುಖಪುಟ', ledger: 'ಲೆಡ್ಜರ್', consent: 'ಗೌಪ್ಯತೆ', profile: 'ಪ್ರೊಫೈಲ್', banks: 'ನನ್ನ ಬ್ಯಾಂಕ್', guide: 'ಮಾರ್ಗದರ್ಶಿ', transact: 'ವರ್ಗಾವಣೆ', family: 'ಕುಟುಂಬ', b2b: 'ಉದ್ಯಮ', impact: 'ಪರಿಣಾಮ', ethics: 'ನೈತಿಕತೆ' },
  hero: { ...DEFAULT_EN_TRANSLATIONS.hero, title: 'ನಂಬಿಕೆಯ ಕೋಟೆ.', subtitle: 'AI ಸ್ವತಃ ವಿವರಿಸುವ ಬ್ಯಾಂಕಿಂಗ್.', cta: 'ಸ್ಕೋರ್ ವೀಕ್ಷಿಸಿ', verifierTitle: 'ಇದು ನಿಜವೇ?', verifierPlaceholder: 'ಪಠ್ಯ, ಇಮೇಲ್ ಅಥವಾ ಸಂಖ್ಯೆಯನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...', verifyBtn: 'ಪರಿಶೀಲಿಸಿ', scamTitle: 'ಹಗರಣ ಗ್ಯಾಲರಿ', savedTitle: 'ಗರುಡ ರಕ್ಷಿಸಿದೆ' },
  ledger: { ...DEFAULT_EN_TRANSLATIONS.ledger, title: 'ಗ್ಲಾಸ್ ಬಾಕ್ಸ್ ಲೆಡ್ಜರ್', desc: 'ಪಾರದರ್ಶಕ ವಹಿವಾಟು ಇತಿಹಾಸ.', explainBtn: 'ಇದು ಏಕೆ ಸಂಭವಿಸಿತು?', addBtn: 'ವಹಿವಾಟು ಮಾಡಿ', clearAll: 'ಅಳಿಸಿ', offlineMode: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್', safetyHeader: 'ಸುರಕ್ಷಿತವಾಗಿರುವುದು ಹೇಗೆ', appHeader: 'ಶಿಫಾರಸು ಮಾಡಿದ ಅಪ್ಲಿಕೇಶನ್', safeToSpend: 'ಖರ್ಚು ಮಾಡಲು ಸುರಕ್ಷಿತ', coolingOff: 'ಕೂಲಿಂಗ್ ಆಫ್', undoBtn: 'ರದ್ದುಗೊಳಿಸಿ', translatorTitle: 'ವಹಿವಾಟು ಅನುವಾದಕ', status_approved: 'ಅನುಮೋದಿಸಲಾಗಿದೆ', status_blocked: 'ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ', status_flagged: 'ಗುರುತಿಸಲಾಗಿದೆ' },
  consent: { title: 'ಗೌಪ್ಯತೆ & ನಿಯಂತ್ರಣ', desc: 'ಡೇಟಾ ಅನುಮತಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ.', revoked: 'ಆಫ್', granted: 'ಆನ್' },
  profile: { title: 'ನನ್ನ ಪ್ರೊಫೈಲ್', desc: 'AI ನಿಮ್ಮನ್ನು ಹೇಗೆ ನೋಡುತ್ತದೆ.', score: 'ನಂಬಿಕೆ ಸ್ಕೋರ್', aiNote: 'AI ಟಿಪ್ಪಣಿ', correctionTitle: 'ಏನಾದರೂ ತಪ್ಪಾಗಿದೆಯೇ?', correctionBtn: 'ಸರಿಪಡಿಸಿ' },
  banks: { ...DEFAULT_EN_TRANSLATIONS.banks, title: 'ಹಣಕಾಸು ಸಲಹೆಗಾರ', desc: 'ನೈತಿಕ ಸಾಲದ ಆಯ್ಕೆಗಳನ್ನು ನೋಡಿ.', analyzeBtn: 'ಲಾಭ/ನಷ್ಟ ವಿಶ್ಲೇಷಣೆ', myAccount: 'ನನ್ನ ಖಾತೆ', linkAccount: 'ಖಾತೆ ಲಿಂಕ್ ಮಾಡಿ', balance: 'ಬಾಕಿ', historyBtn: 'ಇತಿಹಾಸ', save: 'ಉಳಿಸಿ', cancel: 'ರದ್ದು' },
  family: { ...DEFAULT_EN_TRANSLATIONS.family, title: 'ಕುಟುಂಬ ಸುರಕ್ಷತೆ ವೀಕ್ಷಣೆ' },
  panic: { ...DEFAULT_EN_TRANSLATIONS.panic, title: 'ತುರ್ತು ಮೋಡ್', freeze: 'ಖಾತೆಗಳನ್ನು ಸ್ಥಗಿತಗೊಳಿಸಿ', locked: 'ಲಾಕ್ ಆಗಿದೆ', helpline: 'ಸಹಾಯವಾಣಿ', police: 'ಪೊಲೀಸ್' },
  impact: { ...DEFAULT_EN_TRANSLATIONS.impact, title: 'ಪರಿಣಾಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', subtitle: 'ಆರ್ಥಿಕ ಅಂಕಿಅಂಶಗಳು.', underserved: 'ಬಳಕೆದಾರರು', fraudBlocked: 'ತಡೆಗಟ್ಟಿದ ವಂಚನೆ', trustScore: 'ಸರಾಸರಿ ನಂಬಿಕೆ', gdpTitle: 'ಜಿಡಿಪಿ ಪರಿಣಾಮ', gdpDesc: 'ಸ್ಥಳೀಯ ಆರ್ಥಿಕತೆ.' },
  ethics: { ...DEFAULT_EN_TRANSLATIONS.ethics, title: 'ನೈತಿಕ ಕೇಂದ್ರ', subtitle: 'ಅಲ್ಗಾರಿದಮ್ ಹಿಂದಿನ ಮಾನವರು.', integrityStatus: 'ಮಾದರಿ ಸ್ಥಿತಿ', healthy: 'ಆರೋಗ್ಯಕರ', biasDesc: 'ಪಕ್ಷಪಾತವಿಲ್ಲ.', readFull: 'ಪೂರ್ಣ ಓದಿ' },
  guide: { title: 'ಬಳಕೆದಾರರ ಮಾರ್ಗದರ್ಶಿ', desc: 'ಹಣಕಾಸಿನ ಸುರಕ್ಷತೆಯನ್ನು ಕಲಿಯಿರಿ.' },
  b2b: { ...DEFAULT_EN_TRANSLATIONS.b2b, title: 'ತಾಂತ್ರಿಕ ಕೋಟೆ', subtitle: 'ಉದ್ಯಮ ದರ್ಜೆಯ ವಾಸ್ತುಶಿಲ್ಪ.' }
};

// --- GUJARATI TRANSLATION ---
const GU_TRANSLATIONS = {
  ...DEFAULT_EN_TRANSLATIONS,
  nav: { home: 'ઘર', ledger: 'ખાતાવહી', consent: 'ગોપનીયતા', profile: 'પ્રોફાઇલ', banks: 'મારી બેંક', guide: 'માર્ગદર્શિકા', transact: 'ટ્રાન્સફર', family: 'પરિવાર', b2b: 'એન્ટરપ્રાઇઝ', impact: 'અસર', ethics: 'નૈતિકતા' },
  hero: { ...DEFAULT_EN_TRANSLATIONS.hero, title: 'વિશ્વાસનો કિલ્લો.', subtitle: 'બેન્કિંગ જ્યાં AI પોતાને સમજાવે છે.', cta: 'મારો સ્કોર જુઓ', verifierTitle: 'શું આ સાચું છે?', verifierPlaceholder: 'અહીં ટેક્સ્ટ, ઇમેઇલ અથવા નંબર પેસ્ટ કરો...', verifyBtn: 'ચકાસો', scamTitle: 'કૌભાંડ ગેલેરી', savedTitle: 'ગરુડ દ્વારા સાચવેલ' },
  ledger: { ...DEFAULT_EN_TRANSLATIONS.ledger, title: 'ગ્લાસ બોક્સ લેજર', desc: 'તમારો પારદર્શક વ્યવહાર ઇતિહાસ.', explainBtn: 'આ કેમ થયું?', addBtn: 'વ્યવહાર કરો', clearAll: 'સાફ કરો', offlineMode: 'ઓફલાઇન મોડ', safetyHeader: 'સુરક્ષિત કેવી રીતે રહેવું', appHeader: 'ભલામણ કરેલ એપ્લિકેશન', safeToSpend: 'ખર્ચ કરવા માટે સુરક્ષિત', coolingOff: 'કૂલિંગ ઓફ', undoBtn: 'રદ કરો', translatorTitle: 'વ્યવહાર અનુવાદક', status_approved: 'મંજૂર', status_blocked: 'બ્લોક કરેલ', status_flagged: 'ફ્લેગ કરેલ' },
  consent: { title: 'ગોપનીયતા અને નિયંત્રણ', desc: 'તમારા ડેટાની પરવાનગીઓ મેનેજ કરો.', revoked: 'બંધ', granted: 'ચાલુ' },
  profile: { title: 'મારી પ્રોફાઇલ', desc: 'AI તમને કેવી રીતે જુએ છે તે જુઓ.', score: 'વિશ્વાસ સ્કોર', aiNote: 'AI નોંધ', correctionTitle: 'કંઈક ખોટું છે?', correctionBtn: 'સુધારો' },
  banks: { ...DEFAULT_EN_TRANSLATIONS.banks, title: 'નાણાકીય સલાહકાર', desc: 'નૈતિક લોન વિકલ્પો જુઓ.', analyzeBtn: 'નફો/નુકશાન વિશ્લેષણ', myAccount: 'મારું ખાતું', linkAccount: 'ખાતું લિંક કરો', balance: 'બાકી', historyBtn: 'ઇતિહાસ', save: 'સાચવો', cancel: 'રદ કરો' },
  family: { ...DEFAULT_EN_TRANSLATIONS.family, title: 'પરિવાર સુરક્ષા દૃશ્ય' },
  panic: { ...DEFAULT_EN_TRANSLATIONS.panic, title: 'કટોકટી મોડ', freeze: 'ખાતાઓ ફ્રીઝ કરો', locked: 'લોક કરેલ છે', helpline: 'હેલ્પલાઇન', police: 'પોલીસ' },
  impact: { ...DEFAULT_EN_TRANSLATIONS.impact, title: 'અસર ડેશબોર્ડ', subtitle: 'આર્થિક આંકડા.', underserved: 'વપરાશકર્તાઓ', fraudBlocked: 'છેતરપિંડી અટકાવી', trustScore: 'સરેરાશ સ્કોર', gdpTitle: 'જીડીપી અસર', gdpDesc: 'સ્થાનિક અર્થતંત્ર.' },
  ethics: { ...DEFAULT_EN_TRANSLATIONS.ethics, title: 'નૈતિકતા કેન્દ્ર', subtitle: 'અલ્ગોરિધમ પાછળના માણસો.', integrityStatus: 'મોડેલ સ્થિતિ', healthy: 'સ્વસ્થ', biasDesc: 'પક્ષપાત નથી.', readFull: 'સંપૂર્ણ વાંચો' },
  guide: { title: 'વપરાશકર્તા માર્ગદર્શિકા', desc: 'નાણાકીય સુરક્ષા શીખો.' },
  b2b: { ...DEFAULT_EN_TRANSLATIONS.b2b, title: 'તકનીકી કિલ્લો', subtitle: 'એન્ટરપ્રાઇઝ આર્કિટેક્ચર.' }
};

// --- MALAYALAM TRANSLATION ---
const ML_TRANSLATIONS = {
  ...DEFAULT_EN_TRANSLATIONS,
  nav: { home: 'ഹോം', ledger: 'ലെഡ്ജർ', consent: 'സ്വകാര്യത', profile: 'പ്രൊഫൈൽ', banks: 'എന്റെ ബാങ്ക്', guide: 'ഗൈഡ്', transact: 'കൈമാറ്റം', family: 'കുടുംബം', b2b: 'എന്റർപ്രൈസ്', impact: 'ആഘാതം', ethics: 'ധാർമ്മികത' },
  hero: { ...DEFAULT_EN_TRANSLATIONS.hero, title: 'വിശ്വാസത്തിന്റെ കോട്ട.', subtitle: 'AI സ്വയം വിശദീകരിക്കുന്ന ബാങ്കിംഗ്.', cta: 'സ്കോർ കാണുക', verifierTitle: 'ഇത് യഥാർത്ഥമാണോ?', verifierPlaceholder: 'ടെക്സ്റ്റ്, ഇമെയിൽ അല്ലെങ്കിൽ നമ്പർ ഇവിടെ ഒട്ടിക്കുക...', verifyBtn: 'പരിശോധിക്കുക', scamTitle: 'തട്ടിപ്പ് ഗാലറി', savedTitle: 'ഗരുഡ രക്ഷിച്ചത്' },
  ledger: { ...DEFAULT_EN_TRANSLATIONS.ledger, title: 'ഗ്ലാസ് ബോക്സ് ലെഡ്ജർ', desc: 'സുതാര്യമായ ഇടപാട് ചരിത്രം.', explainBtn: 'എന്തുകൊണ്ടാണ് ഇത് സംഭവിച്ചത്?', addBtn: 'ഇടപാട് നടത്തുക', clearAll: 'നീക്കം ചെയ്യുക', offlineMode: 'ഓഫ്‌ലൈൻ മോഡ്', safetyHeader: 'സുരക്ഷിതമായിരിക്കുന്നത് എങ്ങനെ', appHeader: 'ശുപാർശ ചെയ്യുന്ന ആപ്പ്', safeToSpend: 'ചെലവഴിക്കാൻ സുരക്ഷിതം', coolingOff: 'കൂളിംഗ് ഓഫ്', undoBtn: 'റദ്ദാക്കുക', translatorTitle: 'ഇടപാട് വിവർത്തകൻ', status_approved: 'അംഗീകരിച്ചു', status_blocked: 'തടഞ്ഞു', status_flagged: 'ഫ്ലാഗ് ചെയ്തു' },
  consent: { title: 'സ്വകാര്യതയും നിയന്ത്രണവും', desc: 'ഡാറ്റ അനുമതികൾ നിയന്ത്രിക്കുക.', revoked: 'ഓഫ്', granted: 'ഓൺ' },
  profile: { title: 'എന്റെ പ്രൊഫൈൽ', desc: 'AI നിങ്ങളെ എങ്ങനെ കാണുന്നു.', score: 'വിശ്വാസ സ്കോർ', aiNote: 'AI അനലിസ്റ്റ് കുറിപ്പ്', correctionTitle: 'തെറ്റ് കാണുന്നുണ്ടോ?', correctionBtn: 'തിരുത്തുക' },
  banks: { ...DEFAULT_EN_TRANSLATIONS.banks, title: 'സാമ്പത്തിക ഉപദേഷ്ടാവ്', desc: 'ധാർമ്മിക വായ്പാ ഓപ്ഷനുകൾ കാണുക.', analyzeBtn: 'ലാഭ/നഷ്ട വിശകലനം', myAccount: 'എന്റെ അക്കൗണ്ട്', linkAccount: 'അക്കൗണ്ട് ലിങ്ക് ചെയ്യുക', balance: 'ബാലൻസ്', historyBtn: 'ചരിത്രം', save: 'സംരക്ഷിക്കുക', cancel: 'റദ്ദാക്കുക' },
  family: { ...DEFAULT_EN_TRANSLATIONS.family, title: 'കുടുംബ സുരക്ഷാ കാഴ്ച' },
  panic: { ...DEFAULT_EN_TRANSLATIONS.panic, title: 'അടിയന്തര മോഡ്', freeze: 'അക്കൗണ്ടുകൾ മരവിപ്പിക്കുക', locked: 'ലോക്ക് ചെയ്തു', helpline: 'ഹെൽപ്പ്ലൈൻ', police: 'പോലീസ്' },
  impact: { ...DEFAULT_EN_TRANSLATIONS.impact, title: 'ഇംപാക്റ്റ് ഡാഷ്ബോർഡ്', subtitle: 'സാമ്പത്തിക സ്ഥിതിവിവരക്കണക്കുകൾ.', underserved: 'ഉപയോക്താക്കൾ', fraudBlocked: 'തട്ടിപ്പ് തടഞ്ഞു', trustScore: 'ശരാശരി സ്കോർ', gdpTitle: 'ജിഡിപി ആഘാതം', gdpDesc: 'പ്രാദേശിക സമ്പദ്‌വ്യവസ്ഥ.' },
  ethics: { ...DEFAULT_EN_TRANSLATIONS.ethics, title: 'ധാർമ്മിക കേന്ദ്രം', subtitle: 'അൽഗോരിതത്തിന് പിന്നിലെ മനുഷ്യർ.', integrityStatus: 'മോഡൽ നില', healthy: 'ആരോഗ്യമുള്ള', biasDesc: 'പക്ഷപാതമില്ല.', readFull: 'മുഴുവൻ വായിക്കുക' },
  guide: { title: 'ഉപയോക്തൃ ഗൈഡ്', desc: 'സാമ്പത്തിക സുരക്ഷ പഠിക്കുക.' },
  b2b: { ...DEFAULT_EN_TRANSLATIONS.b2b, title: 'സാങ്കേതിക കോട്ട', subtitle: 'എന്റർപ്രൈസ് ആർക്കിടെക്ചർ.' }
};

// --- PUNJABI TRANSLATION ---
const PA_TRANSLATIONS = {
  ...DEFAULT_EN_TRANSLATIONS,
  nav: { home: 'ਘਰ', ledger: 'ਲੈਜ਼ਰ', consent: 'ਪਰਦੇਦਾਰੀ', profile: 'ਪ੍ਰੋਫਾਈਲ', banks: 'ਮੇਰਾ ਬੈਂਕ', guide: 'ਗਾਈਡ', transact: 'ਟ੍ਰਾਂਸਫਰ', family: 'ਪਰਿਵਾਰ', b2b: 'ਐਂਟਰਪ੍ਰਾਈਜ਼', impact: 'ਪ੍ਰਭਾਵ', ethics: 'ਨੈਤਿਕਤਾ' },
  hero: { ...DEFAULT_EN_TRANSLATIONS.hero, title: 'ਭਰੋਸੇ ਦਾ ਕਿਲ੍ਹਾ', subtitle: 'ਬੈਂਕਿੰਗ ਜਿੱਥੇ AI ਖੁਦ ਦੱਸਦਾ ਹੈ।', cta: 'ਸਕੋਰ ਦੇਖੋ', verifierTitle: 'ਕੀ ਇਹ ਅਸਲੀ ਹੈ?', verifierPlaceholder: 'ਲਿਖਤ, ਈਮੇਲ ਜਾਂ ਨੰਬਰ ਇੱਥੇ ਪੇਸਟ ਕਰੋ...', verifyBtn: 'ਜਾਂਚ ਕਰੋ', scamTitle: 'ਧੋਖਾਧੜੀ ਗੈਲਰੀ', savedTitle: 'ਗਰੁੜ ਦੁਆਰਾ ਸੁਰੱਖਿਅਤ' },
  ledger: { ...DEFAULT_EN_TRANSLATIONS.ledger, title: 'ਗਲਾਸ ਬਾਕਸ ਲੈਜ਼ਰ', desc: 'ਤੁਹਾਡਾ ਪਾਰਦਰਸ਼ੀ ਲੈਣ-ਦੇਣ ਦਾ ਇਤਿਹਾਸ।', explainBtn: 'ਇਹ ਕਿਉਂ ਹੋਇਆ?', addBtn: 'ਲੈਣ-ਦੇਣ ਕਰੋ', clearAll: 'ਸਾਫ਼ ਕਰੋ', offlineMode: 'ਔਫਲਾਈਨ ਮੋਡ', safetyHeader: 'ਸੁਰੱਖਿਅਤ ਕਿਵੇਂ ਰਹਿਣਾ ਹੈ', appHeader: 'ਸਿਫਾਰਸ਼ ਕੀਤੀ ਐਪ', safeToSpend: 'ਖਰਚਣ ਲਈ ਸੁਰੱਖਿਅਤ', coolingOff: 'ਕੂਲਿੰਗ ਆਫ', undoBtn: 'ਰੱਦ ਕਰੋ', translatorTitle: 'ਲੈਣ-ਦੇਣ ਅਨੁਵਾਦਕ', status_approved: 'ਮਨਜ਼ੂਰ', status_blocked: 'ਰੋਕਿਆ', status_flagged: 'ਨਿਸ਼ਾਨਬੱਧ' },
  consent: { title: 'ਪਰਦੇਦਾਰੀ ਅਤੇ ਨਿਯੰਤਰਣ', desc: 'ਡਾਟਾ ਅਨੁਮਤੀਆਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ।', revoked: 'ਬੰਦ', granted: 'ਚਾਲੂ' },
  profile: { title: 'ਮੇਰੀ ਪ੍ਰੋਫਾਈਲ', desc: 'ਦੇਖੋ AI ਤੁਹਾਨੂੰ ਕਿਵੇਂ ਦੇਖਦਾ ਹੈ।', score: 'ਭਰੋਸਾ ਸਕੋਰ', aiNote: 'AI ਨੋਟ', correctionTitle: 'ਕੁਝ ਗਲਤ ਹੈ?', correctionBtn: 'ਸਹੀ ਕਰੋ' },
  banks: { ...DEFAULT_EN_TRANSLATIONS.banks, title: 'ਵਿੱਤੀ ਸਲਾਹਕਾਰ', desc: 'ਨੈਤਿਕ ਕਰਜ਼ੇ ਦੇ ਵਿਕਲਪ ਵੇਖੋ।', analyzeBtn: 'ਲਾਭ/ਨੁਕਸਾਨ ਵਿਸ਼ਲੇਸ਼ਣ', myAccount: 'ਮੇਰਾ ਖਾਤਾ', linkAccount: 'ਖਾਤਾ ਲਿੰਕ ਕਰੋ', balance: 'ਬਕਾਇਆ', historyBtn: 'ਇਤਿਹਾਸ', save: 'ਸੇਵ ਕਰੋ', cancel: 'ਰੱਦ ਕਰੋ' },
  family: { ...DEFAULT_EN_TRANSLATIONS.family, title: 'ਪਰਿਵਾਰਕ ਸੁਰੱਖਿਆ ਦ੍ਰਿਸ਼' },
  panic: { ...DEFAULT_EN_TRANSLATIONS.panic, title: 'ਐਮਰਜੈਂਸੀ ਮੋਡ', freeze: 'ਖਾਤੇ ਫ੍ਰੀਜ਼ ਕਰੋ', locked: 'ਲਾਕ ਕੀਤਾ ਗਿਆ', helpline: 'ਹੈਲਪਲਾਈਨ', police: 'ਪੁਲਿਸ' },
  impact: { ...DEFAULT_EN_TRANSLATIONS.impact, title: 'ਪ੍ਰਭਾਵ ਡੈਸ਼ਬੋਰਡ', subtitle: 'ਆਰਥਿਕ ਅੰਕੜੇ.', underserved: 'ਉਪਭੋਗਤਾ', fraudBlocked: 'ਰੋਕੀ ਗਈ ਧੋਖਾਧੜੀ', trustScore: 'ਔਸਤ ਸਕੋਰ', gdpTitle: 'ਜੀਡੀਪੀ ਪ੍ਰਭਾਵ', gdpDesc: 'ਸਥਾਨਕ ਆਰਥਿਕਤਾ.' },
  ethics: { ...DEFAULT_EN_TRANSLATIONS.ethics, title: 'ਨੈਤਿਕਤਾ ਕੇਂਦਰ', subtitle: 'ਐਲਗੋਰਿਦਮ ਦੇ ਪਿੱਛੇ ਮਨੁੱਖ.', integrityStatus: 'ਮਾਡਲ ਸਥਿਤੀ', healthy: 'ਤੰਦਰੁਸਤ', biasDesc: 'ਕੋਈ ਪੱਖਪਾਤ ਨਹੀਂ.', readFull: 'ਪੂਰਾ ਪੜ੍ਹੋ' },
  guide: { title: 'ਯੂਜ਼ਰ ਗਾਈਡ', desc: 'ਵਿੱਤੀ ਸੁਰੱਖਿਆ ਬਾਰੇ ਜਾਣੋ.' },
  b2b: { ...DEFAULT_EN_TRANSLATIONS.b2b, title: 'ਤਕਨੀਕੀ ਕਿਲ੍ਹਾ', subtitle: 'ਐਂਟਰਪ੍ਰਾਈਜ਼ ਆਰਕੀਟੈਕਚਰ.' }
};

// --- ODIA TRANSLATION ---
const OR_TRANSLATIONS = {
  ...DEFAULT_EN_TRANSLATIONS,
  nav: { home: 'ମୂଳପୃଷ୍ଠା', ledger: 'ଲେଜର୍', consent: 'ଗୋପନୀୟତା', profile: 'ପ୍ରୋଫାଇଲ୍', banks: 'ମୋ ବ୍ୟାଙ୍କ', guide: 'ଗାଇଡ୍', transact: 'ଟ୍ରାନ୍ସଫର୍', family: 'ପରିବାର', b2b: 'ଏଣ୍ଟରପ୍ରାଇଜ୍', impact: 'ପ୍ରଭାବ', ethics: 'ନୀତି' },
  hero: { ...DEFAULT_EN_TRANSLATIONS.hero, title: 'ବିଶ୍ୱାସର ଦୁର୍ଗ', subtitle: 'ବ୍ୟାଙ୍କିଙ୍ଗ୍ ଯେଉଁଠାରେ AI ନିଜକୁ ବ୍ୟାଖ୍ୟା କରେ |', cta: 'ସ୍କୋର ଦେଖନ୍ତୁ', verifierTitle: 'ଏହା ପ୍ରକୃତ କି?', verifierPlaceholder: 'ଟେକ୍ସଟ୍, ଇମେଲ୍ କିମ୍ବା ନମ୍ବର ଏଠାରେ ପେଷ୍ଟ କରନ୍ତୁ...', verifyBtn: 'ଯାଞ୍ଚ କରନ୍ତୁ', scamTitle: 'ଠକେଇ ଗ୍ୟାଲେରୀ', savedTitle: 'ଗରୁଡ ଦ୍ୱାରା ସୁରକ୍ଷିତ' },
  ledger: { ...DEFAULT_EN_TRANSLATIONS.ledger, title: 'ଗ୍ଲାସ୍ ବକ୍ସ ଲେଜର୍', desc: 'ଆପଣଙ୍କର ସ୍ୱଚ୍ଛ କାରବାର ଇତିହାସ |', explainBtn: 'ଏହା କାହିଁକି ଘଟିଲା?', addBtn: 'କାରବାର କରନ୍ତୁ', clearAll: 'ସଫା କରନ୍ତୁ', offlineMode: 'ଅଫଲାଇନ୍ ମୋଡ୍', safetyHeader: 'କିପରି ସୁରକ୍ଷିତ ରହିବେ', appHeader: 'ସୁପାରିଶ କରାଯାଇଥିବା ଆପ୍', safeToSpend: 'ଖର୍ଚ୍ଚ କରିବାକୁ ସୁରକ୍ଷିତ', coolingOff: 'କୁଲିଂ ଅଫ୍', undoBtn: 'ବାତିଲ୍ କରନ୍ତୁ', translatorTitle: 'କାରବାର ଅନୁବାଦକ', status_approved: 'ଅନୁମୋଦିତ', status_blocked: 'ଅବରୁଦ୍ଧ', status_flagged: 'ଚିହ୍ନିତ' },
  consent: { title: 'ଗୋପନୀୟତା ଏବଂ ନିୟନ୍ତ୍ରଣ', desc: 'ଡାଟା ଅନୁମତି ପରିଚାଳନା କରନ୍ତୁ |', revoked: 'ବନ୍ଦ', granted: 'ଚାଲୁ' },
  profile: { title: 'ମୋର ପ୍ରୋଫାଇଲ୍', desc: 'AI ଆପଣଙ୍କୁ କିପରି ଦେଖେ ଦେଖନ୍ତୁ |', score: 'ବିଶ୍ୱାସ ସ୍କୋର', aiNote: 'AI ନୋଟ୍', correctionTitle: 'କିଛି ଭୁଲ୍ ଅଛି କି?', correctionBtn: 'ସଂଶୋଧନ କରନ୍ତୁ' },
  banks: { ...DEFAULT_EN_TRANSLATIONS.banks, title: 'ଆର୍ଥିକ ପରାମର୍ଶଦାତା', desc: 'ନୈତିକ ଋଣ ବିକଳ୍ପ ଦେଖନ୍ତୁ |', analyzeBtn: 'ଲାଭ/କ୍ଷତି ବିଶ୍ଳେଷଣ', myAccount: 'ମୋ ଆକାଉଣ୍ଟ୍', linkAccount: 'ଆକାଉଣ୍ଟ୍ ଲିଙ୍କ୍ କରନ୍ତୁ', balance: 'ବାଲାନ୍ସ', historyBtn: 'ଇତିହାସ', save: 'ସେଭ୍ କରନ୍ତୁ', cancel: 'ବାତିଲ୍ କରନ୍ତୁ' },
  family: { ...DEFAULT_EN_TRANSLATIONS.family, title: 'ପରିବାର ସୁରକ୍ଷା ଦୃଶ୍ୟ' },
  panic: { ...DEFAULT_EN_TRANSLATIONS.panic, title: 'ଜରୁରୀକାଳୀନ ମୋଡ୍', freeze: 'ଆକାଉଣ୍ଟ୍ ଫ୍ରିଜ୍ କରନ୍ତୁ', locked: 'ଲକ୍ ହୋଇଛି', helpline: 'ହେଲ୍ପଲାଇନ୍', police: 'ପୋଲିସ୍' },
  impact: { ...DEFAULT_EN_TRANSLATIONS.impact, title: 'ପ୍ରଭାବ ଡ୍ୟାସବୋର୍ଡ', subtitle: 'ଅର୍ଥନୈତିକ ପରିସଂଖ୍ୟାନ |', underserved: 'ଉପଭୋକ୍ତା', fraudBlocked: 'ଠକେଇ ରୋକାଯାଇଛି', trustScore: 'ହାରାହାରି ସ୍କୋର', gdpTitle: 'GDP ପ୍ରଭାବ', gdpDesc: 'ସ୍ଥାନୀୟ ଅର୍ଥନୀତି |' },
  ethics: { ...DEFAULT_EN_TRANSLATIONS.ethics, title: 'ନୈତିକତା କେନ୍ଦ୍ର', subtitle: 'ଆଲଗୋରିଦମ ପଛରେ ଥିବା ମଣିଷ |', integrityStatus: 'ମଡେଲ ସ୍ଥିତି', healthy: 'ସୁସ୍ଥ', biasDesc: 'କୌଣସି ପକ୍ଷପାତ ନାହିଁ |', readFull: 'ସମ୍ପୂର୍ଣ୍ଣ ପଢନ୍ତୁ' },
  guide: { title: 'ଉପଭୋକ୍ତା ଗାଇଡ୍', desc: 'ଆର୍ଥିକ ସୁରକ୍ଷା ବିଷୟରେ ଜାଣନ୍ତୁ |' },
  b2b: { ...DEFAULT_EN_TRANSLATIONS.b2b, title: 'ଯାନ୍ତ୍ରିକ ଦୁର୍ଗ', subtitle: 'ଏଣ୍ଟରପ୍ରାଇଜ୍ ଗ୍ରେଡ୍ ଭିତ୍ତିଭୂମି |' }
};

export const TRANSLATIONS = {
  [Language.EN]: DEFAULT_EN_TRANSLATIONS,
  [Language.HI]: HI_TRANSLATIONS,
  [Language.BN]: BN_TRANSLATIONS,
  [Language.MR]: MR_TRANSLATIONS,
  [Language.TA]: TA_TRANSLATIONS,
  [Language.TE]: TE_TRANSLATIONS,
  [Language.KN]: KN_TRANSLATIONS,
  [Language.GU]: GU_TRANSLATIONS,
  [Language.ML]: ML_TRANSLATIONS,
  [Language.PA]: PA_TRANSLATIONS,
  [Language.OR]: OR_TRANSLATIONS,
};

export const LANG_OPTIONS = [
  { id: Language.EN, label: 'English' },
  { id: Language.HI, label: 'Hindi (हिंदी)' },
  { id: Language.TA, label: 'Tamil (தமிழ்)' },
  { id: Language.BN, label: 'Bengali (বাংলা)' },
  { id: Language.MR, label: 'Marathi (मराठी)' },
  { id: Language.TE, label: 'Telugu (తెలుగు)' },
  { id: Language.KN, label: 'Kannada (ಕನ್ನಡ)' },
  { id: Language.OR, label: 'Odia (ଓଡ଼ିଆ)' },
  { id: Language.PA, label: 'Punjabi (ਪੰਜਾਬੀ)' },
  { id: Language.GU, label: 'Gujarati (ગુજરાતી)' },
  { id: Language.ML, label: 'Malayalam (മലയാളം)' },
];
