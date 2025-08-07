import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, Award, Edit3, Save, X } from 'lucide-react';

const Profile: React.FC = () => {
  const { userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    displayName: userProfile?.displayName || '',
    email: userProfile?.email || ''
  });

  const handleSave = () => {
    // In a real app, you would update the user profile in Firebase
    console.log('Saving profile:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      displayName: userProfile?.displayName || '',
      email: userProfile?.email || ''
    });
    setIsEditing(false);
  };

  if (!userProfile) return null;

  const creditsToSurprise = 500 - userProfile.credits;
  const surpriseProgress = (userProfile.credits / 500) * 100;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="flex items-center mb-8">
            <img
              src={userProfile.photoURL || '/default-avatar.png'}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-indigo-200 mr-6"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{userProfile.displayName}</h3>
              <p className="text-gray-600">{userProfile.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {userProfile.joinedAt.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.displayName}
                    onChange={(e) => setEditData(prev => ({ ...prev, displayName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.displayName}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <p className="text-gray-900">{userProfile.joinedAt.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Rewards */}
        <div className="space-y-6">
          {/* Credits & Rewards */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 mr-3" />
              <h3 className="text-xl font-bold">Credits & Rewards</h3>
            </div>
            <div className="text-center mb-4">
              <p className="text-3xl font-bold">{userProfile.credits}</p>
              <p className="text-sm opacity-90">Total Credits</p>
            </div>
            
            {userProfile.credits >= 500 ? (
              <div className="text-center">
                <div className="text-2xl mb-2">🎉</div>
                <p className="font-semibold">Surprise Available!</p>
                <button className="mt-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                  Claim Surprise
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to surprise</span>
                  <span>{creditsToSurprise} more needed</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(surpriseProgress, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Reading Stats */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reading Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Books Read</span>
                <span className="font-semibold text-indigo-600">{userProfile.booksRead.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Book</span>
                <span className="font-semibold text-gray-900">
                  {userProfile.currentBook ? 'Reading...' : 'None'}
                </span>
              </div>
              {userProfile.currentBook && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Page</span>
                  <span className="font-semibold text-gray-900">{userProfile.currentBook.page}</span>
                </div>
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Change Password
              </button>
              <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Privacy Settings
              </button>
              <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Download Data
              </button>
              <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;