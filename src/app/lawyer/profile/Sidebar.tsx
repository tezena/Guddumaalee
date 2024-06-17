import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LanguageForm, CourtForm, ExperienceForm } from './Forms';

interface SidebarProps {
  items: string[];
  activeItem: string | null;
  onAddItem: (item: string) => void;
  onSubmit: (data: { type: string; value: any }) => void;
  initialData: any;
}

const Sidebar: React.FC<SidebarProps> = ({ items, activeItem, onAddItem, onSubmit, initialData }) => {
  return (
    <div className="w-50 bg-white text-black h-screen p-4 border-2">
      <h2 className="text-2xl mb-4 ">Profile Settings</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-2 flex justify-between items-center">
            <span>{item}</span>
            {/* <button
              onClick={() => onAddItem(item)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Add
            </button> */}
            <div onClick={() => onAddItem(item)}>
            <Icon icon="icons8:plus"  width={30}/>
            </div>
          </li>
        ))}
      </ul>
      {activeItem === 'Language' && <LanguageForm type="Language" initialData={initialData.language} onSubmit={onSubmit} />}
      {activeItem === 'Court Worked' && <CourtForm type="Court Worked" initialData={initialData.courtWorked} onSubmit={onSubmit} />}
      {activeItem === 'Experience' && <ExperienceForm type="Experience" initialData={initialData.experience} onSubmit={onSubmit} />}
    </div>
  );
};

export default Sidebar;
