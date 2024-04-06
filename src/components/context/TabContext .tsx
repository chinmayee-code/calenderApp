import React, {createContext, useState, useContext} from 'react';

const TabContext = createContext({opened: false, toggleOpened: () => {}});

export const TabContextProvider = ({children}: any) => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  return (
    <TabContext.Provider value={{opened, toggleOpened}}>
      {children}
    </TabContext.Provider>
  );
};
export const useTabMenu = () => useContext(TabContext);