import React, { useState } from 'react';

interface Language {
  name: string;
  proficiency: string;
}

interface FormsProps {
  type: string;
  initialData: any;
  onSubmit: (data: { type: string; value: any }) => void;
}

export const LanguageForm: React.FC<FormsProps> = ({ type, initialData, onSubmit }) => {
  const [language, setLanguage] = useState(initialData?.name || '');
  const [proficiency, setProficiency] = useState(initialData?.proficiency || '');

  const handleSubmit = () => {
    onSubmit({ type, value: { name: language, proficiency } });
    setLanguage('');
    setProficiency('');
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        placeholder="Enter language"
        className="border p-2 w-full mb-2"
      />
      <select
        value={proficiency}
        onChange={(e) => setProficiency(e.target.value)}
        className="border p-2 w-full mb-4 bg-white"
      >
        <option value="">Select Proficiency</option>
        <option value="Conversational">Conversational</option>
        <option value="Bilinguial">Bilinguial</option>
        <option value="Native">Native</option>
      </select>
      <button
        onClick={handleSubmit}
        className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Submit
      </button>
    </div>
  );
};

export const CourtForm: React.FC<FormsProps> = ({ type, initialData, onSubmit }) => {
  const [court, setCourt] = useState(initialData || '');

  const handleSubmit = () => {
    onSubmit({ type, value: court });
    setCourt('');
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={court}
        onChange={(e) => setCourt(e.target.value)}
        placeholder="Enter court"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Submit
      </button>
    </div>
  );
};

export const ExperienceForm: React.FC<FormsProps> = ({ type, initialData, onSubmit }) => {
  const [experience, setExperience] = useState(initialData || '');

  const handleSubmit = () => {
    onSubmit({ type, value: experience });
    setExperience('');
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        placeholder="Enter experience"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Submit
      </button>
    </div>
  );
};
