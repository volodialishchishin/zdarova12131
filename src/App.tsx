import React from 'react';

import './App.scss';
import Sidebar from "./Components/Sidebar/Sidebar.tsx";
import LoginForm from "./Pages/Auth/LoginForm.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from "./Pages/Auth/Register.tsx";
import ConfirmCode from "./Pages/Auth/ConfirmCode.tsx";
import CreatePageMain from "./Pages/CreatePages/CreatePageMain.tsx";
import CreateItemPage from "./Pages/CreatePages/CreateItemPage.tsx";
import CreateOperationPage from "./Pages/CreatePages/CreateOperationPage.tsx";

const App: React.FC = () => {
  return (
      <Router>
          <div className="app">
              <Sidebar />
              <div className="main-content">
                  <Routes>
                      <Route path="/" element={<LoginForm />} />
                      <Route path="/register" element={<RegisterForm />} />
                      <Route path="/confirm-code" element={<ConfirmCode />} />
                      <Route path="/create"  element={<CreatePageMain />} />
                      <Route path="/create/product/:id/item" element={<CreateItemPage />} />
                      <Route path="/create/operation" element={<CreateOperationPage />} />
                  </Routes>
              </div>
          </div>
      </Router>
  );
};

export default App;
