import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Book, TrendingUp, Clock, Award, Eye, Download } from 'lucide-react';

interface BookData {
  id: string;
  title: string;
  author: string;
  category: string;
  pages: number;
  uploadedBy: string;
  approved: boolean;
  downloadUrl: string;
  coverUrl: string;
}

const Dashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [books, setBooks] = useState<BookData[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockBooks: BookData[] = [
      {
        id: '1',
        title: 'Introduction to React',
        author: 'John Doe',
        category: 'Programming',
        pages: 250,
        uploadedBy: 'admin@studyverse.com',
        approved: true,
        downloadUrl: '/books/react-intro.pdf',
        coverUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: '2',
        title: 'Advanced JavaScript Concepts',
        author: 'Jane Smith',
        category: 'Programming',
        pages: 180,
        uploadedBy: 'user@example.com',
        approved: true,
        downloadUrl: '/books/js-advanced.pdf',
        coverUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: '3',
        title: 'Data Structures and Algorithms',
        author: 'Mike Johnson',
        category: 'Computer Science',
        pages: 320,
        uploadedBy: 'educator@studyverse.com',
        approved: true,
        downloadUrl: '/books/dsa.pdf',
        coverUrl: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ];
    setBooks(mockBooks);
  }, []);

  const totalBooks = books.length;
  const booksReadCount = userProfile?.booksRead.length || 0;
  const readingProgress = totalBooks > 0 ? (booksReadCount / totalBooks) * 100 : 0;
  const currentReadingBook = userProfile?.currentBook ? books.find(b => b.id === userProfile.currentBook?.id) : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userProfile?.displayName}! 📚</p>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg">
          <div className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            <span className="font-semibold">{userProfile?.credits || 0} Credits</span>
          </div>
          {(userProfile?.credits || 0) >= 500 && (
            <p className="text-sm mt-1 opacity-90 animate-pulse">🎉 Surprise available!</p>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Books</p>
              <p className="text-3xl font-bold text-indigo-600">{totalBooks}</p>
            </div>
            <Book className="h-12 w-12 text-indigo-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Books Read</p>
              <p className="text-3xl font-bold text-green-600">{booksReadCount}</p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-3xl font-bold text-purple-600">{Math.round(readingProgress)}%</p>
            </div>
            <Clock className="h-12 w-12 text-purple-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Credits</p>
              <p className="text-3xl font-bold text-yellow-600">{userProfile?.credits || 0}</p>
            </div>
            <Award className="h-12 w-12 text-yellow-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Currently Reading */}
      {currentReadingBook && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Currently Reading</h2>
          <div className="flex items-center space-x-4">
            <img
              src={currentReadingBook.coverUrl}
              alt={currentReadingBook.title}
              className="w-16 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{currentReadingBook.title}</h3>
              <p className="text-gray-600">by {currentReadingBook.author}</p>
              <p className="text-sm text-gray-500 mt-1">
                Page {userProfile?.currentBook?.page || 1} of {currentReadingBook.pages}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((userProfile?.currentBook?.page || 1) / currentReadingBook.pages) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Available Books */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-indigo-300"
              onClick={() => setSelectedBook(book)}
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-gray-900 mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{book.pages} pages</span>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                  {book.category}
                </span>
              </div>
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center">
                  <Eye className="h-4 w-4 mr-1" />
                  Read
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading History */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Reading History</h2>
        {booksReadCount === 0 ? (
          <p className="text-gray-500 text-center py-8">No books read yet. Start your reading journey!</p>
        ) : (
          <div className="space-y-3">
            {userProfile?.booksRead.map((bookId) => {
              const book = books.find(b => b.id === bookId);
              return book ? (
                <div key={bookId} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-10 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{book.title}</p>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                  </div>
                  <div className="text-green-600">
                    <Award className="h-5 w-5" />
                  </div>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;