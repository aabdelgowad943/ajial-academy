import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, MessageSquare, BookOpen, HelpCircle, Mail, Plus, Edit, Trash2, Check, X,
  Save, Eye, ArrowRight, Star
} from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const API_URL = (() => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  return url.endsWith('/api') ? url : `${url}/api`;
})();

export default function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const [activeTab, setActiveTab] = useState('courses');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Data lists
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Modal / Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null means adding new
  const [viewingContact, setViewingContact] = useState(null);

  // Form schemas
  const [courseForm, setCourseForm] = useState({
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
    category: { en: '', ar: '' },
    price: 0,
    duration: { en: '', ar: '' },
    imageUrl: '',
    features: [{ en: '', ar: '' }]
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: { en: '', ar: '' },
    role: { en: '', ar: '' },
    feedback: { en: '', ar: '' },
    rating: 5
  });

  const [blogForm, setBlogForm] = useState({
    title: { en: '', ar: '' },
    content: { en: '', ar: '' },
    author: { en: '', ar: '' },
    imageUrl: ''
  });

  const [faqForm, setFaqForm] = useState({
    question: { en: '', ar: '' },
    answer: { en: '', ar: '' }
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [activeTab, token]);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const handleUnauthorized = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      let res;
      if (activeTab === 'courses') {
        res = await fetch(`${API_URL}/courses`);
        if (res.ok) setCourses(await res.json());
      } else if (activeTab === 'testimonials') {
        res = await fetch(`${API_URL}/testimonials`);
        if (res.ok) setTestimonials(await res.json());
      } else if (activeTab === 'blogs') {
        res = await fetch(`${API_URL}/blogs`);
        if (res.ok) setBlogs(await res.json());
      } else if (activeTab === 'faqs') {
        res = await fetch(`${API_URL}/faqs`);
        if (res.ok) setFaqs(await res.json());
      } else if (activeTab === 'contacts') {
        res = await fetch(`${API_URL}/contacts`, { headers: getHeaders() });
        if (res.status === 401 || res.status === 403) return handleUnauthorized();
        if (res.ok) setContacts(await res.json());
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Is backend server online?');
    } finally {
      setLoading(false);
    }
  };

  // Delete Action
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`${API_URL}/${activeTab}/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.status === 401 || res.status === 403) return handleUnauthorized();
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete item.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Mark Message as Read
  const handleMarkRead = async (id, currentStatus) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    try {
      const res = await fetch(`${API_URL}/contacts/${id}/status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      if (res.status === 401 || res.status === 403) return handleUnauthorized();
      if (res.ok) {
        fetchData();
        if (viewingContact && viewingContact._id === id) {
          setViewingContact({ ...viewingContact, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Open Create/Edit modal
  const openForm = (item = null) => {
    setEditingItem(item);
    if (activeTab === 'courses') {
      setCourseForm(item ? {
        title: item.title,
        description: item.description,
        category: item.category,
        price: item.price,
        duration: item.duration,
        imageUrl: item.imageUrl,
        features: item.features && item.features.length > 0 ? item.features : [{ en: '', ar: '' }]
      } : {
        title: { en: '', ar: '' },
        description: { en: '', ar: '' },
        category: { en: '', ar: '' },
        price: 0,
        duration: { en: '', ar: '' },
        imageUrl: '',
        features: [{ en: '', ar: '' }]
      });
    } else if (activeTab === 'testimonials') {
      setTestimonialForm(item ? {
        name: item.name,
        role: item.role,
        feedback: item.feedback,
        rating: item.rating
      } : {
        name: { en: '', ar: '' },
        role: { en: '', ar: '' },
        feedback: { en: '', ar: '' },
        rating: 5
      });
    } else if (activeTab === 'blogs') {
      setBlogForm(item ? {
        title: item.title,
        content: item.content,
        author: item.author,
        imageUrl: item.imageUrl
      } : {
        title: { en: '', ar: '' },
        content: { en: '', ar: '' },
        author: { en: '', ar: '' },
        imageUrl: ''
      });
    } else if (activeTab === 'faqs') {
      setFaqForm(item ? {
        question: item.question,
        answer: item.answer
      } : {
        question: { en: '', ar: '' },
        answer: { en: '', ar: '' }
      });
    }
    setModalOpen(true);
  };

  // Save changes
  const handleSave = async (e) => {
    e.preventDefault();
    let bodyData;
    if (activeTab === 'courses') bodyData = courseForm;
    else if (activeTab === 'testimonials') bodyData = testimonialForm;
    else if (activeTab === 'blogs') bodyData = blogForm;
    else if (activeTab === 'faqs') bodyData = faqForm;

    const url = editingItem 
      ? `${API_URL}/${activeTab}/${editingItem._id}` 
      : `${API_URL}/${activeTab}`;
    
    const method = editingItem ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(bodyData)
      });
      if (res.status === 401 || res.status === 403) return handleUnauthorized();
      if (res.ok) {
        setModalOpen(false);
        setEditingItem(null);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Error saving details');
      }
    } catch (err) {
      console.error(err);
      alert('Network error saving changes.');
    }
  };

  // Feature handling in Course Form
  const addFeatureInput = () => {
    setCourseForm((prev) => ({
      ...prev,
      features: [...prev.features, { en: '', ar: '' }]
    }));
  };

  const removeFeatureInput = (index) => {
    setCourseForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureChange = (index, lang, value) => {
    setCourseForm((prev) => {
      const newFeatures = [...prev.features];
      newFeatures[index] = { ...newFeatures[index], [lang]: value };
      return { ...prev, features: newFeatures };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-[80vh]">
      
      {/* Head section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('dashTitle')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t('dashSubtitle')}
          </p>
        </div>
        
        {activeTab !== 'contacts' && (
          <button
            onClick={() => openForm()}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-primary-500/10 hover:shadow-primary-500/20"
          >
            <Plus className="h-4 w-4" />
            <span>{t('crudAdd')}</span>
          </button>
        )}
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto gap-2 pb-px scrollbar-none">
        {[
          { id: 'courses', label: t('tabCourses'), icon: <GraduationCap className="h-4 w-4" /> },
          { id: 'testimonials', label: t('tabTestimonials'), icon: <MessageSquare className="h-4 w-4" /> },
          { id: 'blogs', label: t('tabBlogs'), icon: <BookOpen className="h-4 w-4" /> },
          { id: 'faqs', label: t('tabFaqs'), icon: <HelpCircle className="h-4 w-4" /> },
          { id: 'contacts', label: `${t('tabContacts')} (${contacts.filter(c => c.status === 'unread').length})`, icon: <Mail className="h-4 w-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setViewingContact(null);
            }}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-xl transition-colors border-b-2 border-transparent -mb-px shrink-0 ${
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-primary-50/30 dark:bg-primary-950/10'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/20'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-xl font-medium border border-red-200/50">
          {error}
        </div>
      )}

      {loading && !modalOpen ? (
        <div className="py-12 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent" />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800/20 border border-gray-150 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-sm">
          
          {/* 1. COURSES TAB */}
          {activeTab === 'courses' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/40 text-gray-500 font-bold uppercase text-xs border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4">Course Details</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4 text-center">{t('crudActions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={course.imageUrl} className="h-10 w-14 object-cover rounded-lg shrink-0" />
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{course.title.en}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{course.title.ar}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">
                        {course.category.en} / {course.category.ar}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{course.duration.en}</td>
                      <td className="px-6 py-4 font-bold text-primary-600 dark:text-primary-400">${course.price}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => openForm(course)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-xl" title="Edit">
                            <Edit className="h-4.5 w-4.5" />
                          </button>
                          <button onClick={() => handleDelete(course._id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl" title="Delete">
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-400">No courses setup yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 2. TESTIMONIALS TAB */}
          {activeTab === 'testimonials' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/40 text-gray-500 font-bold uppercase text-xs border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Feedback</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4 text-center">{t('crudActions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {testimonials.map((test) => (
                    <tr key={test._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                        <div>{test.name.en}</div>
                        <div className="text-xs text-gray-400 font-normal">{test.name.ar}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        <div>{test.role.en}</div>
                        <div className="text-xs text-gray-400">{test.role.ar}</div>
                      </td>
                      <td className="px-6 py-4 max-w-xs text-gray-600 dark:text-gray-300 truncate">
                        {test.feedback.en}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex text-yellow-400 gap-0.5">
                          {Array.from({ length: test.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => openForm(test)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-xl">
                            <Edit className="h-4.5 w-4.5" />
                          </button>
                          <button onClick={() => handleDelete(test._id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl">
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {testimonials.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-400">No testimonials yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 3. BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/40 text-gray-500 font-bold uppercase text-xs border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4">Article</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-center">{t('crudActions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={blog.imageUrl} className="h-10 w-14 object-cover rounded-lg shrink-0" />
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{blog.title.en}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{blog.title.ar}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">
                        {blog.author.en} / {blog.author.ar}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => openForm(blog)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-xl">
                            <Edit className="h-4.5 w-4.5" />
                          </button>
                          <button onClick={() => handleDelete(blog._id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl">
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {blogs.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-gray-400">No blog posts yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 4. FAQS TAB */}
          {activeTab === 'faqs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/40 text-gray-500 font-bold uppercase text-xs border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-4">Question</th>
                    <th className="px-6 py-4">Answer</th>
                    <th className="px-6 py-4 text-center">{t('crudActions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {faqs.map((faq) => (
                    <tr key={faq._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                      <td className="px-6 py-4 max-w-xs">
                        <div className="font-bold text-gray-900 dark:text-white truncate">{faq.question.en}</div>
                        <div className="text-xs text-gray-400 truncate">{faq.question.ar}</div>
                      </td>
                      <td className="px-6 py-4 max-w-xs text-gray-500 truncate">
                        <div>{faq.answer.en}</div>
                        <div className="text-xs text-gray-400">{faq.answer.ar}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => openForm(faq)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-xl">
                            <Edit className="h-4.5 w-4.5" />
                          </button>
                          <button onClick={() => handleDelete(faq._id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl">
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {faqs.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-10 text-center text-gray-400">No FAQs created yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 5. CONTACTS TAB */}
          {activeTab === 'contacts' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x rtl:lg:divide-x-reverse divide-gray-200 dark:divide-gray-800">
              
              {/* Messages List Panel */}
              <div className="lg:col-span-1 max-h-[60vh] overflow-y-auto divide-y divide-gray-150 dark:divide-gray-800">
                {contacts.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => setViewingContact(c)}
                    className={`w-full p-4 text-left rtl:text-right hover:bg-gray-50 dark:hover:bg-gray-800/10 block transition-all relative ${
                      viewingContact && viewingContact._id === c._id ? 'bg-primary-50/20 dark:bg-primary-950/10' : ''
                    }`}
                  >
                    {c.status === 'unread' && (
                      <span className="absolute top-4 right-4 rtl:left-4 rtl:right-auto h-2.5 w-2.5 rounded-full bg-primary-600" />
                    )}
                    <div className="font-bold text-gray-900 dark:text-white truncate pr-6 rtl:pl-6">{c.name}</div>
                    <div className="text-xs text-gray-500 font-semibold truncate mt-0.5">{c.subject}</div>
                    <div className="text-xs text-gray-400 mt-2">{new Date(c.createdAt).toLocaleDateString()}</div>
                  </button>
                ))}
                {contacts.length === 0 && (
                  <div className="p-8 text-center text-gray-400">{t('noMessages')}</div>
                )}
              </div>

              {/* Message Reader Panel */}
              <div className="lg:col-span-2 p-6 min-h-[40vh]">
                {viewingContact ? (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{viewingContact.name}</h2>
                        <p className="text-xs text-gray-400 mt-1">{new Date(viewingContact.createdAt).toLocaleString()}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleMarkRead(viewingContact._id, viewingContact.status)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 ${
                            viewingContact.status === 'unread'
                              ? 'bg-primary-50 border-primary-200 text-primary-700 dark:bg-primary-950/20 dark:text-primary-400'
                              : 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-800/40 dark:text-gray-400'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{viewingContact.status === 'unread' ? t('msgMarkRead') : 'Mark Unread'}</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            handleDelete(viewingContact._id);
                            setViewingContact(null);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 border border-red-200 text-red-700 dark:bg-red-950/20 dark:text-red-400 transition-colors"
                        >
                          {t('crudDelete')}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl">
                      <div>
                        <span className="text-gray-400 font-semibold block text-xs">Email</span>
                        <a href={`mailto:${viewingContact.email}`} className="text-primary-600 dark:text-primary-400 hover:underline">{viewingContact.email}</a>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold block text-xs">Phone</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{viewingContact.phone || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-gray-400 font-semibold block text-xs">{t('msgSubject')}</span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{viewingContact.subject}</h3>
                    </div>

                    <div className="space-y-2">
                      <span className="text-gray-400 font-semibold block text-xs">{t('msgContent')}</span>
                      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-800/10 p-5 rounded-xl border border-gray-100 dark:border-gray-800 whitespace-pre-line leading-relaxed">
                        {viewingContact.message}
                      </p>
                    </div>

                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 h-full py-12">
                    <Mail className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-3" />
                    <span>Select a message to read</span>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      )}

      {/* CRUD MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-850 w-full max-w-3xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-150 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-850 hover:text-gray-600 dark:hover:text-white transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* 1. Course Schema Form */}
              {activeTab === 'courses' && (
                <div className="space-y-5">
                  
                  {/* Bilingual Title */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldTitleEn')}</label>
                      <input
                        type="text"
                        required
                        value={courseForm.title.en}
                        onChange={(e) => setCourseForm({ ...courseForm, title: { ...courseForm.title, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldTitleAr')}</label>
                      <input
                        type="text"
                        required
                        value={courseForm.title.ar}
                        onChange={(e) => setCourseForm({ ...courseForm, title: { ...courseForm.title, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Bilingual Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldDescEn')}</label>
                      <textarea
                        required
                        rows={3}
                        value={courseForm.description.en}
                        onChange={(e) => setCourseForm({ ...courseForm, description: { ...courseForm.description, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldDescAr')}</label>
                      <textarea
                        required
                        rows={3}
                        value={courseForm.description.ar}
                        onChange={(e) => setCourseForm({ ...courseForm, description: { ...courseForm.description, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Category & Price */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldCategoryEn')}</label>
                      <input
                        type="text"
                        required
                        value={courseForm.category.en}
                        onChange={(e) => setCourseForm({ ...courseForm, category: { ...courseForm.category, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldCategoryAr')}</label>
                      <input
                        type="text"
                        required
                        value={courseForm.category.ar}
                        onChange={(e) => setCourseForm({ ...courseForm, category: { ...courseForm.category, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldPrice')}</label>
                      <input
                        type="number"
                        required
                        value={courseForm.price}
                        onChange={(e) => setCourseForm({ ...courseForm, price: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  {/* Duration & ImageUrl */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldDurationEn')}</label>
                      <input
                        type="text"
                        required
                        value={courseForm.duration.en}
                        onChange={(e) => setCourseForm({ ...courseForm, duration: { ...courseForm.duration, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldDurationAr')}</label>
                      <input
                        type="text"
                        required
                        value={courseForm.duration.ar}
                        onChange={(e) => setCourseForm({ ...courseForm, duration: { ...courseForm.duration, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldImageUrl')}</label>
                      <input
                        type="url"
                        required
                        value={courseForm.imageUrl}
                        onChange={(e) => setCourseForm({ ...courseForm, imageUrl: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  {/* Course Features Checklist Builder */}
                  <div className="space-y-3 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Course Features (Checked List)</span>
                      <button
                        type="button"
                        onClick={addFeatureInput}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg transition-colors"
                      >
                        + Add Feature
                      </button>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {courseForm.features.map((feat, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Feature English"
                            value={feat.en}
                            required
                            onChange={(e) => handleFeatureChange(index, 'en', e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                          />
                          <input
                            type="text"
                            placeholder="الميزة بالعربية"
                            value={feat.ar}
                            required
                            onChange={(e) => handleFeatureChange(index, 'ar', e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                          />
                          {courseForm.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFeatureInput(index)}
                              className="text-red-500 p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* 2. Testimonial Schema Form */}
              {activeTab === 'testimonials' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldNameEn')}</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.name.en}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, name: { ...testimonialForm.name, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldNameAr')}</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.name.ar}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, name: { ...testimonialForm.name, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldRoleEn')}</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.role.en}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: { ...testimonialForm.role, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldRoleAr')}</label>
                      <input
                        type="text"
                        required
                        value={testimonialForm.role.ar}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: { ...testimonialForm.role, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldRating')}</label>
                      <select
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldFeedbackEn')}</label>
                      <textarea
                        required
                        rows={4}
                        value={testimonialForm.feedback.en}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, feedback: { ...testimonialForm.feedback, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldFeedbackAr')}</label>
                      <textarea
                        required
                        rows={4}
                        value={testimonialForm.feedback.ar}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, feedback: { ...testimonialForm.feedback, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Blog Schema Form */}
              {activeTab === 'blogs' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldTitleEn')}</label>
                      <input
                        type="text"
                        required
                        value={blogForm.title.en}
                        onChange={(e) => setBlogForm({ ...blogForm, title: { ...blogForm.title, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldTitleAr')}</label>
                      <input
                        type="text"
                        required
                        value={blogForm.title.ar}
                        onChange={(e) => setBlogForm({ ...blogForm, title: { ...blogForm.title, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldAuthorEn')}</label>
                      <input
                        type="text"
                        required
                        value={blogForm.author.en}
                        onChange={(e) => setBlogForm({ ...blogForm, author: { ...blogForm.author, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldAuthorAr')}</label>
                      <input
                        type="text"
                        required
                        value={blogForm.author.ar}
                        onChange={(e) => setBlogForm({ ...blogForm, author: { ...blogForm.author, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldImageUrl')}</label>
                      <input
                        type="url"
                        required
                        value={blogForm.imageUrl}
                        onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldContentEn')}</label>
                      <textarea
                        required
                        rows={6}
                        value={blogForm.content.en}
                        onChange={(e) => setBlogForm({ ...blogForm, content: { ...blogForm.content, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 whitespace-pre-line"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldContentAr')}</label>
                      <textarea
                        required
                        rows={6}
                        value={blogForm.content.ar}
                        onChange={(e) => setBlogForm({ ...blogForm, content: { ...blogForm.content, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 whitespace-pre-line"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. FAQ Schema Form */}
              {activeTab === 'faqs' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldQuestionEn')}</label>
                      <input
                        type="text"
                        required
                        value={faqForm.question.en}
                        onChange={(e) => setFaqForm({ ...faqForm, question: { ...faqForm.question, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldQuestionAr')}</label>
                      <input
                        type="text"
                        required
                        value={faqForm.question.ar}
                        onChange={(e) => setFaqForm({ ...faqForm, question: { ...faqForm.question, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldAnswerEn')}</label>
                      <textarea
                        required
                        rows={4}
                        value={faqForm.answer.en}
                        onChange={(e) => setFaqForm({ ...faqForm, answer: { ...faqForm.answer, en: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('fieldAnswerAr')}</label>
                      <textarea
                        required
                        rows={4}
                        value={faqForm.answer.ar}
                        onChange={(e) => setFaqForm({ ...faqForm, answer: { ...faqForm.answer, ar: e.target.value } })}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-855 bg-white dark:bg-gray-850 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-150 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-850 rounded-xl transition-all"
                >
                  {t('crudCancel')}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-primary-500/10"
                >
                  <Save className="h-4.5 w-4.5" />
                  <span>{t('crudSave')}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
