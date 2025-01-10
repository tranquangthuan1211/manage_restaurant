import { createContext, useState, useEffect, useContext } from 'react';
import { apiGet } from 'src/api/api-requests';
import { User } from 'src/types/user';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean | null;
}

const UserContext = createContext<UserContextType | null>(null);

import { ReactNode } from 'react';
import Spinner from 'src/components/spinner';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Simulate a fetch for user data
    const fetchUser = async () => {
      try {
        const response = await apiGet("/users");
        if (response.error === 1) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        };
        const data: User = response.data;
        setIsAuthenticated(true);
        setUser(data);
        console.log("User data fetched successfully");
        console.log(JSON.stringify(data, null, 2));
      }
      catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        // It is usual for some guest pages, don't print error 
        // console.error("Error fetching user data. User couldn't be authenticated", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated }}>
      {isAuthenticated === null ? <Spinner/> : children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType | null => useContext(UserContext);
