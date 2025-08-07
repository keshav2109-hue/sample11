import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Users, Trophy, Star, Zap, Shield, Globe, TrendingUp } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-teal-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <BookOpen className="h-20 w-20 text-white mr-4 drop-shadow-lg" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <div>
              <h1 className="text-7xl font-bold text-white drop-shadow-lg">StudyVerse</h1>
              <div className="text-teal-300 text-lg font-medium tracking-wider">BOOK UNIVERSE</div>
            </div>
          </div>
          <p className="text-2xl text-blue-100 mb-4 font-light">
            Your Gateway to Unlimited Knowledge & Learning
          </p>
          <p className="text-lg text-blue-200 opacity-90">
            Discover, Read, Learn, and Earn Credits in the Ultimate Digital Library
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-teal-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Unlimited Books</h3>
              <p className="text-blue-100 text-sm">Access thousands of PDF books with our built-in reader</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Progress Tracking</h3>
              <p className="text-blue-100 text-sm">Monitor your reading journey with detailed analytics</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <Trophy className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Earn Credits</h3>
              <p className="text-blue-100 text-sm">Upload quality books and earn credits for rewards</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <Star className="h-12 w-12 text-pink-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Surprises</h3>
              <p className="text-blue-100 text-sm">Unlock amazing rewards at 500 credits milestone</p>
            </div>
          </div>
        </div>

        {/* Detailed Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Zap className="h-8 w-8 text-yellow-300 mr-3" />
              <h2 className="text-2xl font-bold text-white">Powerful Features</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-blue-100">
                <Globe className="h-5 w-5 mr-3 text-teal-300" />
                <span>Fetch books from public Telegram channels</span>
              </div>
              <div className="flex items-center text-blue-100">
                <BookOpen className="h-5 w-5 mr-3 text-teal-300" />
                <span>Advanced PDF viewer with bookmarks</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Users className="h-5 w-5 mr-3 text-teal-300" />
                <span>Real-time reading progress synchronization</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Shield className="h-5 w-5 mr-3 text-teal-300" />
                <span>Secure Google authentication system</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-6">
              <Trophy className="h-8 w-8 text-yellow-300 mr-3" />
              <h2 className="text-2xl font-bold text-white">Why Choose Us?</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start text-blue-100">
                <div className="w-2 h-2 bg-teal-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Comprehensive analytics dashboard with reading insights</span>
              </div>
              <div className="flex items-start text-blue-100">
                <div className="w-2 h-2 bg-purple-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Credit-based reward system with exciting surprises</span>
              </div>
              <div className="flex items-start text-blue-100">
                <div className="w-2 h-2 bg-pink-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Admin-managed quality control for all content</span>
              </div>
              <div className="flex items-start text-blue-100">
                <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Real-time notifications and community features</span>
              </div>
              <div className="flex items-start text-blue-100">
                <div className="w-2 h-2 bg-green-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Cross-device synchronization and cloud storage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-10 border border-white/30 inline-block shadow-2xl">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Ready to Start Learning?</h3>
              <p className="text-blue-100 text-lg">
                Join thousands of learners in the StudyVerse community
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-8 text-sm text-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div>Books Available</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div>Active Readers</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div>Access</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={login}
              className="bg-gradient-to-r from-white to-blue-50 text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg hover:from-blue-50 hover:to-white transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 border-white/20"
            >
              <div className="flex items-center">
                <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </div>
            </button>
            
            <p className="text-xs text-blue-200 mt-4 opacity-75">
              Secure authentication • No spam • Free forever
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;