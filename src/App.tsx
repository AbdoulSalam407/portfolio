import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@components/layout/Header';
import { Footer } from '@components/layout/Footer';
import { Home } from '@pages/Home';
import { About } from '@pages/About';
import { Projects } from '@pages/Projects';
import { EducationPage } from '@pages/Education';
import { Certifications } from '@pages/Certifications';
import { Contact } from '@pages/Contact';
import { AdminLogin } from '@pages/AdminLogin';
import { AdminDashboard } from '@pages/admin/Dashboard';
import { AdminProjects } from '@pages/admin/Projects';
import { AdminCertifications } from '@pages/admin/Certifications';
import { AdminEducation } from '@pages/admin/Education';
import { AdminMessages } from '@pages/admin/Messages';
import { AdminProfile } from '@pages/admin/Profile';
import { AdminAbout } from '@pages/admin/About';
import { useAuthStore } from '@stores/authStore';
import '@/index.css';

function App() {
  const checkAuth = useAuthStore((state: any) => state.checkAuth);
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin" />}
            />
            <Route
              path="/admin/projects"
              element={isAuthenticated ? <AdminProjects /> : <Navigate to="/admin" />}
            />
            <Route
              path="/admin/certifications"
              element={isAuthenticated ? <AdminCertifications /> : <Navigate to="/admin" />}
            />
            <Route
              path="/admin/education"
              element={isAuthenticated ? <AdminEducation /> : <Navigate to="/admin" />}
            />
            <Route
              path="/admin/messages"
              element={isAuthenticated ? <AdminMessages /> : <Navigate to="/admin" />}
            />
            <Route
              path="/admin/profile"
              element={isAuthenticated ? <AdminProfile /> : <Navigate to="/admin" />}
            />
            <Route
              path="/admin/about"
              element={isAuthenticated ? <AdminAbout /> : <Navigate to="/admin" />}
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
