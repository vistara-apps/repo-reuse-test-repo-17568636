'use client';

import { useState } from 'react';
import { User } from '../../lib/types';
import { updateUserProfile, checkUsernameAvailability } from '../../lib/services/userService';
import { Button } from '../ui/Button';

interface ProfileFormProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

export function ProfileForm({ user, onUpdate }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    username: user.username || '',
    bio: user.bio || '',
    avatarUrl: user.avatarUrl || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = async () => {
    const newErrors: Record<string, string> = {};
    
    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (formData.username !== user.username) {
      // Check username availability only if it changed
      setIsCheckingUsername(true);
      try {
        const isAvailable = await checkUsernameAvailability(formData.username);
        if (!isAvailable) {
          newErrors.username = 'Username is already taken';
        }
      } catch (error) {
        newErrors.username = 'Error checking username availability';
      } finally {
        setIsCheckingUsername(false);
      }
    }
    
    // Bio validation
    if (formData.bio && formData.bio.length > 160) {
      newErrors.bio = 'Bio must be less than 160 characters';
    }
    
    // Avatar URL validation
    if (formData.avatarUrl && !formData.avatarUrl.match(/^(https?:\/\/)/)) {
      newErrors.avatarUrl = 'Avatar URL must start with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) return;
    
    setIsSubmitting(true);
    
    try {
      const updatedUser = await updateUserProfile(user.address, formData);
      onUpdate(updatedUser);
      
      // Show success message
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className={`block w-full rounded-md shadow-sm sm:text-sm ${
              errors.username 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            disabled={isSubmitting || isCheckingUsername}
          />
          {isCheckingUsername && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </div>
        {errors.username && (
          <p className="mt-2 text-sm text-red-600">{errors.username}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <div className="mt-1">
          <textarea
            name="bio"
            id="bio"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
            className={`block w-full rounded-md shadow-sm sm:text-sm ${
              errors.bio 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            disabled={isSubmitting}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {formData.bio?.length || 0}/160 characters
        </p>
        {errors.bio && (
          <p className="mt-2 text-sm text-red-600">{errors.bio}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
          Avatar URL
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="avatarUrl"
            id="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
            className={`block w-full rounded-md shadow-sm sm:text-sm ${
              errors.avatarUrl 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            disabled={isSubmitting}
          />
        </div>
        {errors.avatarUrl && (
          <p className="mt-2 text-sm text-red-600">{errors.avatarUrl}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting || isCheckingUsername}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}

