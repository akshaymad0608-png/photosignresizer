import { ExamRequirement } from './types';

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
    id: 'kvs_nvs',
    name: 'KVS / NVS (Teaching & Non-Teaching)',
    category: 'Central',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'nabard_sebi',
    name: 'NABARD / SEBI (Grade A & B)',
    category: 'Central',
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'aai',
    name: 'AAI (Airports Authority of India)',
    category: 'Central',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
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
    id: 'clat',
    name: 'CLAT',
    category: 'Entrance',
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
    id: 'smc',
    name: 'SMC (સુરત મહાનગરપાલિકા)',
    category: 'State PSC',
    photo: { width: 500, height: 500, minKB: 10, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 750, height: 250, minKB: 5, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'ojas',
    name: 'GSSSB / OJAS (ગુજરાત)',
    category: 'State PSC',
    photo: { width: 280, height: 360, minKB: 5, maxKB: 15, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 280, height: 120, minKB: 5, maxKB: 15, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'gpsc',
    name: 'GPSC (ગુજરાત જાહેર સેવા આયોગ)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'gujarat_police',
    name: 'Gujarat Police LRD/PSI (ગુજરાત પોલીસ)',
    category: 'State PSC',
    photo: { width: 280, height: 360, minKB: 5, maxKB: 15, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 280, height: 120, minKB: 5, maxKB: 15, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'gujarat_high_court',
    name: 'Gujarat High Court (ગુજરાત હાઈકોર્ટ)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'gseb_tet_tat',
    name: 'GSEB TET/TAT (ગુજરાત શિક્ષક યોગ્યતા કસોટી)',
    category: 'State PSC',
    photo: { width: 280, height: 360, minKB: 5, maxKB: 15, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 280, height: 120, minKB: 5, maxKB: 15, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'hpsc',
    name: 'HPSC (Haryana)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'ppsc',
    name: 'PPSC (Punjab)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 10, maxKB: 40, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 30, format: 'jpg', resizeMode: 'contain' }
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
    name: 'KPSC (Karnataka / Kerala)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'appsc_tspsc',
    name: 'APPSC / TSPSC',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'wbpsc',
    name: 'WBPSC (West Bengal)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 20, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'opsc',
    name: 'OPSC (Odisha)',
    category: 'State PSC',
    photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 350, height: 150, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'gpsc_ojas',
    name: 'GPSC (Gujarat OJAS)',
    category: 'State PSC',
    photo: { width: 170, height: 170, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 170, height: 170, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'gsssb',
    name: 'GSSSB (Gujarat)',
    category: 'State PSC',
    photo: { width: 170, height: 170, minKB: 15, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 170, height: 170, minKB: 15, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  },
  {
    id: 'gujarat_police_ojas',
    name: 'Gujarat Police (LRD/PSI)',
    category: 'State PSC',
    photo: { width: 170, height: 170, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'cover' },
    signature: { width: 170, height: 170, minKB: 10, maxKB: 50, format: 'jpg', resizeMode: 'contain' }
  }
];

export const TRANSLATIONS = {
  en: {
    title: 'PHOTORESIZER',
    subtitle: 'Resize, Compress & Crop passport photos and signatures for UPSC, SSC, IBPS, NEET, and other Indian Govt Exams',
    selectExam: 'Select Exam / Application',
    photoParams: 'Photo Parameters',
    signParams: 'Signature Parameters',
    uploadPhoto: 'Upload Photo',
    uploadSign: 'Upload Signature',
    dragDrop: 'Drag & Drop or Click to Upload',
    recentResizes: 'Recent Resizes',
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
    photoResizer: 'Photo Resizer',
    latestJobs: 'Latest Jobs',
    examLinks: 'Exam Links',
    freeTools: 'All Files Converter',
    settings: 'Advanced Settings',
    grayscale: 'Convert to Black & White',
    autoCrop: 'Auto Crop to Aspect Ratio',
    pixels: 'px',
    kb: 'KB',
    original: 'Original',
    result: 'Result',
    error_compression: 'Could not compress to target size. Try a smaller image.',
    ad_placeholder: 'Advertisement Space',
    whyUse: 'Why use PHOTORESIZER?',
    whyUseText: 'We provide the fastest and most secure way to resize images for Indian government exams. Unlike other tools, your photos are processed 100% on your device and never uploaded to any server.',
    features: 'Key Features',
    addDate: 'Add Name & Date (for SSC etc.)',
    name: 'Name',
    date: 'Date of Photo',
    customSize: 'Custom Dimensions',
    advancedAdjustments: 'Advanced Adjustments',
    brightness: 'Brightness',
    contrast: 'Contrast',
    resetAdjustments: 'Reset Adjustments',
    downloadPDF: 'Download as PDF',
    resetAll: 'Start over',

    // Hero
    heroEyebrow: 'Photo & signature for Indian government exam forms',
    heroTitleA: 'Your form wants an exact size.',
    heroTitleB: 'Get it on the first upload.',
    heroBody:
      'Pick your exam, add your photo and signature, and download files that already match the pixel and KB limits in the notification. Everything runs inside your browser, so nothing is sent anywhere.',
    trustPrivate: 'Never uploaded to a server',
    trustOffline: 'Works without internet after first load',
    trustFree: 'Free, no sign-up',
    jumpTo: 'Jump to an exam',

    // Spec ticket
    specTicket: 'Requirement sheet',
    fileSize: 'File size',
    fit: 'Fit',
    copySpecs: 'Copy these specs',
    copied: 'Copied',

    // Uploaders
    photoSlot: 'Photograph',
    signSlot: 'Signature',
    photoHint: 'Face straight on, plain light background, shoulders in frame.',
    signHint: 'Sign on white paper with a dark pen, then photograph it flat.',
    affixHere: 'Affix here',
    takePhoto: 'Camera',
    chooseFile: 'Choose file',
    dropOrPaste: 'or drop a file here · Ctrl+V to paste',
    notUploaded: 'Empty',
    loaded: 'Loaded',
    crop: 'Crop',
    applyCrop: 'Apply crop',
    cancel: 'Cancel',
    remove: 'Remove',
    rotateLeft: 'Rotate left',
    rotateRight: 'Rotate right',
    grayscaleNote: 'Some forms only accept black and white signatures.',
    removeBg: 'Remove background',
    removeBgNote: 'Runs a model in your browser. Takes a few seconds.',

    // Actions
    makeFiles: 'Make my files',
    remaking: 'Working…',
    waitingForUpload: 'Add a photo or signature to begin',
    resultPending: 'Your result appears here',
    resultPendingNote: 'Nothing is processed until you press the button.',

    // Extras
    extrasHeading: 'Also useful',
    extrasBody: 'The steps people usually finish by hand afterwards.',
    combinedTitle: 'Photo + signature in one JPG',
    combinedBody: 'One white image with the photo above the signature, the way some forms ask for it.',
    printTitle: 'Print sheet',
    printBody: 'A 4×6 inch sheet tiled with true-size copies and cut guides, for the print shop.',
    pdfTitle: 'PDF of both',
    pdfBody: 'A single PDF you can keep with your application record.',
    needBoth: 'Add both a photo and a signature to build this.',
    needPhoto: 'Add a photo to build this.',
    build: 'Build',
    building: 'Building…',
    copiesWord: 'copies',
    sheetFailed: 'Could not build that sheet. Try processing your images again.',
    close: 'Close',

    yourFiles: 'Your files',

    // Nav labels
    navResize: 'Resize',
    navTools: 'Tools',
    navJobs: 'Jobs',
    navLinks: 'Links',
    navGuide: 'Guide',

    footerBlurb:
      'A resizer built around the actual limits printed in Indian exam notifications. Your images are processed on your own device and never uploaded.',
  },
  hi: {
    title: 'PHOTORESIZER (फोटो और हस्ताक्षर रिसाइज़र)',
    subtitle: 'UPSC, SSC, IBPS, NEET और अन्य भारतीय सरकारी परीक्षाओं के लिए पासपोर्ट फोटो और हस्ताक्षर का आकार बदलें, कंप्रेस और क्रॉप करें',
    selectExam: 'परीक्षा / आवेदन चुनें',
    photoParams: 'फोटो पैरामीटर',
    signParams: 'हस्ताक्षर पैरामीटर',
    uploadPhoto: 'फोटो अपलोड करें',
    uploadSign: 'हस्ताक्षर अपलोड करें',
    dragDrop: 'खींचें और छोड़ें या अपलोड करने के लिए क्लिक करें',
    recentResizes: 'हाल के रिसाइज़',
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
    photoResizer: 'फोटो रिसाइज़र',
    latestJobs: 'नवीनतम नौकरियाँ',
    examLinks: 'परीक्षा लिंक',
    freeTools: 'सभी फ़ाइलें कनवर्टर',
    settings: 'एडवांस सेटिंग्स',
    grayscale: 'ब्लैक एंड व्हाइट में बदलें',
    autoCrop: 'ऑटो क्रॉप (अनुपात अनुसार)',
    pixels: 'px',
    kb: 'KB',
    original: 'मूल',
    result: 'परिणाम',
    error_compression: 'लक्ष्य आकार में कंप्रेस नहीं किया जा सका। छोटी छवि का प्रयास करें।',
    ad_placeholder: 'विज्ञापन स्थान',
    whyUse: 'PHOTORESIZER क्यों चुनें?',
    whyUseText: 'हम भारतीय सरकारी परीक्षाओं के लिए छवियों का आकार बदलने का सबसे तेज़ और सुरक्षित तरीका प्रदान करते हैं। अन्य उपकरणों के विपरीत, आपकी तस्वीरें 100% आपके डिवाइस पर संसाधित होती हैं और कभी भी किसी सर्वर पर अपलोड नहीं की जाती हैं।',
    features: 'मुख्य विशेषताएं',
    addDate: 'नाम और तारीख जोड़ें (SSC आदि के लिए)',
    name: 'नाम',
    date: 'फोटो की तारीख',
    customSize: 'कस्टम डाइमेंशन',
    advancedAdjustments: 'उन्नत समायोजन',
    brightness: 'चमक (Brightness)',
    contrast: 'कंट्रास्ट (Contrast)',
    resetAdjustments: 'समायोजन रीसेट करें',
    downloadPDF: 'PDF के रूप में डाउनलोड करें',
    resetAll: 'फिर से शुरू करें',

    // Hero
    heroEyebrow: 'सरकारी परीक्षा फॉर्म के लिए फोटो और हस्ताक्षर',
    heroTitleA: 'फॉर्म को सटीक साइज़ चाहिए।',
    heroTitleB: 'पहली बार में ही सही।',
    heroBody:
      'अपनी परीक्षा चुनें, फोटो और हस्ताक्षर जोड़ें, और ऐसी फाइलें डाउनलोड करें जो नोटिफिकेशन में दी गई पिक्सेल और KB सीमा से पहले से मेल खाती हों। सब कुछ आपके ब्राउज़र में चलता है, कुछ भी कहीं नहीं भेजा जाता।',
    trustPrivate: 'कोई अपलोड नहीं, सब आपके फोन में',
    trustOffline: 'एक बार खुलने के बाद बिना इंटरनेट भी चलता है',
    trustFree: 'मुफ़्त, बिना साइन-अप',
    jumpTo: 'सीधे अपनी परीक्षा चुनें',

    // Spec ticket
    specTicket: 'आवश्यकता पर्ची',
    fileSize: 'फ़ाइल साइज़',
    fit: 'फिट',
    copySpecs: 'ये स्पेक्स कॉपी करें',
    copied: 'कॉपी हो गया',

    // Uploaders
    photoSlot: 'फोटोग्राफ',
    signSlot: 'हस्ताक्षर',
    photoHint: 'सीधा चेहरा, सादा हल्का बैकग्राउंड, कंधे फ्रेम में हों।',
    signHint: 'सफेद कागज़ पर गहरे पेन से हस्ताक्षर करें, फिर सीधा फोटो लें।',
    affixHere: 'यहाँ चिपकाएँ',
    takePhoto: 'कैमरा',
    chooseFile: 'फ़ाइल चुनें',
    dropOrPaste: 'या फ़ाइल यहाँ छोड़ें · पेस्ट के लिए Ctrl+V',
    notUploaded: 'खाली',
    loaded: 'तैयार',
    crop: 'क्रॉप',
    applyCrop: 'क्रॉप लागू करें',
    cancel: 'रद्द करें',
    remove: 'हटाएँ',
    rotateLeft: 'बाएँ घुमाएँ',
    rotateRight: 'दाएँ घुमाएँ',
    grayscaleNote: 'कुछ फॉर्म केवल श्वेत-श्याम हस्ताक्षर स्वीकार करते हैं।',
    removeBg: 'बैकग्राउंड हटाएँ',
    removeBgNote: 'आपके ब्राउज़र में मॉडल चलता है। कुछ सेकंड लगते हैं।',

    // Actions
    makeFiles: 'मेरी फाइलें बनाएँ',
    remaking: 'बन रहा है…',
    waitingForUpload: 'शुरू करने के लिए फोटो या हस्ताक्षर जोड़ें',
    resultPending: 'आपका परिणाम यहाँ दिखेगा',
    resultPendingNote: 'बटन दबाने तक कुछ भी प्रोसेस नहीं होता।',

    // Extras
    extrasHeading: 'ये भी काम आएगा',
    extrasBody: 'वो काम जो लोग बाद में हाथ से करते हैं।',
    combinedTitle: 'फोटो + हस्ताक्षर एक JPG में',
    combinedBody: 'एक सफेद इमेज जिसमें ऊपर फोटो और नीचे हस्ताक्षर, जैसा कुछ फॉर्म माँगते हैं।',
    printTitle: 'प्रिंट शीट',
    printBody: '4×6 इंच की शीट, असली साइज़ की कॉपियाँ और कटिंग लाइन के साथ — प्रिंट की दुकान के लिए।',
    pdfTitle: 'दोनों का PDF',
    pdfBody: 'एक PDF जिसे आप अपने आवेदन रिकॉर्ड के साथ रख सकते हैं।',
    needBoth: 'इसे बनाने के लिए फोटो और हस्ताक्षर दोनों जोड़ें।',
    needPhoto: 'इसे बनाने के लिए फोटो जोड़ें।',
    build: 'बनाएँ',
    building: 'बन रहा है…',
    copiesWord: 'कॉपियाँ',
    sheetFailed: 'शीट नहीं बन पाई। अपनी इमेज दोबारा प्रोसेस करें।',
    close: 'बंद करें',

    yourFiles: 'आपकी फाइलें',

    // Nav labels
    navResize: 'रिसाइज़',
    navTools: 'टूल्स',
    navJobs: 'नौकरियाँ',
    navLinks: 'लिंक',
    navGuide: 'गाइड',

    footerBlurb:
      'भारतीय परीक्षा नोटिफिकेशन में छपी असली सीमाओं के हिसाब से बना रिसाइज़र। आपकी इमेज आपके ही डिवाइस पर प्रोसेस होती हैं, कभी अपलोड नहीं होतीं।',
  }
};

export const FAQ_DATA = [
  {
    q: "How to reduce image size (Image size kam kaise kare)?",
    a: "If you need to 'jpg compress karo' or figure out 'image size kam kaise kare', simply upload your photo and select your exam. Our 'photo resize online free' tool will automatically compress and resize it to the required KB limit without losing quality."
  },
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
    title: "PHOTORESIZER: Best Online Photo & Signature Resizer for Indian Exams",
    text: "Applying for government jobs like UPSC, SSC, IBPS, or entrance exams like JEE and NEET requires images to be in a very specific format. Most applications get rejected due to incorrect dimensions or file sizes. If you are wondering \"image size kam kaise kare\" or need to \"jpg compress karo\", PHOTORESIZER is the perfect solution. As a top \"photo resize online free\" tool, it effortlessly handles any \"passport size photo resize\" request. Whether you need a 20KB to 50KB photo converter, a signature compressor to 20kb, or a passport photo maker free, our online photo cropper for exam forms handles it all instantly. We support all major exams including SSC CGL, CHSL, MTS, GD, UPSC CSE, IBPS PO, Clerk, and State PSC exams like UPPSC, BPSC, and MPSC."
  },
  exams: [
    {
      title: "Resize Photo for UPSC (CSE, NDA, CDS)",
      content: "The Union Public Service Commission (UPSC) has updated its guidelines. Photos must now be 350x350 pixels. Our tool automatically crops your photo to a square format and compresses it between 20KB and 300KB. This is the perfect UPSC photo resizer online for 2026."
    },
    {
      title: "SSC Photo & Signature Compressor 20KB to 50KB",
      content: "For SSC CGL, CHSL, and MTS, the photo size should be 20KB to 50KB with dimensions of 3.5cm x 4.5cm. Signatures must be 10KB to 20KB. Use our SSC preset to get the exact output instantly. Our SSC photo maker also supports adding name and date of photo as per latest NTA/SSC guidelines."
    },
    {
      title: "IBPS & SBI PO Image Resizer with Signature",
      content: "Banking exams require specific file names and sizes. IBPS signatures must not be in capital letters and should be between 10KB and 20KB. Our tool handles the resizing and compression while maintaining clarity. Ideal for IBPS PO, Clerk, and SBI recruitment forms."
    },
    {
      title: "NEET & JEE Main Photo Maker with Name and Date",
      content: "NTA requires passport size photographs (10KB to 200KB) and postcard size photographs (10KB to 200KB) for NEET. The photograph must be taken on or after a specific date, indicating the candidate's name and date of taking the photograph. Use our 'Add Name & Date' feature to easily comply with NTA guidelines for JEE Main 2026 and NEET 2026."
    },
    {
      title: "State PSC & Police Exam Resizer (UPPSC, BPSC, MPSC)",
      content: "State Public Service Commissions (like UPPSC, BPSC, MPSC, RPSC) and State Police recruitment boards have varying requirements. Our tool includes presets for major states and a custom option to dial in the exact width, height, and KB size needed for your specific state exam. Reduce photo size to 20kb or 50kb easily."
    }
  ],
  features: [
    "Automatic Aspect Ratio Locking (Passport Size 3.5x4.5 cm)",
    "Exact KB Compression (e.g., reduce 2MB to 20KB or 50KB)",
    "Signature Cleaner & Grayscale converter for better clarity",
    "Privacy First (No Server Uploads, 100% Client-Side)",
    "Mobile Friendly (Works on Android, iPhone, and Tablets)",
    "Add Name & Date on Photo for SSC, NEET, and JEE",
    "Download as PDF for easy printing and record keeping"
  ]
};
