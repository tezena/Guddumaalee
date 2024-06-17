import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image";

import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { getClientById, updateClient } from "../api/client";
import { useSession } from "next-auth/react";

interface ClientProfileFormProps {
  profilePhoto: string;
  fullName: string;
  phoneNumber: string;
  onUpdatePhoto: (photo: string) => void;
  onUpdatePhoneNumber: (phoneNumber: string) => void;
  onUpdateFullName: (fullName: string) => void;
}

const ClientProfileForm: React.FC<ClientProfileFormProps> = ({
  profilePhoto,
  fullName,
  phoneNumber,
  onUpdatePhoto,
  onUpdatePhoneNumber,
  onUpdateFullName,
}) => {
  
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  // @ts-ignore
  const client_id = session?.user?.image?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["client"],
    queryFn: () => getClientById(client_id),
  });

  const updateMutation: UseMutationResult<void, unknown, object> = useMutation({
    mutationFn: (data: object) => updateClient(data, client_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    },
  });

const [newPhoto, setNewPhoto] = useState('https://utfs.io/f/2af8c841-20cc-4696-aae6-33cfb4271fa2-1t0lc7.jpg');
  const [newFullName, setNewFullName] = useState(fullName);
  
 
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const { toast } = useToast();
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);  

  const handlePhotoSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = {
      photo: newPhoto,
      phone_number: newPhoneNumber,
      full_name: newFullName,
    };

    await updateMutation.mutateAsync(data);
  };

  const handlePhoneNumberSubmit = () => {
    onUpdatePhoneNumber(newPhoneNumber);
    setIsEditingPhoneNumber(false);
  };

  const handleFullNameSubmit = () => {
    onUpdateFullName(newFullName);
    setIsEditingFullName(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Client Profile</h2>
      <div className="mb-4 text-center relative">
        <div className="relative inline-block space-y-2 lg:w-[300px]">
          <label className="block text-gray-700 font-bold">Profile Photo</label>
          {!newPhoto ? (
            <UploadDropzone
              className="p-2 border border-gray-600"
              endpoint="fileUploader"
              onClientUploadComplete={(res) => {
                const photoUrl = res[0].url;
                onUpdatePhoto(photoUrl);
                setNewPhoto(photoUrl);
              }}
              onUploadError={(error: Error) => {
                toast({ title: `ERROR! ${error.message}` });
              }}
            />
          ) : (
            <div className="flex flex-col items-center">
              <Image
                src={newPhoto}
                width={200}
                height={200}
                alt="Profile Photo"
                className="w-[200px] h-[200px] object-cover rounded-full"
              />
              <button
                onClick={() => {
                  onUpdatePhoto("");
                  setNewPhoto("");
                }}
                className="w-[200px] bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Choose Another Photo
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Full Name</label>
        {isEditingFullName ? (
          <div className="flex">
            <input
              type="text"
              value={newFullName}
              onChange={(e) => setNewFullName(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleFullNameSubmit}
              className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{fullName}</p>
            <div
              className="bg-white w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer"
              onClick={() => setIsEditingFullName(true)}
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
    </div>
  );
};

export default ClientProfileForm;
