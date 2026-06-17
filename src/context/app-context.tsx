'use client';

import React, { createContext, useContext, useState } from 'react';

// 1. Define the shape of your global state
interface AppContextType {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeMarketTab: string;
  setActiveMarketTab: (tab: string) => void;
  watchlistCount: number;
setWatchlistCount: (count: number) => void;
}

// 2. Create the raw context
const AppContext = createContext<AppContextType|undefined>(undefined);

// 3. Create the provider component
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeMarketTab, setActiveMarketTab] = useState('all');
  const [watchlistCount, setWatchlistCount] = useState(0);

  return (
<AppContext.Provider value={{isSidebarOpen, setSidebarOpen, activeMarketTab, setActiveMarketTab, watchlistCount, setWatchlistCount}}>
      {children}
   </AppContext.Provider> 
  );
}

// 4. Create the custom hook for components to use
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
