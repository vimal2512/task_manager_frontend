// import React, { createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// import React, { createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(undefined); // `undefined` means "loading"

//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } else {
//         setUser(null); // No user found
//       }
//     } catch (error) {
//       console.error("Failed to parse user from localStorage:", error);
//       setUser(null);
//     }
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {user === undefined ? <p>Loading...</p> : children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// import React, { createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(undefined); // undefined while loading

//   useEffect(() => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       setUser(storedUser || null);
//       console.log("Component re-rendered");
//     } catch (err) {
//       console.error("Failed to load user:", err);
//       setUser(null);
//     }
//   }, []);

//   const login = (userData, accessToken, refreshToken) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {user === undefined ? <div>Loading...</div> : children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// import React, { createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(undefined); // undefined while loading

//   // This useEffect is to load the stored user info only once when the component mounts.
//   useEffect(() => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       // Only update state if there's a difference in the user data
//       if (storedUser !== user) {
//         setUser(storedUser || null);
//       }
//       console.log("AuthContext: Component re-rendered");
//     } catch (err) {
//       console.error("Failed to load user:", err);
//       setUser(null);
//     }
//   }, [user]); // Dependency array, we only run this once when the component mounts

//   const login = (userData, accessToken, refreshToken) => {
//     // Set user data and tokens in localStorage and state
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     setUser(userData);
//   };

//   const logout = () => {
//     // Clear user data and tokens from localStorage
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {/* Show loading state while `user` is undefined */}
//       {user === undefined ? <div>Loading...</div> : children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// import React, { createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Start with null, not undefined
//   const [isLoading, setIsLoading] = useState(true); // Track loading state

//   useEffect(() => {
//     // Check localStorage for user and token on component mount
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const accessToken = localStorage.getItem("accessToken");

//     if (storedUser && accessToken) {
//       setUser(storedUser);
//     } else {
//       setUser(null); // Ensure null if no valid user or token found
//     }
    
//     setIsLoading(false); // Set loading to false once checked
//   }, []);

//   const login = (userData, accessToken, refreshToken) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     setUser(userData); // Update user state once logged in
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null); // Reset the user state on logout
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {isLoading ? <div>Loading...</div> : children} {/* Show loading initially */}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// import React, { createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Start with null, not undefined
//   const [isLoading, setIsLoading] = useState(true); // Track loading state

//   useEffect(() => {
//     // Check localStorage for user and token on component mount
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const accessToken = localStorage.getItem("accessToken");

//     if (storedUser && accessToken) {
//       setUser(storedUser); // Set user if valid
//     } else {
//       setUser(null); // Ensure null if no valid user or token found
//     }

//     setIsLoading(false); // Set loading to false once checked
//   }, []);

//   const login = (userData, accessToken, refreshToken) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     setUser(userData); // Update user state once logged in
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null); // Reset the user state on logout
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {isLoading ? null : children} {/* Only render children when loading is done */}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


// import { createContext, useState, useEffect, useSyncExternalStore } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
  
//   // React 19's new sync external store for localStorage
//   const authState = useSyncExternalStore(
//     (callback) => {
//       window.addEventListener('storage', callback);
//       return () => window.removeEventListener('storage', callback);
//     },
//     () => {
//       const storedUser = JSON.parse(localStorage.getItem('user'));
//       const token = localStorage.getItem('accessToken');
//       return storedUser && token ? storedUser : null;
//     }
//   );

//   useEffect(() => {
//     setUser(authState);
//   }, [authState]);

//   const login = (userData, accessToken, refreshToken) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);
//     setUser(userData);
//   };

//   const logout = () => {
//     ['user', 'accessToken', 'refreshToken'].forEach(key => 
//       localStorage.removeItem(key)
//     );
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// Updated AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     const accessToken = localStorage.getItem('accessToken');
//     setUser(storedUser && accessToken ? storedUser : null);
//   }, []);

//   const login = (userData, accessToken, refreshToken) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import React from 'react';
import { createContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.clear();
      }
    }
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;