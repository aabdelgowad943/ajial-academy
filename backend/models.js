import mongoose from 'mongoose';

// Bilingual String Sub-schema
const bilingualStringSchema = new mongoose.Schema({
  en: { type: String, required: true },
  ar: { type: String, required: true }
}, { _id: false });

// Course Schema
const courseSchema = new mongoose.Schema({
  title: { type: bilingualStringSchema, required: true },
  description: { type: bilingualStringSchema, required: true },
  category: { type: bilingualStringSchema, required: true },
  price: { type: Number, required: true },
  duration: { type: bilingualStringSchema, required: true },
  imageUrl: { type: String, required: true },
  features: [{ type: bilingualStringSchema }]
}, { timestamps: true });

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  name: { type: bilingualStringSchema, required: true },
  role: { type: bilingualStringSchema, required: true },
  feedback: { type: bilingualStringSchema, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 }
}, { timestamps: true });

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: bilingualStringSchema, required: true },
  content: { type: bilingualStringSchema, required: true },
  author: { type: bilingualStringSchema, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

// FAQ Schema
const faqSchema = new mongoose.Schema({
  question: { type: bilingualStringSchema, required: true },
  answer: { type: bilingualStringSchema, required: true }
}, { timestamps: true });

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' }
}, { timestamps: true });

export const Course = mongoose.model('Course', courseSchema);
export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export const Blog = mongoose.model('Blog', blogSchema);
export const FAQ = mongoose.model('FAQ', faqSchema);
export const Contact = mongoose.model('Contact', contactSchema);
