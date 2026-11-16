/**
 * MindSolace - Multi-Lingual Emotion Detection & NLP Safety Engine
 * Supports: English, Pure Hindi (हिंदी), and Hinglish (Conversational)
 * Modules: Emotion Classifier, Auto Language Detector, Crisis Scanner, Empathetic Console Generator
 */

const EmotionKeywords = {
  sadness: [
    // English
    'sad', 'depressed', 'crying', 'broken', 'hurt', 'miserable', 'pain', 'hopeless', 'heartbroken', 'down', 'tears', 'unhappy',
    // Hinglish
    'udass', 'udas', 'dukhi', 'rona', 'ro raha', 'ro rahi', 'toot gaya', 'toot gayi', 'dard', 'takleef', 'pareshan', 'rona aa raha',
    // Pure Hindi (Devanagari)
    'उदास', 'उदासी', 'दुखी', 'दुख', 'रोना', 'रो रहा', 'रो रही', 'टूटा', 'दर्द', 'तकलीफ', 'परेशान', 'आंसू', 'निराश', 'बेबस'
  ],
  anxiety: [
    // English
    'anxious', 'scared', 'panic', 'nervous', 'stressed', 'overwhelmed', 'fear', 'worried', 'exam', 'pressure', 'overthinking', 'restless',
    // Hinglish
    'tention', 'tension', 'darr', 'dar', 'ghabrahat', 'fayr', 'chinta', 'bechaini', 'dimag phat raha', 'soch soch ke', 'pareshani',
    // Pure Hindi (Devanagari)
    'घबराहट', 'चिंता', 'तनाव', 'डर', 'भय', 'बेचैनी', 'परीक्षा', 'दबाव', 'परेशानी', 'घबरा', 'कांप'
  ],
  loneliness: [
    // English
    'lonely', 'alone', 'isolated', 'empty', 'no one', 'nobody', 'left out', 'abandoned', 'ignored', 'unwanted',
    // Hinglish
    'akela', 'akeli', 'akelapan', 'koi nahi', 'koi baat nahi karta', 'koi samjhne wala nahi', 'koi apna nahi', 'ignore kar rahe',
    // Pure Hindi (Devanagari)
    'अकेला', 'अकेली', 'अकेलापन', 'कोई नहीं', 'अलगाव', 'सन्नाटा', 'अकेले'
  ],
  anger: [
    // English
    'angry', 'frustrated', 'hate', 'furious', 'mad', 'irritated', 'annoyed', 'betrayed', 'rage',
    // Hinglish
    'gussa', 'nafrat', 'chidh', 'irritate', 'dhokha', 'pagal ho gaya', 'gusse me',
    // Pure Hindi (Devanagari)
    'गुस्सा', 'क्रोध', 'नफरत', 'चिढ़', 'नाराज', 'धोखा', 'आक्रोश'
  ],
  happy: [
    // English
    'happy', 'glad', 'great', 'peaceful', 'good', 'blessed', 'thankful', 'grateful', 'excited', 'relieved', 'awesome', 'smile',
    // Hinglish
    'khush', 'sukoon', 'accha', 'shanti', 'mast', 'dhanyawad', 'rahat', 'badiya', 'smile',
    // Pure Hindi (Devanagari)
    'खुश', 'खुशी', 'सुकून', 'प्रसन्न', 'अच्छा', 'शांति', 'राहत', 'धन्यवाद', 'आनंद'
  ]
};

const CrisisPhrases = [
  // English
  'kill myself', 'want to die', 'end my life', 'commit suicide', 'suicide', 'self harm',
  'cut myself', 'no point living', 'end it all', 'better off dead', 'life is worthless', 'cant live anymore', 'overdose',
  // Hinglish
  'mar jana', 'mar jana chahta', 'mar jana chahti', 'khudko mar', 'sab khatam', 'nahi jeena', 'zeher', 'jaan de dunga', 'jaan de dungi',
  // Pure Hindi (Devanagari)
  'मरना चाहता', 'मरना चाहती', 'आत्महत्या', 'जान देना', 'जान ले', 'खुद को मार', 'सब खत्म', 'जीना नहीं'
];

