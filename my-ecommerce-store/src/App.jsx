
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

// Boutique
import Navbar from './components/shop/Navbar';
import Home from './pages/shop/Home';
import Register from './pages/shop/Register';
import Login from './pages/shop/Login';
import Cart from './pages/shop/Cart';

// Admin
import AdminLayout from './layouts/AdminLayout';
import AdminProducts from './pages/admin/AdminProducts';
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import { useAdminStore } from './store/useAdminStore';
import Profile from './pages/shop/Profile';

function App() {
  const isAdminAuthenticated = useAdminStore((state) => state.isAdminAuthenticated);

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      
      <Routes>
        {/* --- ROUTES CLIENT --- */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/cart" element={<><Navbar /><Cart /></>} />
        <Route path="/register" element={<><Navbar /><Register /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /></>} />

        {/* --- ROUTES ADMIN --- */}
        {/* Si l'admin n'est pas connecté, on affiche AdminLogin pour TOUT ce qui commence par /admin */}
        <Route 
          path="/admin" 
          element={isAdminAuthenticated ? <AdminLayout /> : <AdminLogin />}
        >
          {/* Ces routes sont relatives à /admin */}
          <Route index element={<Dashboard />} /> 
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
