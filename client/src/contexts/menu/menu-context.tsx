// import { use, useEffect } from "react";
// import { useContext, createContext, Children } from "react";
// import useFunction,{UseFunctionReturnType, DEFAULT_FUNCTION_RETURN} from "src/hooks/use-function";
// import MenuApi from "src/api/menu";
// import { Food } from "src/types/food";
// interface ContextValue {
//     getMenu: UseFunctionReturnType<FormData,{data:Food[]}>;
//     createFood?: (request:Partial<Food>) => Promise<void>;
// }

// const MenuContext = createContext<ContextValue>({
//     getMenu: DEFAULT_FUNCTION_RETURN,
//     createFood: async () => {},
// });
// const MenuProvider = ({children}:{children:React.ReactNode}) => {
//     const getMenu = useFunction(MenuApi.getMenu);

//     useEffect(() => {
//         getMenu.call(new FormData());
//     },[]);
//     return (
//         <MenuContext.Provider value={{getMenu}}>
//             {children}
//         </MenuContext.Provider>
//     );
// }
// export const useMenu = () => useContext(MenuContext);
// export default MenuProvider;

import React, { createContext, useContext, useEffect, useState } from "react";
import MenuApi from "src/api/menu";
import { Food } from "src/types/food";

interface MenuContextType {
  getMenu: {
    data: Food[] | null;
    loading: boolean;
    error: string | null;
  };
  fetchMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuData, setMenuData] = useState<Food[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await MenuApi.getMenu(new FormData());
      setMenuData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        getMenu: { data: menuData, loading, error },
        fetchMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
