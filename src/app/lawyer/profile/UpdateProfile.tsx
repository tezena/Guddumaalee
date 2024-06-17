import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { UploadDropzone } from '@/lib/uploadthing';
import { useToast } from '@/components/ui/use-toast';


interface Language {
  name: string;
  proficiency: string;
}

interface ProfileFormProps {
  languages: Language[];
  experience: string[];
  profilePhoto: string;
  bio: string;
  onUpdatePhoto: (photo: string) => void;
  onUpdateBio: (bio: string) => void;
  onUpdateLanguage: (index: number, language: Language) => void;
}

const PROFICIENCY_OPTIONS = ["Conversational", "Native", "Bilingual", "Fluent"];

const ProfileForm: React.FC<ProfileFormProps> = ({
  languages,
  experience,
  profilePhoto,
  bio,
  onUpdatePhoto,
  onUpdateBio,
  onUpdateLanguage,
}) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState(bio);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [newLanguage, setNewLanguage] = useState<Language>({ name: '', proficiency: '' });
  const [editingLanguageIndex, setEditingLanguageIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleBioSubmit = () => {
    onUpdateBio(newBio);
    setIsEditingBio(false);
  };

  const handleUpdateLanguage = () => {
    if (editingLanguageIndex !== null) {
      onUpdateLanguage(editingLanguageIndex, newLanguage);
      setEditingLanguageIndex(null);
      setNewLanguage({ name: '', proficiency: '' });
    }
  };

  const startEditingLanguage = (index: number) => {
    setNewLanguage(languages[index]);
    setEditingLanguageIndex(index);
  };

  return (
    <div className="p-4 mx-auto">
      <h2 className="text-2xl mb-4">Update Profile</h2>

      <div className="mb-4 text-center">
        <div className="relative inline-block">
          <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
          <div className="absolute bottom-0 bg-white right-0 w-8 h-8 rounded-full outline outline-green-500 flex justify-center items-center cursor-pointer" onClick={() => setIsEditingPhoto(true)}>
            <Icon icon="ic:outline-edit" color="green" width={20} height={20} />
          </div>
        </div>
        {isEditingPhoto && (
          <div className="mt-4">
            <UploadDropzone
              className="p-2 border border-gray-600"
              endpoint="fileUploader"
              onClientUploadComplete={(res) => {
                const photoUrl = res[0].url;
                onUpdatePhoto(photoUrl);
                setIsEditingPhoto(false);
              }}
              onUploadError={(error: Error) => {
                toast({ title: `ERROR! ${error.message}` });
              }}
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Languages</label>
        <ul>
          {languages.map((language, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{language.name}</span>
              <span>{language.proficiency}</span>
              <div className="bottom-0 bg-white right-0 w-8 h-8 flex justify-center items-center cursor-pointer" onClick={() => startEditingLanguage(index)}>
                <Icon icon="ri:edit-2-fill" color="#7B3B99" width={25} height={25} />
              </div>
            </li>
          ))}
        </ul>
        {editingLanguageIndex !== null && (
          <div className="mt-4">
            <input
              type="text"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              placeholder="Language"
              className="border p-2 w-full mb-2"
            />
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
              className="border p-2 w-full mb-2"
            >
              {PROFICIENCY_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button
              onClick={handleUpdateLanguage}
              className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Update Language
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Experience</label>
        <ul>
          {experience.map((exp, index) => (
            <li key={index} className="mb-2">{exp}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Bio</label>
        {isEditingBio ? (
          <div className="flex gap-4">
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <div className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded h-full">
              <button onClick={handleBioSubmit}>
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p>{bio}</p>
            <div className="bottom-0 bg-white right-0 w-8 h-8 flex justify-center items-center cursor-pointer" onClick={() => setIsEditingBio(true)}>
              <Icon icon="ri:edit-2-fill" color="#7B3B99" width={25} height={25} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