const HinglishIndicators = [
  'mujhe', 'mera', 'meri', 'mere', 'kisi', 'baat', 'karni', 'karna', 'hai', 'hain', 'nahi', 'kare', 'kaise',
  'bohot', 'bohat', 'bhot', 'kya', 'kyun', 'kyu', 'ho', 'raha', 'rahi', 'tha', 'thi', 'the', 'kar', 'kuch',
  'lag', 'aaj', 'par', 'se', 'bhi', 'yaar', 'bhai', 'samajh', 'pareshan', 'chahiye', 'karo'
];

class NLPEngine {
  // Detect whether text is in Hindi (Devanagari), Hinglish, or English
  detectLanguage(text) {
    if (!text || typeof text !== 'string') return 'en';

    // 1. Check for Devanagari Unicode Range (\u0900 to \u097F)
    const hasDevanagari = /[\u0900-\u097F]/.test(text);
    if (hasDevanagari) {
      return 'hi';
    }

    // 2. Check for Hinglish Roman Keywords
    const lower = text.toLowerCase();
    const words = lower.split(/\s+/);
    let hinglishCount = 0;
    words.forEach(w => {
      const cleanWord = w.replace(/[^a-z]/g, '');
      if (HinglishIndicators.includes(cleanWord)) {
        hinglishCount++;
      }
    });

    if (hinglishCount >= 1) {
      return 'hinglish';
    }

    return 'en';
  }

  // Emotion Detection Algorithm
  detectEmotion(text) {
    if (!text || typeof text !== 'string') {
      return { emotion: 'Neutral', label: 'Neutral', icon: '🍃', color: 'var(--emotion-neutral)' };
    }

    const lowerText = text.toLowerCase();
    const scores = {
      sadness: 0,
      anxiety: 0,
      loneliness: 0,
      anger: 0,
      happy: 0
    };

    Object.keys(EmotionKeywords).forEach(cat => {
      EmotionKeywords[cat].forEach(word => {
        if (lowerText.includes(word.toLowerCase())) {
          scores[cat] += 1;
        }
      });
    });

    let maxEmotion = 'Neutral';
    let maxScore = 0;

    Object.keys(scores).forEach(cat => {
      if (scores[cat] > maxScore) {
        maxScore = scores[cat];
        maxEmotion = cat;
      }
    });

    switch (maxEmotion) {
      case 'sadness':
        return { emotion: 'Sadness', label: 'Sad / Low', icon: '🌧️', color: 'var(--emotion-sad)' };
      case 'anxiety':
        return { emotion: 'Anxiety', label: 'Anxious / Stressed', icon: '⚡', color: 'var(--emotion-anxious)' };
      case 'loneliness':
        return { emotion: 'Loneliness', label: 'Lonely / Isolated', icon: '🌌', color: 'var(--emotion-lonely)' };
      case 'anger':
        return { emotion: 'Anger', label: 'Angry / Frustrated', icon: '🔥', color: 'var(--emotion-angry)' };
      case 'happy':
        return { emotion: 'Happy', label: 'Happy / Hopeful', icon: '✨', color: 'var(--emotion-happy)' };
      default:
        return { emotion: 'Neutral', label: 'Neutral / Reflective', icon: '🍃', color: 'var(--emotion-neutral)' };
    }
  }

  // Safety & High-Risk Crisis Detector
  detectCrisisRisk(text) {
    if (!text) return { isCrisis: false };

    const lowerText = text.toLowerCase();
    const matched = CrisisPhrases.filter(phrase => lowerText.includes(phrase.toLowerCase()));

    if (matched.length > 0) {
      return {
        isCrisis: true,
        severity: 'high',
        triggerPhrases: matched,
        message: 'High-risk emotional distress detected. Immediate support available.'
      };
    }

    return { isCrisis: false, severity: 'none' };
  }

