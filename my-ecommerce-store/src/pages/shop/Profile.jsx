import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { motion } from 'framer-motion';
import { User, Package, Calendar, CreditCard, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
        fetch(`http://localhost/backend/get_orders.php?email=${user.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error("Erreur commandes:", err));
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return <div className="text-center py-20">Veuillez vous connecter.</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Colonne de gauche : Infos Utilisateur */}
            <div className="md:col-span-1">
            <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 text-center"
            >
                <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={48} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
                <p className="text-gray-500 mb-6">{user.email}</p>
                
                <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold"
                >
                <LogOut size={18} /> Déconnexion
                </button>
            </motion.div>
            </div>

            {/* Colonne de droite : Historique des commandes */}
            <div className="md:col-span-2">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Package className="text-orange-500" /> Historique des commandes
            </h3>

            <div className="space-y-4">
                {orders.length > 0 ? orders.map((order) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    key={order.id}
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Commande #{order.id}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar size={14} /> {new Date(order.order_date).toLocaleDateString()}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-black text-slate-900">{order.total_price}€</p>
                        <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full font-bold uppercase">Payé</span>
                    </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl text-sm text-gray-600 italic">
                    {order.items}
                    </div>
                </motion.div>
                )) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center text-gray-400">
                    Aucune commande pour le moment.
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;