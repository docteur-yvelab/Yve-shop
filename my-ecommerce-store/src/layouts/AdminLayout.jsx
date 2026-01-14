// import { Link, Outlet } from 'react-router-dom';
// import { LayoutDashboard, Package, Users, ShoppingCart, LogOut } from 'lucide-react';

// const AdminLayout = () => {
//     return (
//         <div className="flex min-h-screen bg-gray-100">
//         {/* Sidebar */}
//         <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
//             <h1 className="text-2xl font-bold mb-10 text-orange-500">AdminPanel</h1>
//             <nav className="space-y-4">
//             <Link to="/admin" className="flex items-center gap-3 hover:text-orange-400 transition"><LayoutDashboard size={20}/> Dashboard</Link>
//             <Link to="/admin/products" className="flex items-center gap-3 hover:text-orange-400 transition"><Package size={20}/> Produits</Link>
//             <Link to="/admin/orders" className="flex items-center gap-3 hover:text-orange-400 transition"><ShoppingCart size={20}/> Commandes</Link>
//             <Link to="/admin/users" className="flex items-center gap-3 hover:text-orange-400 transition"><Users size={20}/> Utilisateurs</Link>
//             </nav>
//             <button className="flex items-center gap-3 mt-auto pt-10 text-red-400 hover:text-red-300">
//             <LogOut size={20}/> Déconnexion
//             </button>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-8">
//             <Outlet />
//         </main>
//         </div>
//     );
// };

// export default AdminLayout;


import { useAdminStore } from '../store/useAdminStore';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, Package } from 'lucide-react';
import { toast } from 'sonner';

const AdminLayout = () => {
    const adminLogout = useAdminStore((state) => state.adminLogout);
    const navigate = useNavigate();

    const handleLogout = () => {
        adminLogout(); // Met isAdminAuthenticated à false
        toast.info("Déconnexion administrateur réussie");
        navigate("/admin"); // Redirige vers le login admin
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar Admin */}
        <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
            <h2 className="text-xl font-black mb-10 text-orange-500">ADMIN PANEL</h2>
            
            <nav className="flex-1 space-y-4">
            <Link to="/admin" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl transition">
                <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/admin/products" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-xl transition">
                <Package size={20} /> Produits
            </Link>
            </nav>

            {/* Bouton Déconnexion Admin */}
            <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition cursor-pointer mt-auto border border-red-500/20"
            >
            <LogOut size={20} /> Se déconnecter
            </button>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 p-8">
            <Outlet />
        </main>
        </div>
    );
};

export default AdminLayout;