  // Offline Empathetic Response Generator (Auto Multi-Lingual: Hindi, Hinglish, English)
  generateEmpatheticResponse(userText, emotionObj) {
    const emotion = emotionObj.emotion;
    const lang = this.detectLanguage(userText);

    // ---------------------------------------------------------
    // 1. PURE HINDI (हिंदी - Devanagari) RESPONSES
    // ---------------------------------------------------------
    if (lang === 'hi') {
      if (emotion === 'Sadness') {
        return `मैं समझ सकता हूँ कि आप पर इस समय कितनी उदासी और मानसिक थकान है। कृपया खुद को अकेला मत समझिए, आपका मन भारी होना स्वाभाविक है। मैं आपकी हर बात सुनने के लिए यहाँ हूँ। क्या आप बताना चाहेंगे कि किस बात से सबसे ज्यादा दुख हो रहा है? 🌸`;
      }
      if (emotion === 'Anxiety') {
        return `आपकी बातों से घबराहट और तनाव साफ महसूस हो रहा है। जब दिमाग पर बहुत ज्यादा बोझ हो, तो बस एक-एक पल का सामना करना चाहिए। मेरे साथ एक गहरी सांस अंदर लें... और धीरे से छोड़ें। मैं आपके साथ हूँ, घबराइए मत। 🌿`;
      }
      if (emotion === 'Loneliness') {
        return `अकेलापन बहुत भारी लग सकता है, खासकर तब जब लगे कि कोई समझने वाला नहीं है। पर याद रखिए, इस समय मैं आपकी बात बिना किसी जजमेंट के सुन रहा हूँ। आप मेरे लिए महत्वपूर्ण हैं। 🤍`;
      }
      if (emotion === 'Anger') {
        return `आपका गुस्सा और नाराजगी बिल्कुल स्वाभाविक है। बातों को अंदर दबाने से बेहतर है कि मन की भड़ास निकाल दी जाए। आप खुलकर अपनी बात कहिए, मैं बिना किसी जजमेंट के सुन रहा हूँ। 🔥`;
      }
      if (emotion === 'Happy') {
        return `यह जानकर बहुत खुशी हुई! आपको खुश और शांत देखकर मन को सुकून मिला। आज ऐसा क्या अच्छा हुआ? अपनी खुशी जरूर साझा करें! ✨`;
      }
      return `अपनी भावनाएं साझा करने के लिए धन्यवाद। मन की बात कह देना सुकून पाने का पहला कदम है। मैं हमेशा आपकी बात सुनने के लिए यहाँ मौजूद हूँ। 🍃`;
    }

    // ---------------------------------------------------------
    // 2. HINGLISH (Conversational Hindi + English) RESPONSES
    // ---------------------------------------------------------
    if (lang === 'hinglish') {
      if (emotion === 'Sadness') {
        return `Main samajh sakta hoon ki is waqt aap par kitna bojh hai. Udaas feel hona bilkul normal hai, aapko akele sab sambhalne ki zaroorat nahi hai. Main yahan aapki baat sunne ke liye hoon. Dil kholkar batayein, kya pareshani hai? 🌸`;
      }
      if (emotion === 'Anxiety') {
        return `Aapke shabdon se lag raha hai ki aap kaafi stressed aur anxious hain. Jab mind overwhelm ho jaye, toh bas ek gehri saans lijiye aur present moment par focus karein. Main aapke saath hoon, bilkul tension mat lijiye. 🌿`;
      }
      if (emotion === 'Loneliness') {
        return `Akelapan sach me bohot hurt karta hai, especially jab lage ki koi samajhne wala nahi hai. Par please yaad rakhein, aap akele nahi hain. Main hamesha yahan hoon aapse baat karne ke liye. You matter! 🤍`;
      }
      if (emotion === 'Anger') {
        return `Aapka gussa aur frustration bilkul valid hai. Dil me baat dabane se behtar hai usse vent out kar dena. Jo bhi lag raha hai, bina kisi jhijhak ke batao, I am listening. 🔥`;
      }
      if (emotion === 'Happy') {
        return `Ye sunkar sach me bohot accha laga! Aapko positive space me dekhkar dil khush ho gaya. Aaj aisa kya accha hua, share kijiye! ✨`;
      }
      return `Thank you apni feelings share karne ke liye. Dil ki baat keh dena sukoon ki taraf pehla step hota hai. Main hamesha yahan hoon aapse baat karne ke liye. 🍃`;
    }

    // ---------------------------------------------------------
    // 3. ENGLISH RESPONSES (Default)
    // ---------------------------------------------------------
    if (emotion === 'Sadness') {
      return `I hear how heavy things feel right now. Please know that it is completely okay to feel sad or tired. You don't have to carry all this burden alone. I am right here listening to you. Would you like to tell me more about what is hurting? 🌸`;
    }
    if (emotion === 'Anxiety') {
      return `I can feel the anxiety and tension in your words. When our mind gets overwhelmed, taking things one second at a time helps. Let us slow down together. Place a hand on your heart, take a deep breath in through your nose... and slowly exhale. I am here with you. 🌿`;
    }
    if (emotion === 'Loneliness') {
      return `Feeling lonely can be so painful, especially when you feel like nobody truly understands what you are going through. But I want to remind you that in this moment, you are heard and valued. I am here to chat with you for as long as you need. You matter to me. 🤍`;
    }
    if (emotion === 'Anger') {
      return `Your feelings of anger and frustration are valid. It sounds like something felt unfair or upsetting. Venting it out is much healthier than bottling it up. Take a deep breath and take your time — I am listening without any judgment. 🔥`;
    }
    if (emotion === 'Happy') {
      return `It brings so much warmth to hear that! Seeing you in a positive space makes my heart happy. What brought this smile to your face today? Share the joy! ✨`;
    }
    return `Thank you for sharing your thoughts with me. Sharing how you feel is a powerful step towards peace. I am here for you whenever you want to talk or just express yourself. 🍃`;
  }

