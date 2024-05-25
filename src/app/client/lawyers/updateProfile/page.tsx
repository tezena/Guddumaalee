'use client'
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileForm from './UpdateProfile';

const Home: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [languages, setLanguages] = useState<{ name: string; proficiency: string }[]>([]);
  const [courtWorked, setCourtWorked] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string>('https://via.placeholder.com/150');
  const [bio, setBio] = useState<string>('This is a short bio.');

  const sidebarItems = ['Language', 'Court Worked', 'Experience'];

  const handleAddItem = (item: string) => {
    setActiveItem(item);
  };

  const handleSubmit = (data: { type: string; value: any }) => {
    if (data.type === 'Language') {
      setLanguages([...languages, data.value]);
    } else if (data.type === 'Court Worked') {
      setCourtWorked([...courtWorked, data.value]);
    } else if (data.type === 'Experience') {
      setExperience([...experience, data.value]);
    }
    setActiveItem(null); // Close the form after submission
  };

  const handleUpdatePhoto = (photo: string) => {
    setProfilePhoto(photo);
  };

  const handleUpdateBio = (bio: string) => {
    setBio(bio);
  };

  const initialData = {
    language: languages.length > 0 ? languages[languages.length - 1] : null,
    courtWorked: courtWorked.length > 0 ? courtWorked[courtWorked.length - 1] : null,
    experience: experience.length > 0 ? experience[experience.length - 1] : null,
  };

  return (
    <div className="flex">
      <Sidebar
        items={sidebarItems}
        activeItem={activeItem}
        onAddItem={handleAddItem}
        onSubmit={handleSubmit}
        initialData={initialData}
      />
      <div className="flex-grow p-4">
        <ProfileForm
          languages={languages}
          courtWorked={courtWorked}
          experience={experience}
          profilePhoto={profilePhoto}
          bio={bio}
          onUpdatePhoto={handleUpdatePhoto}
          onUpdateBio={handleUpdateBio}
        />
      </div>
    </div>
  );
};

export default Home;
