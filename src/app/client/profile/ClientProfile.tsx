import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { getClientById, updateClient } from "../api/client";
import { useSession } from "next-auth/react";

interface ClientProfileFormProps {
  profilePhoto: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  onUpdatePhoto: (photo: string) => void;
  onUpdateEmail: (email: string) => void;
  onUpdatePhoneNumber: (phoneNumber: string) => void;
  onUpdateFirstName: (firstName: string) => void;
  onUpdateLastName: (lastName: string) => void;
}

const MAX_PHOTO_SIZE_MB = 2; // Maximum file size in MB

const ClientProfileForm: React.FC<ClientProfileFormProps> = ({
  profilePhoto,
  email,
  phoneNumber,
  firstName,
  lastName,
  onUpdatePhoto,
  onUpdateEmail,
  onUpdatePhoneNumber,
  onUpdateFirstName,
  onUpdateLastName,
}) => {
  const queryClient = useQueryClient();
  const {data:session}= useSession()

// @ts-ignore
  const client_id = session?.user?.image?.id

const {data,isLoading,error} = useQuery({
queryKey:['client'],
queryFn:()=>getClientById(client_id)
})

const updateMutation: UseMutationResult<void, unknown, object> = useMutation({
  mutationFn: (data:object) => updateClient(data,client_id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["disputes"] });
  },
});


  const [newPhoto, setNewPhoto] = useState(profilePhoto);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);

  const handlePhotoSubmit =async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data ={ 
      photo:newPhoto,
      phone_number:newPhoneNumber,
      full_name:newFirstName +" "+ newLastName
    }

     await updateMutation.mutateAsync(data)

    // const file = event.target.files?.[0];
    // if (file) {
    //   const fileSizeMB = file.size / (1024 * 1024);
    //   if (fileSizeMB > MAX_PHOTO_SIZE_MB) {
    //     alert(
    //       `The file size exceeds ${MAX_PHOTO_SIZE_MB}MB. Please upload a smaller photo.`
    //     );
    //     return;
    //   }

    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     if (reader.result) {
    //       onUpdatePhoto(reader.result as string);
    //       setNewPhoto(reader.result as string);
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const handleEmailSubmit = () => {
    onUpdateEmail(newEmail);
    setIsEditingEmail(false);
  };

  const handlePhoneNumberSubmit = () => {
    onUpdatePhoneNumber(newPhoneNumber);
    setIsEditingPhoneNumber(false);
  };

  const handleFirstNameSubmit = () => {
    onUpdateFirstName(newFirstName);
    setIsEditingFirstName(false);
  };

  const handleLastNameSubmit = () => {
    onUpdateLastName(newLastName);
    setIsEditingLastName(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Client Profile</h2>
      <div className="mb-4 text-center relative">
        <div className=" relative inline-block">
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-aut "
        />
        <div
          className="absolute bottom-0 transform translate-y-1/2 bg-white right-0 w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer"
          onClick={() => setIsEditingPhoto(true)}
        >
          <Icon icon="ic:outline-edit" color="green" width={20} height={20} />
        </div>
        </div>
        {isEditingPhoto && (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoSubmit}
            className="border p-2 w-full mt-2"
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Email</label>
        {isEditingEmail ? (
          <div className="flex gap-4">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleEmailSubmit}
              className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Email
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <p>{email}</p>
            <div className="ml-2">
              <Icon
                icon="ic:outline-edit"
                color="green"
                width={20}
                height={20}
                onClick={() => setIsEditingEmail(true)}
                className="cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Phone Number</label>
        {isEditingPhoneNumber ? (
          <div className="flex">
            <input
              type="tel"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handlePhoneNumberSubmit}
              className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{phoneNumber}</p>
            <div
              className="bg-white w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer"
              onClick={() => setIsEditingPhoneNumber(true)}
            >
              <Icon
                icon="ic:outline-edit"
                color="green"
                width={20}
                height={20}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">First Name</label>
        {isEditingFirstName ? (
          <div className="flex">
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleFirstNameSubmit}
              className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{firstName}</p>
            <div
              className="bg-white w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer"
              onClick={() => setIsEditingFirstName(true)}
            >
              <Icon
                icon="ic:outline-edit"
                color="green"
                width={20}
                height={20}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Last Name</label>
        {isEditingLastName ? (
          <div className="flex">
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleLastNameSubmit}
              className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{lastName}</p>
            <div
              className="bg-white w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer"
              onClick={() => setIsEditingLastName(true)}
            >
              <Icon
                icon="ic:outline-edit"
                color="green"
                width={20}
                height={20}
              />
            </div>
          </div>
        )}
      </div>

      {/* Repeat similar pattern for other fields (phoneNumber, firstName, lastName) */}
    </div>
  );
};

export default ClientProfileForm;
