import React, { useState, useEffect } from 'react';
import { Users, Book, CheckCircle, XCircle, Send, Eye, BarChart3 } from 'lucide-react';

interface Student {
  uid: string;
  email: string;
  displayName: string;
  credits: number;
  booksRead: string[];
  joinedAt: Date;
}

interface BookEntry {
  id: string;
  title: string;
  author: string;
  category: string;
  uploadedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadDate: Date;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'books' | 'notifications'>('students');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [books, setBooks] = useState<BookEntry[]>([]);
  const [notificationData, setNotificationData] = useState({
    recipient: '',
    title: '',
    message: ''
  });

  // Mock data
  useEffect(() => {
    if (isAuthenticated) {
      setStudents([
        {
          uid: '1',
          email: 'student1@example.com',
          displayName: 'John Smith',
          credits: 75,
          booksRead: ['1', '2'],
          joinedAt: new Date('2024-01-15')
        },
        {
          uid: '2',
          email: 'student2@example.com',
          displayName: 'Sarah Johnson',
          credits: 120,
          booksRead: ['1'],
          joinedAt: new Date('2024-02-01')
        },
        {
          uid: '3',
          email: 'student3@example.com',
          displayName: 'Mike Davis',
          credits: 340,
          booksRead: ['1', '2', '3'],
          joinedAt: new Date('2024-01-20')
        }
      ]);

      setBooks([
        {
          id: '1',
          title: 'Advanced React Patterns',
          author: 'Tech Expert',
          category: 'Programming',
          uploadedBy: 'student1@example.com',
          status: 'pending',
          uploadDate: new Date('2024-03-01')
        },
        {
          id: '2',
          title: 'JavaScript Fundamentals',
          author: 'Code Master',
          category: 'Programming',
          uploadedBy: 'student2@example.com',
          status: 'approved',
          uploadDate: new Date('2024-02-28')
        },
        {
          id: '3',
          title: 'Database Design Principles',
          author: 'DB Expert',
          category: 'Computer Science',
          uploadedBy: 'student3@example.com',
          status: 'rejected',
          uploadDate: new Date('2024-02-25')
        }
      ]);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2580172') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleBookAction = (bookId: string, action: 'approve' | 'reject') => {
    setBooks(prev => prev.map(book => 
      book.id === bookId ? { ...book, status: action === 'approve' ? 'approved' : 'rejected' } : book
    ));
    
    if (action === 'approve') {
      // Award 5 credits to uploader
      const book = books.find(b => b.id === bookId);
      if (book) {
        setStudents(prev => prev.map(student => 
          student.email === book.uploadedBy 
            ? { ...student, credits: student.credits + 5 }
            : student
        ));
      }
    }
  };

  const sendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending notification
    alert(`Notification sent to ${notificationData.recipient || 'all students'}`);
    setNotificationData({ recipient: '', title: '', message: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Panel</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-blue-100 text-sm font-medium mb-2">
                Enter Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-blue-200 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                placeholder="Admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-indigo-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'students', label: 'Students', icon: Users },
          { id: 'books', label: 'Books', icon: Book },
          { id: 'notifications', label: 'Notifications', icon: Send }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Registered Students</h2>
              <div className="text-sm text-gray-600">
                Total: {students.length} students
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books Read</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.uid} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.displayName}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {student.credits} credits
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.booksRead.length} books
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.joinedAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Books Tab */}
      {activeTab === 'books' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Book Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploader</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{book.title}</div>
                        <div className="text-sm text-gray-500">by {book.author}</div>
                        <div className="text-xs text-gray-400">{book.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.uploadedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        book.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        book.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.uploadDate.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleBookAction(book.id, 'approve')}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleBookAction(book.id, 'reject')}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Send Notifications</h2>
          <form onSubmit={sendNotification} className="space-y-4">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
                Recipient (leave empty for all students)
              </label>
              <input
                type="email"
                id="recipient"
                value={notificationData.recipient}
                onChange={(e) => setNotificationData(prev => ({ ...prev, recipient: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="student@example.com or leave empty"
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Notification Title *
              </label>
              <input
                type="text"
                id="title"
                value={notificationData.title}
                onChange={(e) => setNotificationData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter notification title"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                rows={4}
                value={notificationData.message}
                onChange={(e) => setNotificationData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your message"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Send Notification
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;