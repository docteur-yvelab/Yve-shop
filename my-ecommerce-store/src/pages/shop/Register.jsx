// import { useState } from 'react';
// import { useAuthStore } from '../../store/useAuthStore';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import { UserPlus, Mail, Lock, User } from 'lucide-react';

// const Register = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [loading, setLoading] = useState(false);
//     const login = useAuthStore((state) => state.login);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//         const response = await fetch("http://localhost/backend/register.php", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();

//         if (data.success) {
//             toast.success("Compte créé avec succès !");
//             // Connecter l'utilisateur dans le store
//             login({ name: formData.name, email: formData.email });
//             navigate("/"); // Rediriger vers l'accueil
//         } else {
//             toast.error(data.message);
//         }
//         } catch (error) {
//         toast.error("Erreur de connexion au serveur PHP");
//         console.error(error);
//         } finally {
//         setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-[80vh] flex items-center justify-center p-6">
//         <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md"
//         >
//             <div className="text-center mb-8">
//             <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <UserPlus className="text-orange-500" size={30} />
//             </div>
//             <h2 className="text-3xl font-black text-slate-900">Créer un compte</h2>
//             <p className="text-gray-500">Rejoignez l'aventure Amazon Clone</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                 required
//                 type="text"
//                 placeholder="Nom complet"
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//             </div>

//             <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                 required
//                 type="email"
//                 placeholder="Email"
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//             </div>

//             <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                 required
//                 type="password"
//                 placeholder="Mot de passe"
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//             </div>

//             <button
//                 disabled={loading}
//                 type="submit"
//                 className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
//             >
//                 {loading ? "Chargement..." : "S'inscrire"}
//             </button>
//             </form>
//         </motion.div>
//         </div>
//     );
// };

// export default Register;






import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch("http://localhost/backend/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            toast.success("Inscription réussie ! Connectez-vous.");
            navigate("/login"); // Dirige vers la connexion après inscription
        } else {
            toast.error(data.message);
        }
        } catch (error) {
        toast.error("Erreur serveur (CORS ou XAMPP)");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
            <h2 className="text-3xl font-black text-center mb-6 text-slate-900">S'inscrire</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Nom" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="email" placeholder="Email" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Mot de passe" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-slate-900 transition-all">Créer mon compte</button>
            </form>

            {/* LIEN VERS CONNEXION */}
            <p className="mt-6 text-center text-sm text-gray-500">
            Déjà un compte ? <Link to="/login" className="text-orange-500 font-bold hover:underline">Se connecter ici</Link>
            </p>
        </motion.div>
        </div>
    );
};

export default Register;


