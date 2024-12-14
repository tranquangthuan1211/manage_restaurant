import { createContext, useState, useEffect, useContext } from 'react';
import { apiGet } from 'src/api/api-requests';
import { User } from 'src/types/user';

const UserContext = createContext<User | null>(null);

import { ReactNode } from 'react';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate a fetch for user data
    const fetchUser = async () => {
      try {
        const response = await apiGet("/users");
        const data: User = response.data;
        setUser(data);
      }
      catch (error) {
        setUser(null);
        // It is usual for some guest pages, don't print error 
        //console.error("Error fetching user data. User couldn't be authenticated", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): User | null => useContext(UserContext);
