import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch("http://localhost/backend/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            login(data.user);
            toast.success(`Heureux de vous revoir !`);
            navigate("/");
        } else {
            toast.error(data.message);
        }
        } catch (error) {
            toast.error("Erreur de communication avec PHP");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 text-slate-900">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
            <h2 className="text-3xl font-black text-center mb-6">Connexion</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-slate-900">
            <input type="email" placeholder="Email" required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Mot de passe" required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-all cursor-pointer">Se connecter</button>
            </form>
            
            {/* LIEN VERS INSCRIPTION */}
            <p className="mt-6 text-center text-sm text-gray-400 font-medium">
            Nouveau ici ? <Link to="/register" className="text-orange-500 font-bold hover:underline">Créer un compte</Link>
            </p>
        </motion.div>
        </div>
    );
};

export default Login;