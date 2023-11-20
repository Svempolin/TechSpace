import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (formData: Record<string, any>) => Promise<void>;
  signup: (formData: Record<string, any>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (formData: Record<string, any>) => {
    // Login logic remains the same...
  };

  const signup = async (formData: Record<string, any>): Promise<void> => {
    try {
      // Your signup logic here
      const response = await fetch('http://localhost:7777/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Signup failed');
      }
  
      const data = await response.json();
      console.log(data);
  
      setIsLoggedIn(true);
      localStorage.setItem('token', data.data.token);
    } catch (error) {
      console.error('Error during signup:', error);
      throw error; // Propagate the error to handle it in the component
    }
  };
  

  const logout = () => {
    // Logout logic remains the same...
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const signup = async (formData: Record<string, any>): Promise<void> => {
  try {
    // Your signup logic here
    const response = await fetch('http://localhost:7777/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();
    console.log(data);

    const setIsLoggedIn = (value: boolean) => {
      // Update the state or perform any other logic
    };

    setIsLoggedIn(true);
    localStorage.setItem('token', data.data.token);
  } catch (error) {
    console.error('Error during signup:', error);
    throw error; // Propagate the error to handle it in the component
  }
};

export { AuthProvider, useAuth, signup, AuthContext };
