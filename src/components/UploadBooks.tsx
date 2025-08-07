import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Upload, FileText, Award, CheckCircle, XCircle } from 'lucide-react';

interface UploadedBook {
  id: string;
  title: string;
  author: string;
  category: string;
  file: File;
  status: 'pending' | 'approved' | 'rejected';
  uploadDate: Date;
  creditsAwarded?: number;
}

const UploadBooks: React.FC = () => {
  const { userProfile } = useAuth();
  const [uploadedBooks, setUploadedBooks] = useState<UploadedBook[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    file: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, file }));
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.category || !formData.file) {
      alert('Please fill in all fields and select a PDF file');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newBook: UploadedBook = {
        id: Date.now().toString(),
        title: formData.title,
        author: formData.author,
        category: formData.category,
        file: formData.file!,
        status: 'pending',
        uploadDate: new Date()
      };

      setUploadedBooks(prev => [newBook, ...prev]);
      setFormData({ title: '', author: '', category: '', file: null });
      setIsUploading(false);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }, 2000);
  };

  const categories = [
    'Programming', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry',
    'Biology', 'Literature', 'History', 'Philosophy', 'Business', 'Other'
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upload Books</h1>
          <p className="text-gray-600">Share knowledge and earn credits</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Your Credits</p>
          <p className="text-2xl font-bold text-indigo-600">{userProfile?.credits || 0}</p>
          <p className="text-xs text-gray-500">
            {500 - (userProfile?.credits || 0)} more for surprise!
          </p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Upload New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter book title"
                required
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter author name"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                PDF File *
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Upload Book
              </>
            )}
          </button>
        </form>
      </div>

      {/* Credit System Info */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <Award className="h-6 w-6 mr-3" />
          <h3 className="text-xl font-bold">Credit System</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm opacity-90">Credits per approved book</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">500</p>
            <p className="text-sm opacity-90">Credits for surprise reward</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">24h</p>
            <p className="text-sm opacity-90">Average approval time</p>
          </div>
        </div>
      </div>

      {/* Uploaded Books */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Uploaded Books</h2>
        {uploadedBooks.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No books uploaded yet</p>
            <p className="text-sm text-gray-400">Upload your first book to start earning credits!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {uploadedBooks.map((book) => (
              <div key={book.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-gray-600 text-sm">by {book.author}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Uploaded on {book.uploadDate.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    book.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    book.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {book.status === 'pending' && <><span className="animate-pulse">●</span> Pending</>}
                    {book.status === 'approved' && <><CheckCircle className="h-3 w-3 inline mr-1" /> Approved</>}
                    {book.status === 'rejected' && <><XCircle className="h-3 w-3 inline mr-1" /> Rejected</>}
                  </span>
                  {book.creditsAwarded && (
                    <div className="flex items-center text-green-600 text-sm font-semibold">
                      <Award className="h-4 w-4 mr-1" />
                      +{book.creditsAwarded}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadBooks;