import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    appName: "Ajial Academy",
    academyOwner: "Eng. Khaled Mahmoud & Designer Sarah Ali",
    
    // Navbar
    navHome: "Home",
    navAbout: "About Us",
    navContact: "Contact Us",
    navFaqs: "FAQs",
    navBlogs: "Blog",
    navDashboard: "Dashboard",
    navLogin: "Login",
    navLogout: "Logout",
    toggleLanguage: "العربية",

    // Hero
    heroTitle: "Empower Your Future with Professional Courses",
    heroSubtitle: "Welcome to Ajial Academy. Discover more than 5 specialised courses in programming, languages, design, and marketing to shape your academic and professional success.",
    heroCta: "Explore Courses",
    heroCtaSecondary: "Contact Us",
    statStudents: "1,500+",
    statStudentsLabel: "Active Students",
    statCourses: "5+ Fields",
    statCoursesLabel: "Academic Domains",
    statInstructors: "12+",
    statInstructorsLabel: "Expert Instructors",

    // Courses Section
    coursesTitle: "Our Featured Courses",
    coursesSubtitle: "Explore our industry-standard courses designed and taught by leading field experts.",
    courseDuration: "Duration",
    coursePrice: "Price",
    courseEnroll: "Enroll Now",
    courseCurrency: "$",
    noCourses: "No courses available at the moment.",

    // Instructors / Owners Section
    ownersTitle: "Meet Our Founders & Directors",
    ownersSubtitle: "The leading minds driving excellence and shaping student futures at Ajial Academy.",
    ownersContactWhatsapp: "Chat on WhatsApp",

    // Testimonials Section
    testimonialsTitle: "What Our Students Say",
    testimonialsSubtitle: "Real stories and success reviews from graduates of our academy.",
    ratingLabel: "Rating",

    // Blog Section
    blogTitle: "Latest Insights & Articles",
    blogSubtitle: "Stay updated with the latest trends in tech, design, languages, and education.",
    blogReadMore: "Read Full Article",
    blogBack: "Back to Blog List",
    blogAuthor: "By",
    blogDate: "Published on",
    noBlogs: "No blog posts published yet.",

    // About Page
    aboutTitle: "About Ajial Academy",
    aboutSubtitle: "Bridging the gap between academic knowledge and industry-grade professionalism.",
    aboutHeading1: "Our Story",
    aboutText1: "Founded with a vision to nurture the next generation (Ajial) of professionals, Ajial Academy has grown into a trusted learning hub. We design courses that match the modern digital economy, focusing on hands-on practical experience.",
    aboutHeading2: "Our Mission",
    aboutText2: "To provide accessible, high-quality, practical education in essential modern skills, empowering students to build rewarding careers and succeed in a competitive global market.",
    aboutHeading3: "Why Choose Us?",
    whyPoint1: "Expert Mentorship",
    whyPoint1Desc: "Learn from active industry experts who bring real-world case studies into the classroom.",
    whyPoint2: "Practical Project-based Learning",
    whyPoint2Desc: "Build real projects that you can showcase directly in your professional portfolio.",
    whyPoint3: "Bilingual Curriculum",
    whyPoint3Desc: "Comprehensive study materials in both English and Arabic to suit your learning preference.",

    // Contact Page
    contactTitle: "Get in Touch",
    contactSubtitle: "Have questions about our courses or registration? Contact our support team today.",
    contactFormName: "Full Name",
    contactFormEmail: "Email Address",
    contactFormPhone: "Phone Number",
    contactFormSubject: "Subject",
    contactFormMessage: "Your Message",
    contactFormSubmit: "Send Message",
    contactFormSending: "Sending Message...",
    contactSuccess: "Your message has been sent successfully! We will get back to you soon.",
    contactError: "Failed to send message. Please try again.",
    contactInfoAddress: "Address",
    contactInfoAddressVal: "Cairo, Egypt / Riyadh, Saudi Arabia (Online/Hybrid)",
    contactInfoPhone: "Phone & WhatsApp",
    contactInfoEmail: "Email Address",

    // FAQs Page
    faqsTitle: "Frequently Asked Questions",
    faqsSubtitle: "Find quick answers to common questions about admissions, course schedules, and certificate criteria.",
    noFaqs: "No FAQs available.",

    // Login Page
    loginTitle: "Admin Login",
    loginSubtitle: "Sign in with your static credentials to access the admin management dashboard.",
    loginUsername: "Username",
    loginPassword: "Password",
    loginSubmit: "Sign In",
    loginError: "Invalid username or password.",

    // Dashboard
    dashTitle: "Admin Control Center",
    dashSubtitle: "Manage your courses, testimonials, blog articles, FAQs, and read user messages.",
    tabCourses: "Courses",
    tabTestimonials: "Testimonials",
    tabBlogs: "Blogs",
    tabFaqs: "FAQs",
    tabContacts: "Messages",
    
    // CRUD General
    crudAdd: "Add New",
    crudEdit: "Edit",
    crudDelete: "Delete",
    crudSave: "Save",
    crudCancel: "Cancel",
    crudActions: "Actions",
    crudSearch: "Search...",
    
    // CRUD Fields
    fieldTitleEn: "Title (English)",
    fieldTitleAr: "Title (Arabic)",
    fieldDescEn: "Description (English)",
    fieldDescAr: "Description (Arabic)",
    fieldCategoryEn: "Category (English)",
    fieldCategoryAr: "Category (Arabic)",
    fieldPrice: "Price (USD)",
    fieldDurationEn: "Duration (English)",
    fieldDurationAr: "Duration (Arabic)",
    fieldImageUrl: "Image URL",
    fieldNameEn: "Name (English)",
    fieldNameAr: "Name (Arabic)",
    fieldRoleEn: "Role (English)",
    fieldRoleAr: "Role (Arabic)",
    fieldFeedbackEn: "Feedback (English)",
    fieldFeedbackAr: "Feedback (Arabic)",
    fieldRating: "Rating (1-5)",
    fieldAuthorEn: "Author Name (English)",
    fieldAuthorAr: "Author Name (Arabic)",
    fieldContentEn: "Content (English)",
    fieldContentAr: "Content (Arabic)",
    fieldQuestionEn: "Question (English)",
    fieldQuestionAr: "Question (Arabic)",
    fieldAnswerEn: "Answer (English)",
    fieldAnswerAr: "Answer (Arabic)",

    // Messages Dashboard
    msgSender: "Sender",
    msgEmailPhone: "Email / Phone",
    msgSubject: "Subject",
    msgContent: "Message Content",
    msgDate: "Date Submitted",
    msgStatus: "Status",
    msgUnread: "Unread",
    msgRead: "Read",
    msgMarkRead: "Mark as Read",
    msgDelete: "Delete Message",
    noMessages: "No contact messages received yet."
  },
  ar: {
    appName: "أكاديمية أجيال",
    academyOwner: "م. خالد محمود و المصممة سارة علي",
    
    // Navbar
    navHome: "الرئيسية",
    navAbout: "من نحن",
    navContact: "اتصل بنا",
    navFaqs: "الأسئلة الشائعة",
    navBlogs: "المدونة",
    navDashboard: "لوحة التحكم",
    navLogin: "الدخول",
    navLogout: "خروج",
    toggleLanguage: "English",

    // Hero
    heroTitle: "مكّن مستقبلك مع الدورات المهنية الاحترافية",
    heroSubtitle: "مرحباً بكم في أكاديمية أجيال. اكتشف أكثر من 5 دورات تدريبية متخصصة في البرمجة، اللغات، التصميم، والتسويق لبناء نجاحك الأكاديمي والمهني.",
    heroCta: "استكشف الدورات",
    heroCtaSecondary: "اتصل بنا",
    statStudents: "+1,500",
    statStudentsLabel: "طالب نشط",
    statCourses: "5+ مجالات",
    statCoursesLabel: "تخصصات أكاديمية",
    statInstructors: "+12",
    statInstructorsLabel: "مدرب خبير",

    // Courses Section
    coursesTitle: "دوراتنا المميزة",
    coursesSubtitle: "استكشف دوراتنا المصممة لتوافق معايير سوق العمل، ويقدمها نخبة من خبراء المجال.",
    courseDuration: "المدة",
    coursePrice: "السعر",
    courseEnroll: "سجل الآن",
    courseCurrency: "$",
    noCourses: "لا توجد دورات متاحة حالياً.",

    // Instructors / Owners Section
    ownersTitle: "تعرف على مؤسسي الأكاديمية",
    ownersSubtitle: "العقول القيادية التي تقود التميز وترسم مستقبل الطلاب في أكاديمية أجيال.",
    ownersContactWhatsapp: "تواصل عبر واتساب",

    // Testimonials Section
    testimonialsTitle: "ماذا يقول طلابنا",
    testimonialsSubtitle: "قصص نجاح وآراء حقيقية من خريجي أكاديميتنا.",
    ratingLabel: "التقييم",

    // Blog Section
    blogTitle: "آخر المقالات والمقالات المعرفية",
    blogSubtitle: "ابق على اطلاع بأحدث الاتجاهات في التكنولوجيا، التصميم، اللغات، والتعليم.",
    blogReadMore: "اقرأ المقال كاملاً",
    blogBack: "العودة لقائمة المقالات",
    blogAuthor: "بواسطة",
    blogDate: "نُشر في",
    noBlogs: "لم يتم نشر أي مقالات بعد.",

    // About Page
    aboutTitle: "عن أكاديمية أجيال",
    aboutSubtitle: "جسر يربط بين المعرفة الأكاديمية والاحترافية العملية المطلوبة في سوق العمل.",
    aboutHeading1: "قصتنا",
    aboutText1: "تأسست أكاديمية أجيال برؤية طموحة لإعداد الجيل القادم من المحترفين، ونمت لتصبح منصة تعليمية موثوقة. نقوم بتصميم الدورات التدريبية لتناسب الاقتصاد الرقمي الحديث، مع التركيز الكامل على التجربة العملية التطبيقية.",
    aboutHeading2: "رسالتنا",
    aboutText2: "تقديم تعليم عملي عالي الجودة ومتاح للجميع في المهارات الحديثة الأساسية، مما يمكن الطلاب من بناء وظائف مجزية والنجاح في سوق عالمي تنافسي.",
    aboutHeading3: "لماذا تختارنا؟",
    whyPoint1: "توجيه وخبرة حقيقية",
    whyPoint1Desc: "تعلم من خبراء ممارسين في السوق ينقلون حالات دراسية حقيقية إلى قاعات الدراسة.",
    whyPoint2: "تعلم قائم على المشاريع",
    whyPoint2Desc: "قم ببناء مشاريع حقيقية يمكنك عرضها مباشرة في معرض أعمالك المهني لجذب الوظائف.",
    whyPoint3: "منهج ثنائي اللغة",
    whyPoint3Desc: "مواد دراسية شاملة باللغتين الإنجليزية والعربية لتناسب تفضيلاتك التعليمية.",

    // Contact Page
    contactTitle: "تواصل معنا",
    contactSubtitle: "لديك استفسارات حول دوراتنا أو طريقة التسجيل؟ اتصل بفريق الدعم اليوم.",
    contactFormName: "الاسم الكامل",
    contactFormEmail: "البريد الإلكتروني",
    contactFormPhone: "رقم الهاتف",
    contactFormSubject: "الموضوع",
    contactFormMessage: "رسالتك",
    contactFormSubmit: "إرسال الرسالة",
    contactFormSending: "جاري الإرسال...",
    contactSuccess: "تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت ممكن.",
    contactError: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
    contactInfoAddress: "العنوان",
    contactInfoAddressVal: "القاهرة، مصر / الرياض، السعودية (عبر الإنترنت / مدمج)",
    contactInfoPhone: "الهاتف وواتساب",
    contactInfoEmail: "البريد الإلكتروني",

    // FAQs Page
    faqsTitle: "الأسئلة الشائعة",
    faqsSubtitle: "ابحث عن إجابات سريعة للأسئلة الشائعة حول القبول وجداول الدورات ومعايير الشهادات.",
    noFaqs: "لا توجد أسئلة شائعة متاحة حالياً.",

    // Login Page
    loginTitle: "تسجيل دخول المسؤول",
    loginSubtitle: "قم بتسجيل الدخول باستخدام بيانات الاعتماد الخاصة بك للوصول للوحة التحكم.",
    loginUsername: "اسم المستخدم",
    loginPassword: "كلمة المرور",
    loginSubmit: "تسجيل الدخول",
    loginError: "اسم المستخدم أو كلمة المرور غير صحيحة.",

    // Dashboard
    dashTitle: "مركز التحكم للمشرف",
    dashSubtitle: "إدارة الدورات، آراء الطلاب، المقالات، الأسئلة الشائعة، ومراجعة رسائل الاتصال الواردة.",
    tabCourses: "الدورات",
    tabTestimonials: "الآراء",
    tabBlogs: "المقالات",
    tabFaqs: "الأسئلة الشائعة",
    tabContacts: "الرسائل",
    
    // CRUD General
    crudAdd: "إضافة جديد",
    crudEdit: "تعديل",
    crudDelete: "حذف",
    crudSave: "حفظ",
    crudCancel: "إلغاء",
    crudActions: "الإجراءات",
    crudSearch: "بحث...",
    
    // CRUD Fields
    fieldTitleEn: "العنوان (بالإنجليزي)",
    fieldTitleAr: "العنوان (بالعربي)",
    fieldDescEn: "الوصف (بالإنجليزي)",
    fieldDescAr: "الوصف (بالعربي)",
    fieldCategoryEn: "التصنيف (بالإنجليزي)",
    fieldCategoryAr: "التصنيف (بالعربي)",
    fieldPrice: "السعر (بالدولار)",
    fieldDurationEn: "المدة (بالإنجليزي)",
    fieldDurationAr: "المدة (بالعربي)",
    fieldImageUrl: "رابط الصورة",
    fieldNameEn: "الاسم (بالإنجليزي)",
    fieldNameAr: "الاسم (بالعربي)",
    fieldRoleEn: "الوظيفة/الدور (بالإنجليزي)",
    fieldRoleAr: "الوظيفة/الدور (بالعربي)",
    fieldFeedbackEn: "الرأي (بالإنجليزي)",
    fieldFeedbackAr: "الرأي (بالعربي)",
    fieldRating: "التقييم (1-5)",
    fieldAuthorEn: "اسم الكاتب (بالإنجليزي)",
    fieldAuthorAr: "اسم الكاتب (بالعربي)",
    fieldContentEn: "المحتوى (بالإنجليزي)",
    fieldContentAr: "المحتوى (بالعربي)",
    fieldQuestionEn: "السؤال (بالإنجليزي)",
    fieldQuestionAr: "السؤال (بالعربي)",
    fieldAnswerEn: "الإجابة (بالإنجليزي)",
    fieldAnswerAr: "الإجابة (بالعربي)",

    // Messages Dashboard
    msgSender: "المرسل",
    msgEmailPhone: "البريد / الهاتف",
    msgSubject: "الموضوع",
    msgContent: "محتوى الرسالة",
    msgDate: "تاريخ الإرسال",
    msgStatus: "الحالة",
    msgUnread: "غير مقروء",
    msgRead: "مقروء",
    msgMarkRead: "تحديد كمقروء",
    msgDelete: "حذف الرسالة",
    noMessages: "لا توجد رسائل واردة حالياً."
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Update HTML attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRtl: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
