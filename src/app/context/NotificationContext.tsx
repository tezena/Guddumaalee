"use client"

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getNewLawyers } from '../admin/api/lawyers';

// Define types for context state
interface NotificationContextType {
  faqNotifications: number;
  lawyerNotifications: number;
  disputeNotifications: number;
  setFaqNotifications: (count: number) => void;
  setLawyerNotifications: (count: number) => void;
  setDisputeNotifications: (count: number) => void;
  fetchNotifications: () => void; // Add a method to fetch notifications
}

// Create the context with default values
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [faqNotifications, setFaqNotifications] = useState(0);
  const [lawyerNotifications, setLawyerNotifications] = useState(0);
  const [disputeNotifications, setDisputeNotifications] = useState(0);

  const fetchNotifications = async () => {
    try {
      const lawyers = await getNewLawyers();
      console.log('from the provider ............',lawyers.lawyers.length);
      
      setLawyerNotifications(lawyers.lawyers.length); // Update lawyer notifications count
      
      setFaqNotifications(2); // Example count
      setDisputeNotifications(3); // Example count
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        faqNotifications,
        lawyerNotifications,
        disputeNotifications,
        setFaqNotifications,
        setLawyerNotifications,
        setDisputeNotifications,
        fetchNotifications, // Provide the fetch function
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
