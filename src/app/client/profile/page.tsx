'use client'
import React, { useState } from 'react';
import ClientProfileForm from './ClientProfile';

const ClientProfilePage: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [fullName, setFullName] = useState<string>('John Doe');
  const [phoneNumber, setPhoneNumber] = useState<string>('+1234567890');

  const handleUpdatePhoto = (photo: string) => {
    setProfilePhoto(photo);
  };

  const handleUpdatePhoneNumber = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleUpdateFullName = (newFullName: string) => {
    setFullName(newFullName);
  };

  return (
    <div className="container mx-auto">
      <ClientProfileForm
        profilePhoto={profilePhoto}
        fullName={fullName}
        phoneNumber={phoneNumber}
        onUpdatePhoto={handleUpdatePhoto}
        onUpdatePhoneNumber={handleUpdatePhoneNumber}
        onUpdateFullName={handleUpdateFullName}
      />
    </div>
  );
};

export default ClientProfilePage;
