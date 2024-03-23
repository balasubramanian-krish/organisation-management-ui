import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Roles from './components/Roles';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="users" element={<Users/>} />
          <Route path="add-user" element={<AddUser/>} />
          <Route path="edit-user/:id" element={<EditUser/>} />
          <Route path="roles" element={<Roles/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
