import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from '@/pages/Authforms.jsx';
import Registerforms from '@/pages/Registerforms.jsx';
import Forgetpassword from '@/pages/Forgetpassword.jsx';
import Dashboard from '@/pages/Dashboard.jsx'
import Mainlayout from './layout/MainLayout.jsx'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>

        {/* Layout utama */}
        <Route element={<Mainlayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        {/* Halaman tanpa layout */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Registerforms />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />

      </Routes>
    </Router>

  );
}

export default App
