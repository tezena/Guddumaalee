'use client'
import React, { useState } from 'react';
import ClientProfileForm from './ClientProfile';

const ClientProfilePage: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<string>('https://via.placeholder.com/150');
  const [email, setEmail] = useState<string>('example@example.com');
  const [phoneNumber, setPhoneNumber] = useState<string>('+1234567890');
  const [firstName, setFirstName] = useState<string>('John');
  const [lastName, setLastName] = useState<string>('Doe');

  const handleUpdatePhoto = (photo: string) => {
    setProfilePhoto(photo);
  };

  const handleUpdateEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleUpdatePhoneNumber = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleUpdateFirstName = (newFirstName: string) => {
    setFirstName(newFirstName);
  };

  const handleUpdateLastName = (newLastName: string) => {
    setLastName(newLastName);
  };

  return (
    <div className="container mx-auto">
      <ClientProfileForm
        profilePhoto={profilePhoto}
        email={email}
        phoneNumber={phoneNumber}
        firstName={firstName}
        lastName={lastName}
        onUpdatePhoto={handleUpdatePhoto}
        onUpdateEmail={handleUpdateEmail}
        onUpdatePhoneNumber={handleUpdatePhoneNumber}
        onUpdateFirstName={handleUpdateFirstName}
        onUpdateLastName={handleUpdateLastName}
      />
    </div>
  );
};

export default ClientProfilePage;
