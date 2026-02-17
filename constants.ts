import { ExamRequirement, Language } from './types';

export const EXAM_PRESETS: ExamRequirement[] = [
  {
    id: 'custom',
    name: 'Custom Size (Manual Input)',
    category: 'Custom',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 300, height: 150, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  // --- CENTRAL EXAMS ---
  {
    id: 'upsc',
    name: 'UPSC (CSE, NDA, CDS, CAPF)',
    category: 'Central',
    // UPSC requires square 350x350 for both in recent notifications
    photo: { width: 350, height: 350, minKB: 20, maxKB: 300, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 350, minKB: 20, maxKB: 300, format: 'jpg', resizeMode: 'contain' } 
  },
  {
    id: 'ssc',
    name: 'SSC (CGL, CHSL, MTS, GD, JE)',
    category: 'Central',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 400, height: 200, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'ibps',
    name: 'IBPS (PO, Clerk, SO, RRB)',
    category: 'Central',
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'sbi',
    name: 'SBI (PO, Clerk)',
    category: 'Central',
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'rbi',
    name: 'RBI (Grade B, Assistant)',
    category: 'Central',
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'lic',
    name: 'LIC AAO / ADO',
    category: 'Central',
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'rrb_railway',
    name: 'RRB Railways (NTPC, Group D, ALP)',
    category: 'Central',
    photo: { width: 320, height: 400, minKB: 15, maxKB: 40, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 320, height: 120, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'epfo',
    name: 'EPFO (SSA, Assistant)',
    category: 'Central',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'indiapost',
    name: 'India Post GDS',
    category: 'Central',
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'ctet',
    name: 'CTET / TET (Teachers)',
    category: 'Central',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 3, maxKB: 30, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'fci',
    name: 'FCI (Food Corporation)',
    category: 'Central',
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'drdo',
    name: 'DRDO / ISRO / BARC',
    category: 'Central',
    photo: { width: 350, height: 450, minKB: 15, maxKB: 40, format: 'jpg', resizeMode: 'cover' }, 
    signature: { width: 350, height: 150, minKB: 10, maxKB: 40, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'niacl',
    name: 'NIACL (AO, Assistant)',
    category: 'Central',
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },

  // --- ENTRANCE EXAMS ---
  {
    id: 'jee',
    name: 'JEE Main & Advanced',
    category: 'Entrance',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 200, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 4, maxKB: 30, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'neet',
    name: 'NEET UG/PG',
    category: 'Entrance',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 200, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 4, maxKB: 30, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'ugc_net',
    name: 'UGC NET / CSIR NET',
    category: 'Entrance',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 200, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 4, maxKB: 30, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'gate',
    name: 'GATE',
    category: 'Entrance',
    photo: { width: 480, height: 640, minKB: 5, maxKB: 200, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 400, height: 150, minKB: 5, maxKB: 150, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'cat',
    name: 'CAT (IIM)',
    category: 'Entrance',
    photo: { width: 350, height: 450, minKB: 30, maxKB: 1000, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 30, maxKB: 80, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'xat',
    name: 'XAT',
    category: 'Entrance',
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'clat',
    name: 'CLAT',
    category: 'Entrance',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'nift',
    name: 'NIFT',
    category: 'Entrance',
    photo: { width: 350, height: 450, minKB: 50, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 50, maxKB: 100, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'nid',
    name: 'NID',
    category: 'Entrance',
    photo: { width: 350, height: 450, minKB: 50, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 50, maxKB: 100, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'icai',
    name: 'ICAI (CA Exams)',
    category: 'Entrance',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },

  // --- DEFENCE EXAMS ---
  {
    id: 'agniveer',
    name: 'Indian Army Agniveer',
    category: 'Defence',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 5, maxKB: 10, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'navy',
    name: 'Indian Navy',
    category: 'Defence',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'afcat',
    name: 'Indian Air Force (AFCAT)',
    category: 'Defence',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'paramilitary',
    name: 'CRPF / BSF / CISF / ITBP / SSB',
    category: 'Defence',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },

  // --- STATE PSC EXAMS ---
  {
    id: 'uppsc',
    name: 'UPPSC (Uttar Pradesh)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'bpsc',
    name: 'BPSC (Bihar)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 25, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 15, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'rpsc',
    name: 'RPSC (Rajasthan)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 50, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'mpsc',
    name: 'MPSC (Maharashtra)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'mppsc',
    name: 'MPPSC (Madhya Pradesh)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 100, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'gpsc',
    name: 'GPSC / GSSSB (Gujarat)',
    category: 'State PSC',
    photo: { width: 280, height: 360, minKB: 5, maxKB: 15, format: 'jpg', resizeMode: 'cover' }, // OJAS Standard
    signature: { width: 280, height: 120, minKB: 5, maxKB: 15, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'tnpsc',
    name: 'TNPSC (Tamil Nadu)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'kpsc',
    name: 'KPSC (Karnataka)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 25, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'wbpsc',
    name: 'WBPSC (West Bengal)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'appsc',
    name: 'APPSC (Andhra Pradesh)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 30, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'hpsc',
    name: 'HPSC (Haryana)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'jpsc',
    name: 'JPSC (Jharkhand)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 15, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'cgpsc',
    name: 'CGPSC (Chhattisgarh)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 100, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'hppsc',
    name: 'HPPSC (Himachal Pradesh)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 100, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'ppsc',
    name: 'PPSC (Punjab)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  }
];

export const TRANSLATIONS = {
  en: {
    title: 'Exam Photo & Sign Resizer Pro',
    subtitle: 'Resize, Compress & Crop for Indian Exams',
    selectExam: 'Select Exam / Application',
    photoParams: 'Photo Parameters',
    signParams: 'Signature Parameters',
    uploadPhoto: 'Upload Photo',
    uploadSign: 'Upload Signature',
    dragDrop: 'Drag & Drop or Click to Upload',
    width: 'Width',
    height: 'Height',
    maxSize: 'Max Size',
    minSize: 'Min Size',
    compress: 'Compress & Resize',
    download: 'Download',
    preview: 'Preview',
    processing: 'Processing...',
    success: 'Ready to Download!',
    sizeError: 'File is too large, compressing harder...',
    faq: 'FAQ',
    blog: 'Exam Guide',
    disclaimer: 'Disclaimer: We are not affiliated with any government body. Always verify official notifications.',
    home: 'Home',
    settings: 'Advanced Settings',
    grayscale: 'Convert to Black & White',
    autoCrop: 'Auto Crop to Aspect Ratio',
    pixels: 'px',
    kb: 'KB',
    original: 'Original',
    result: 'Result',
    error_compression: 'Could not compress to target size. Try a smaller image.',
    ad_placeholder: 'Advertisement Space',
    whyUse: 'Why use ExamResizer?',
    whyUseText: 'We provide the fastest and most secure way to resize images for Indian government exams. Unlike other tools, your photos are processed 100% on your device and never uploaded to any server.',
    features: 'Key Features',
    addDate: 'Add Name & Date (for SSC etc.)',
    name: 'Name',
    date: 'Date of Photo',
    customSize: 'Custom Dimensions',
  },
  hi: {
    title: 'परीक्षा फोटो और हस्ताक्षर रिसाइज़र प्रो',
    subtitle: 'भारतीय परीक्षाओं के लिए आकार बदलें और कंप्रेस करें',
    selectExam: 'परीक्षा / आवेदन चुनें',
    photoParams: 'फोटो पैरामीटर',
    signParams: 'हस्ताक्षर पैरामीटर',
    uploadPhoto: 'फोटो अपलोड करें',
    uploadSign: 'हस्ताक्षर अपलोड करें',
    dragDrop: 'खींचें और छोड़ें या अपलोड करने के लिए क्लिक करें',
    width: 'चौड़ाई',
    height: 'ऊंचाई',
    maxSize: 'अधिकतम आकार',
    minSize: 'न्यूनतम आकार',
    compress: 'कंप्रेस और रिसाइज करें',
    download: 'डाउनलोड करें',
    preview: 'पूर्वावलोकन',
    processing: 'प्रोसेसिंग...',
    success: 'डाउनलोड के लिए तैयार!',
    sizeError: 'फ़ाइल बहुत बड़ी है, और कंप्रेस की जा रही है...',
    faq: 'सामान्य प्रश्न',
    blog: 'परीक्षा गाइड',
    disclaimer: 'अस्वीकरण: हम किसी भी सरकारी निकाय से संबद्ध नहीं हैं। हमेशा आधिकारिक अधिसूचनाओं की पुष्टि करें।',
    home: 'होम',
    settings: 'एडवांस सेटिंग्स',
    grayscale: 'ब्लैक एंड व्हाइट में बदलें',
    autoCrop: 'ऑटो क्रॉप (अनुपात अनुसार)',
    pixels: 'px',
    kb: 'KB',
    original: 'मूल',
    result: 'परिणाम',
    error_compression: 'लक्ष्य आकार में कंप्रेस नहीं किया जा सका। छोटी छवि का प्रयास करें।',
    ad_placeholder: 'विज्ञापन स्थान',
    whyUse: 'ExamResizer क्यों चुनें?',
    whyUseText: 'हम भारतीय सरकारी परीक्षाओं के लिए छवियों का आकार बदलने का सबसे तेज़ और सुरक्षित तरीका प्रदान करते हैं। अन्य उपकरणों के विपरीत, आपकी तस्वीरें 100% आपके डिवाइस पर संसाधित होती हैं और कभी भी किसी सर्वर पर अपलोड नहीं की जाती हैं।',
    features: 'मुख्य विशेषताएं',
    addDate: 'नाम और तारीख जोड़ें (SSC आदि के लिए)',
    name: 'नाम',
    date: 'फोटो की तारीख',
    customSize: 'कस्टम डाइमेंशन',
  }
};

export const FAQ_DATA = [
  {
    q: "Is this tool safe to use for sensitive documents?",
    a: "Yes! All processing happens locally on your device (Client-Side). Your photos and signatures are NEVER uploaded to our servers."
  },
  {
    q: "Does it support UPSC specific requirements?",
    a: "Yes, we have a dedicated preset for UPSC which adjusts dimensions to 350x350px (approx) and keeps file size between 20KB and 300KB."
  },
  {
    q: "Why is my signature looking blurry?",
    a: "If the source image is very small, resizing it up might cause blurriness. Try to take a photo of your signature in good lighting with a higher resolution camera."
  },
  {
    q: "Can I use this for exams not listed?",
    a: "Absolutely. You can use the 'Custom' sliders or pick the closest matching exam preset."
  }
];

export const SEO_CONTENT = {
  intro: {
    title: "Best Online Photo & Signature Resizer for Indian Exams",
    text: "Applying for government jobs like UPSC, SSC, IBPS, or entrance exams like JEE and NEET requires images to be in a very specific format. Most applications get rejected due to incorrect dimensions or file sizes. Exam Photo & Sign Resizer Pro is a free utility designed specifically for Indian students to solve this problem."
  },
  exams: [
    {
      title: "Resize Photo for UPSC (CSE, NDA, CDS)",
      content: "The Union Public Service Commission (UPSC) has updated its guidelines. Photos must now be 350x350 pixels. Our tool automatically crops your photo to a square format and compresses it between 20KB and 300KB."
    },
    {
      title: "SSC Photo & Signature Compressor",
      content: "For SSC CGL, CHSL, and MTS, the photo size should be 20KB to 50KB with dimensions of 3.5cm x 4.5cm. Signatures must be 10KB to 20KB. Use our SSC preset to get the exact output instantly."
    },
    {
      title: "IBPS & SBI PO Image Resizer",
      content: "Banking exams require specific file names and sizes. IBPS signatures must not be in capital letters and should be between 10KB and 20KB. Our tool handles the resizing and compression while maintaining clarity."
    }
  ],
  features: [
    "Automatic Aspect Ratio Locking (Passport Size)",
    "Exact KB Compression (e.g., reduce 2MB to 20KB)",
    "Signature Cleaner (Grayscale converter)",
    "Privacy First (No Server Uploads)",
    "Mobile Friendly (Works on Android & iPhone)",
    "Add Name & Date on Photo for SSC"
  ]
};