import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageCertifications from './pages/admin/ManageCertifications';
import ManageMessages from './pages/admin/ManageMessages';
import ManageSkills from './pages/admin/ManageSkills';
import ManageSettings from './pages/admin/ManageSettings';
import ManageEducation from './pages/admin/ManageEducation';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="certifications" element={<ManageCertifications />} />
        <Route path="education" element={<ManageEducation />} />
        <Route path="skills" element={<ManageSkills />} />
        <Route path="messages" element={<ManageMessages />} />
        <Route path="settings" element={<ManageSettings />} />
      </Route>
    </Routes>
  );
}

export default App;