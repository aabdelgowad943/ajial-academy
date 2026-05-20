import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Course, Testimonial, Blog, FAQ, Contact } from './models.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins for development convenience
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas');
    seedDatabase();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// JWT Verification Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

// ==================== AUTH ROUTES ====================
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AjialAcademyAdmin2026!';

  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, username });
  }

  res.status(401).json({ message: 'Invalid username or password.' });
});

// Verify token route
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});

// ==================== COURSES ROUTES ====================
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/courses', authenticateToken, async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/courses/:id', authenticateToken, async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/courses/:id', authenticateToken, async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== TESTIMONIALS ROUTES ====================
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/testimonials', authenticateToken, async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/testimonials/:id', authenticateToken, async (req, res) => {
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTestimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/testimonials/:id', authenticateToken, async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== BLOGS ROUTES ====================
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/blogs', authenticateToken, async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/blogs/:id', authenticateToken, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/blogs/:id', authenticateToken, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== FAQS ROUTES ====================
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/faqs', authenticateToken, async (req, res) => {
  try {
    const newFAQ = new FAQ(req.body);
    const savedFAQ = await newFAQ.save();
    res.status(201).json(savedFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/faqs/:id', authenticateToken, async (req, res) => {
  try {
    const updatedFAQ = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFAQ) return res.status(404).json({ message: 'FAQ not found' });
    res.json(updatedFAQ);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/faqs/:id', authenticateToken, async (req, res) => {
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);
    if (!deletedFAQ) return res.status(404).json({ message: 'FAQ not found' });
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==================== CONTACTS ROUTES ====================
app.post('/api/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/contacts/:id/status', authenticateToken, async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updatedContact) return res.status(404).json({ message: 'Contact record not found' });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: 'Contact record not found' });
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// ==================== SEEDING LOGIC ====================
async function seedDatabase() {
  try {
    // Check if courses count is 0
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log('Seeding initial database content...');

      // Seed Courses
      await Course.create([
        {
          title: { en: 'Full Stack Web Development', ar: 'تطوير الويب المتكامل (Full Stack)' },
          description: { 
            en: 'Master modern frontend and backend technologies including HTML, CSS, React, Node.js, and MongoDB.', 
            ar: 'احترف تقنيات الواجهات الأمامية والخلفية الحديثة بما في ذلك HTML و CSS و React و Node.js و MongoDB.' 
          },
          category: { en: 'Programming', ar: 'البرمجة' },
          price: 299,
          duration: { en: '12 Weeks', ar: '12 أسبوعاً' },
          imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
          features: [
            { en: '1-on-1 Mentorship', ar: 'توجيه فردي مباشر' },
            { en: 'Real-world Projects', ar: 'مشاريع حقيقية عملية' },
            { en: 'Career Support', ar: 'دعم وظيفي بعد التخرج' }
          ]
        },
        {
          title: { en: 'English Fluency & Communication', ar: 'طلاقة اللغة الإنجليزية والتواصل' },
          description: { 
            en: 'Boost your career opportunities by learning English grammar, pronunciation, and professional speaking.', 
            ar: 'عزز فرصك الوظيفية من خلال تعلم قواعد اللغة الإنجليزية، النطق الصحيح، والتحدث الاحترافي.' 
          },
          category: { en: 'Languages', ar: 'اللغات' },
          price: 150,
          duration: { en: '8 Weeks', ar: '8 أسابيع' },
          imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60',
          features: [
            { en: 'Native Speakers Practice', ar: 'ممارسة مع متحدثين أصليين' },
            { en: 'Interactive Dialogues', ar: 'حوارات تفاعلية' },
            { en: 'Free Study Materials', ar: 'مواد دراسية مجانية' }
          ]
        },
        {
          title: { en: 'Mobile App Development (Flutter)', ar: 'تطوير تطبيقات الموبايل (Flutter)' },
          description: { 
            en: 'Build native iOS and Android apps from a single codebase using Flutter and Dart.', 
            ar: 'قم ببناء تطبيقات أصلية لنظامي iOS و Android من كود برمي واحد باستخدام Flutter و Dart.' 
          },
          category: { en: 'Programming', ar: 'البرمجة' },
          price: 250,
          duration: { en: '10 Weeks', ar: '10 أسابيع' },
          imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
          features: [
            { en: 'Cross-platform Expertise', ar: 'خبرة تطوير الأنظمة المتعددة' },
            { en: 'App Store Publishing Guide', ar: 'دليل النشر على المتاجر' },
            { en: 'State Management Concepts', ar: 'مفاهيم إدارة الحالة المتقدمة' }
          ]
        },
        {
          title: { en: 'UI/UX Design Masterclass', ar: 'ماستر كلاس تصميم واجهات وتجربة المستخدم' },
          description: { 
            en: 'Learn Figma, wireframing, prototyping, and user testing to create amazing digital products.', 
            ar: 'تعلم فيغما، التخطيط الهيكلي، النمذجة الأولية واختبار المستخدم لإنشاء منتجات رقمية رائعة.' 
          },
          category: { en: 'Design', ar: 'التصميم' },
          price: 180,
          duration: { en: '6 Weeks', ar: '6 أسابيع' },
          imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=60',
          features: [
            { en: 'Figma Mastery', ar: 'احتراف أداة Figma' },
            { en: 'Design System Creation', ar: 'إنشاء نظام التصميم الخاص بك' },
            { en: 'Portfolio Building', ar: 'بناء معرض أعمالك' }
          ]
        },
        {
          title: { en: 'Digital Marketing Specialist', ar: 'أخصائي التسويق الرقمي' },
          description: { 
            en: 'Gain expertise in SEO, SEM, social media campaigns, and Google Analytics to scale businesses.', 
            ar: 'اكتسب الخبرة في تحسين محركات البحث SEO، وإعلانات محركات البحث، والحملات الإعلانية ومحلل البيانات.' 
          },
          category: { en: 'Marketing', ar: 'التسويق' },
          price: 199,
          duration: { en: '8 Weeks', ar: '8 أسابيع' },
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
          features: [
            { en: 'Live Ads Budgets', ar: 'ميزانيات إعلانية حية للتجربة' },
            { en: 'Certifications Prep', ar: 'التحضير لشهادات التسويق' },
            { en: 'Data Analytics Training', ar: 'التدريب على تحليل البيانات' }
          ]
        }
      ]);

      // Seed Testimonials
      await Testimonial.create([
        {
          name: { en: 'Sarah Johnson', ar: 'سارة جونز' },
          role: { en: 'Web Development Graduate', ar: 'خريجة تطوير الويب' },
          feedback: { 
            en: 'This academy changed my life. I went from knowing nothing about code to landing a remote full stack developer job in 4 months.', 
            ar: 'غيرت هذه الأكاديمية حياتي. انتقلت من عدم معرفة أي شيء عن البرمجة إلى الحصول على وظيفة عن بعد كمطور ويب متكامل في 4 أشهر.' 
          },
          rating: 5
        },
        {
          name: { en: 'Ahmad Al-Saeed', ar: 'أحمد السعيد' },
          role: { en: 'Business English Student', ar: 'طالب لغة إنجليزية للأعمال' },
          feedback: { 
            en: 'The instructors are amazing! The interactive conversation sessions gave me the confidence to present in meetings at my work.', 
            ar: 'المعلمون رائعون للغاية! لقد منحتني جلسات المحادثة التفاعلية الثقة لتقديم العروض والاجتماعات في عملي باللغة الإنجليزية.' 
          },
          rating: 5
        },
        {
          name: { en: 'Mariam Ali', ar: 'مريم علي' },
          role: { en: 'UI/UX Design Graduate', ar: 'خريجة تصميم واجهات المستخدم' },
          feedback: { 
            en: 'Extremely detailed syllabus and awesome feedback sessions. The community is very encouraging and help you grow.', 
            ar: 'منهج دراسي مفصل للغاية وجلسات تقييم مذهلة. المجتمع مشجع للغاية ويساعدك على النمو وتطوير مهاراتك.' 
          },
          rating: 4
        }
      ]);

      // Seed FAQs
      await FAQ.create([
        {
          question: { en: 'Are the courses online or in-person?', ar: 'هل الدورات عبر الإنترنت أم حضورية؟' },
          answer: { 
            en: 'We offer flexible hybrid options! All our core materials are recorded and accessible online, supplemented by interactive live weekly sessions with instructors.', 
            ar: 'نحن نقدم خيارات مرنة ومدمجة! جميع المواد الأساسية مسجلة ويمكن الوصول إليها عبر الإنترنت، بالإضافة إلى جلسات حية تفاعلية أسبوعية مع المعلمين.' 
          }
        },
        {
          question: { en: 'Do I get a certificate upon completion?', ar: 'هل أحصل على شهادة عند إتمام الدورة؟' },
          answer: { 
            en: 'Yes, after successfully completing your course projects and assignments, you will receive an official verifiable digital certificate from Ajial Academy.', 
            ar: 'نعم، بعد إتمام مشاريع الدورة التدريبية والتكليفات بنجاح، ستحصل على شهادة رقمية رسمية معتمدة وقابلة للتحقق من أكاديمية أجيال.' 
          }
        },
        {
          question: { en: 'What forms of payment do you accept?', ar: 'ما هي طرق الدفع التي تقبلونها؟' },
          answer: { 
            en: 'We accept credit card payments, PayPal, bank transfers, and local payment methods like Fawry, Vodafone Cash, or installment plans.', 
            ar: 'نقبل الدفع بالبطاقات الائتمانية، بايبال، التحويلات البنكية، ووسائل الدفع المحلية مثل فوري، فودافون كاش، أو خطط تقسيط مريحة.' 
          }
        },
        {
          question: { en: 'Is there support if I get stuck during learning?', ar: 'هل هناك دعم إذا واجهت مشكلة أثناء التعلم؟' },
          answer: { 
            en: 'Absolutely! Our teaching assistants are available in our student discord community 12 hours a day to answer questions, debug code, and review design files.', 
            ar: 'بالتأكيد! المساعدون التعليميون متواجدون في مجتمع ديسكورد للطلاب لمدة 12 ساعة يومياً للإجابة عن الأسئلة، إصلاح الأكواد ومراجعة ملفات التصاميم.' 
          }
        }
      ]);

      // Seed Blogs
      await Blog.create([
        {
          title: { en: 'How to Start Coding in 2026: A Step-by-Step Guide', ar: 'كيف تبدأ تعلم البرمجة في 2026: دليل خطوة بخطوة' },
          content: { 
            en: 'The tech landscape changes rapidly. Learn which programming languages are most in demand in 2026 and how you can map your learning path from absolute beginner to landing your first job.', 
            ar: 'يتغير مشهد التكنولوجيا بسرعة. تعرف على لغات البرمجة الأكثر طلباً في عام 2026 وكيف يمكنك رسم مسار التعلم الخاص بك من مبتدئ تماماً إلى الحصول على وظيفتك الأولى.' 
          },
          author: { en: 'Eng. Khaled Mahmoud', ar: 'م. خالد محمود' },
          imageUrl: 'https://images.unsplash.com/photo-1516116211223-5c359a36298a?w=800&auto=format&fit=crop&q=60'
        },
        {
          title: { en: 'The Role of AI in Modern UI/UX Design', ar: 'دور الذكاء الاصطناعي في تصميم واجهات المستخدم الحديثة' },
          content: { 
            en: 'AI tools are transforming how designers work. Discover how to leverage AI for rapid prototyping, generating design systems, and conducting automated user testing without losing human empathy.', 
            ar: 'أدوات الذكاء الاصطناعي تغير طريقة عمل المصممين. اكتشف كيفية الاستفادة منها في النمذجة السريعة، وتوليد أنظمة التصميم، وإجراء اختبارات للمستخدم دون التخلي عن اللمسة الإنسانية.' 
          },
          author: { en: 'Designer Sarah Ali', ar: 'المصممة سارة علي' },
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60'
        }
      ]);

      console.log('Seeding completed successfully.');
    }
  } catch (error) {
    console.error('Database seeding failed:', error);
  }
}

export default app;