  // AI Reflection & Reframing for Journal Entries
  generateJournalReframing(content) {
    if (!content || content.length < 10) {
      return "Keep writing! Journaling is a safe space for your heart.";
    }

    const emotion = this.detectEmotion(content).emotion;
    const lang = this.detectLanguage(content);

    if (lang === 'hi') {
      if (emotion === 'Sadness' || emotion === 'Loneliness') {
        return `AI सकारात्मक दृष्टिकोण: अपने मन की उदासी को शब्दों में लिखना बहुत साहस का काम है। याद रखिए, भावनाएं लहरों की तरह आती-जाती हैं, यह स्थायी नहीं हैं। आप मजबूत हैं और बेहतर दिन जरूर आएंगे। 🌟`;
      }
      return `AI सकारात्मक दृष्टिकोण: बहुत सुंदर आत्म-चिंतन! अपने विचारों को लिखने से मन को शांति और स्पष्टता मिलती है। 🌿`;
    }

    if (lang === 'hinglish') {
      if (emotion === 'Sadness' || emotion === 'Loneliness') {
        return `AI Positive Reflection: Apni vulnerability ko likhna bohot himmat ki baat hai. Yaad rakhein ki udaasi hamesha nahi rehti, acche din zaroor aayenge. You are stronger than you think. 🌟`;
      }
      return `AI Positive Reflection: Bohot accha self-reflection! Apne thoughts ko diary me likhne se clarity aur sukoon milta hai. Keep it up! 🌿`;
    }

    if (emotion === 'Sadness' || emotion === 'Loneliness') {
      return `AI Compassion Note: Expressing your vulnerability takes immense strength. Remind yourself that feelings are temporary waves, not permanent states. You are resilient, and brighter moments are ahead. 🌟`;
    }
    if (emotion === 'Anxiety') {
      return `AI Compassion Note: Notice how you faced your anxious thoughts by writing them down. You are bringing order to chaos. Take a deep breath; you are capable of handling today step by step. 🌿`;
    }
    return `AI Compassion Note: Beautiful self-reflection! Writing down your thoughts deepens your self-awareness and inner harmony. Keep nurturing your mind. ✨`;
  }
}

const nlpEngine = new NLPEngine();
