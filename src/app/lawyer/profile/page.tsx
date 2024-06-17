'use client'
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileForm from './UpdateProfile'; // Correct import

const Home: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [languages, setLanguages] = useState<{ name: string }[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string>('https://via.placeholder.com/150');
  const [bio, setBio] = useState<string>('This is a short bio.');
  const [fullName, setFullName] = useState<string>('John Doe');
  const [phoneNumber, setPhoneNumber] = useState<string>('123-456-7890');
  const [resume, setResume] = useState<string>(''); // State to store resume URL

  const sidebarItems = ['Language'];

  const handleAddItem = (item: string) => {
    setActiveItem(item);
  };

  const handleSubmit = (data: { type: string; value: any }) => {
    if (data.type === 'Language') {
      setLanguages([...languages, data.value]);
    } else if (data.type === 'Resume') {
      setResume(data.value);
    }
  };

  const handleUpdatePhoto = (newPhoto: string) => {
    setProfilePhoto(newPhoto);
  };

  const handleUpdateBio = (newBio: string) => {
    setBio(newBio);
  };

  const handleUpdateLanguage = (index: number, updatedLanguage: { name: string }) => {
    const newLanguages = [...languages];
    newLanguages[index] = updatedLanguage;
    setLanguages(newLanguages);
  };

  const handleUpdateFullName = (newFullName: string) => {
    setFullName(newFullName);
  };

  const handleUpdatePhoneNumber = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
  };

  return (
    <div className="flex">
      <Sidebar
        items={sidebarItems}
        activeItem={activeItem}
        onAddItem={handleAddItem}
        onSubmit={handleSubmit}
        initialData={{ language: languages, resume }}
      />
      <ProfileForm
        languages={languages}
        profilePhoto={profilePhoto}
        bio={bio}
        fullName={fullName}
        phoneNumber={phoneNumber}
        onUpdatePhoto={handleUpdatePhoto}
        onUpdateBio={handleUpdateBio}
        onUpdateLanguage={handleUpdateLanguage}
        onUpdateFullName={handleUpdateFullName}
        onUpdatePhoneNumber={handleUpdatePhoneNumber}
        onUpdateResume={setResume} // Pass function to update resume
      />
    </div>
  );
};

export default Home;
