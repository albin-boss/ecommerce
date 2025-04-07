import React, { useState } from 'react';
import { Moon } from 'lucide-react';

export default function Profile() {
  const [firstName, setFirstName] = useState('Albin');
  const [lastName, setLastName] = useState('Kalarikkal');
  const [email, setEmail] = useState('albinkalarikkal9074@gmail.com');
  const [mobile, setMobile] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingMobile, setEditingMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'flex min-h-screen bg-gray-900 text-white' : 'flex min-h-screen bg-white text-black'}>
      {/* Sidebar */}
      <aside className={darkMode ? 'w-64 bg-gray-800 p-6 shadow-md' : 'w-64 bg-gray-100 p-6 shadow-md'}>
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
        <ul className="space-y-3 text-sm">
          <li className="text-blue-400 font-medium">Profile Information</li>
          <li className="hover:text-blue-400 cursor-pointer">Manage Addresses</li>
          <li className="hover:text-blue-400 cursor-pointer">PAN Card Information</li>
        </ul>

        {/* Payments */}
        <div className="mb-4 mt-6">
          <h2 className="text-md font-semibold text-white mb-2">PAYMENTS</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">Gift Cards <span className="text-green-400">₹0</span></li>
            <li className="hover:text-blue-400 cursor-pointer">Saved UPI</li>
            <li className="hover:text-blue-400 cursor-pointer">Saved Cards</li>
          </ul>
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-4">My Stuff</h2>
        <ul className="space-y-3 text-sm">
          <li className="hover:text-blue-400 cursor-pointer">My Coupons</li>
          <li className="hover:text-blue-400 cursor-pointer">My Reviews & Ratings</li>
          <li className="hover:text-blue-400 cursor-pointer">All Notifications</li>
          <li className="hover:text-blue-400 cursor-pointer">My Wishlist</li>
        </ul>

        <button className="mt-8 text-red-400 font-medium">Logout</button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Personal Information</h1>
          <button
            className="flex items-center px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => setDarkMode(!darkMode)}
          >
            <Moon size={18} />
          </button>
        </div>

        <div className={darkMode ? 'space-y-4 bg-gray-800 shadow p-6 rounded-2xl' : 'space-y-4 bg-white shadow p-6 rounded-2xl'}>
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border p-2 rounded w-full bg-transparent"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border p-2 rounded w-full bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Your Gender</label>
            <div className="flex items-center gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="male" defaultChecked /> Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="female" /> Female
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            {editingEmail ? (
              <div className="flex gap-2 mt-1">
                <input
                  type="email"
                  className="border p-2 rounded w-full bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={() => setEditingEmail(false)} className="text-blue-400 font-medium">Save</button>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-1">
                <span>{email}</span>
                <button onClick={() => setEditingEmail(true)} className="text-blue-400 font-medium">Edit</button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Mobile Number</label>
            {editingMobile ? (
              <div className="flex gap-2 mt-1">
                <input
                  type="tel"
                  className="border p-2 rounded w-full bg-transparent"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <button onClick={() => setEditingMobile(false)} className="text-blue-400 font-medium">Save</button>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-1">
                <span>{mobile || 'Not Provided'}</span>
                <button onClick={() => setEditingMobile(true)} className="text-blue-400 font-medium">Edit</button>
              </div>
            )}
          </div>
        </div>

        <div className={darkMode ? 'mt-10 bg-gray-800 shadow p-6 rounded-2xl' : 'mt-10 bg-white shadow p-6 rounded-2xl'}>
          <h2 className="text-xl font-semibold mb-4">FAQs</h2>
          <div className="space-y-4 text-sm">
            <div>
              <strong>What happens when I update my email address (or mobile number)?</strong>
              <p>Your login email ID (or mobile number) changes. You'll receive all your account-related communication on your updated email or mobile number.</p>
            </div>
            <div>
              <strong>When will my Flipkart account be updated with the new email address (or mobile number)?</strong>
              <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
            </div>
            <div>
              <strong>What happens to my existing Flipkart account when I update my email address (or mobile number)?</strong>
              <p>Your account remains fully functional. You'll continue seeing your order history, saved information, and personal details.</p>
            </div>
            <div>
              <strong>Does my Seller account get affected when I update my email address?</strong>
              <p>Flipkart has a ‘single sign-on’ policy. Any changes will reflect in your Seller account also.</p>
            </div>
          </div>

          <div className="mt-4 flex gap-6 text-sm font-medium">
            <a href="#" className="text-blue-400">Deactivate Account</a>
            <a href="#" className="text-red-400">Delete Account</a>
          </div>
        </div>
      </div>
    </div>
  );
}