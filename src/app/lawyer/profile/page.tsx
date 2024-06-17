'use client'
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileForm from './UpdateProfile'; // Correct import

const Home: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [languages, setLanguages] = useState<{ name: string; proficiency: string }[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string>('https://via.placeholder.com/150');
  const [bio, setBio] = useState<string>('This is a short bio.');

  const sidebarItems = ['Language', 'Experience'];

  const handleAddItem = (item: string) => {
    setActiveItem(item);
  };

  const handleSubmit = (data: { type: string; value: any }) => {
    if (data.type === 'Language') {
      setLanguages([...languages, data.value]);
    } else if (data.type === 'Experience') {
      setExperience([...experience, data.value]);
    }
  };

  const handleUpdatePhoto = (newPhoto: string) => {
    setProfilePhoto(newPhoto);
  };

  const handleUpdateBio = (newBio: string) => {
    setBio(newBio);
  };

  const handleUpdateLanguage = (index: number, updatedLanguage: { name: string; proficiency: string }) => {
    const newLanguages = [...languages];
    newLanguages[index] = updatedLanguage;
    setLanguages(newLanguages);
  };

  return (
    <div className="flex">
      <Sidebar
        items={sidebarItems}
        activeItem={activeItem}
        onAddItem={handleAddItem}
        onSubmit={handleSubmit}
        initialData={{ language: languages, experience }}
      />
      <ProfileForm
        languages={languages}
        experience={experience}
        profilePhoto={profilePhoto}
        bio={bio}
        onUpdatePhoto={handleUpdatePhoto}
        onUpdateBio={handleUpdateBio}
        onUpdateLanguage={handleUpdateLanguage}
      />
    </div>
  );
};

export default Home;
