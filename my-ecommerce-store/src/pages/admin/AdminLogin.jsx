import { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { toast } from 'sonner';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const adminLogin = useAdminStore((state) => state.adminLogin);

    const handleLogin = (e) => {
        e.preventDefault();
        if (adminLogin(email, pass)) {
        toast.success("Bienvenue, Admin");
        } else {
        toast.error("Identifiants incorrects");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-slate-900">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-black mb-6 text-center">Connexion Admin</h2>
            <input 
            type="email" placeholder="Email Admin" className="w-full p-4 bg-gray-100 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
            type="password" placeholder="Mot de passe" className="w-full p-4 bg-gray-100 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setPass(e.target.value)} 
            />
            <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold">Se connecter</button>
        </form>
        </div>
    );
};

export default AdminLogin;