import React from "react";
import AppRouter from "./Router.js";
import { AuthProvider } from "./context/AuthContext.js";
import { ThemeProvider } from "./context/ThemeContext.js";
import ErrorBoundary from "./components/ErrorBoundary.js";


const App = () => {
  return (
    <AuthProvider>
    <ThemeProvider>
    <ErrorBoundary>
        <AppRouter />
    </ErrorBoundary>
    </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
