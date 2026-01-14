import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, Search, LogOut } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const cart = useCartStore((state) => state.cart);
    const { user, isAuthenticated, logout } = useAuthStore();
    
    // Calculer le nombre total d'articles dans le panier
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <div className="bg-orange-500 p-1.5 rounded-lg">
                <ShoppingCart className="text-white" size={20} />
                </div>
                <span className="text-xl font-black tracking-tighter text-slate-900">
                Yve-<span className="text-orange-500">SHOP</span>
                </span>
            </Link>

            {/* Barre de recherche (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Rechercher un produit..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
                </div>
            </div>

            {/* Actions Droite */}
            <div className="flex items-center gap-2 sm:gap-5">
                
                {/* Lien Admin (Visible par tous pour le test, normalement filtré) */}
                <Link to="/admin" className="hidden sm:block text-xs font-bold text-gray-500 hover:text-orange-500 transition-colors uppercase tracking-widest">
                Admin
                </Link>

                {/* Panier */}
                <Link to="/cart" className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart size={24} />
                <AnimatePresence>
                    {cartCount > 0 && (
                    <motion.span 
                        key={cartCount}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white"
                    >
                        {cartCount}
                    </motion.span>
                    )}
                </AnimatePresence>
                </Link>

                {/* Authentification */}
                <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        {/* <div className="hidden sm:block text-right">
                        <p className="text-xs text-gray-400 font-medium">Bonjour,</p>
                        <p className="text-sm font-bold text-slate-900 truncate max-w-[100px]">{user.name}</p>
                        </div>
                        <button 
                        onClick={logout}
                        className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                        > */}
                        <Link to="/profile" className="hidden sm:block text-right hover:opacity-80 transition-opacity">
                            <p className="text-xs text-gray-400 font-medium">Mon compte</p>
                            <p className="text-sm font-bold text-slate-900 truncate max-w-[100px]">{user.name}</p>
                        </Link>
                        <LogOut size={22} />
                        {/* </button> */}
                    </div>
                ) : (
                <Link 
                    to="/register" 
                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-orange-500 transition-all shadow-lg shadow-slate-200 active:scale-95"
                >
                    <User size={18} />
                    <span className="hidden sm:inline">S'inscrire</span>
                </Link>
                )}

                {/* Menu Mobile */}
                <button className="sm:hidden p-2 text-gray-700">
                <Menu size={24} />
                </button>
            </div>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;