import React from "react";
import AppRouter from "./Router.js";
import { AuthProvider } from "./context/AuthContext.js";
import { ThemeProvider } from "./context/ThemeContext.js";
import ErrorBoundary from "./components/ErrorBoundary.js";


const App = () => {
  return (
   <ErrorBoundary>
    <AuthProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
