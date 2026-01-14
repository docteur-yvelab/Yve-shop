import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // Extraction des actions depuis ton store
    const { cart, removeFromCart, addToCart, decrementQuantity, clearCart, getTotalPrice } = useCartStore();

    const subtotal = getTotalPrice();
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 10;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
            <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-100 p-8 rounded-full mb-6"
            >
            <ShoppingBag size={64} className="text-gray-300" />
            </motion.div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Votre panier est vide</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            On dirait que vous n'avez pas encore fait votre choix. Nos meilleures offres vous attendent !
            </p>
            <Link to="/" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-500 transition-all flex items-center gap-2 shadow-lg active:scale-95">
            <ArrowLeft size={20} /> Retourner à la boutique
            </Link>
        </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 lg:p-12 bg-gray-50/30 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mon Panier</h1>
            <p className="text-gray-500 font-medium">Gestion de vos articles sélectionnés</p>
            </div>
            <button 
            onClick={clearCart}
            className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg cursor-pointer"
            >
            <Trash2 size={16} /> Vider tout le panier
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* SECTION GAUCHE : LISTE DES PRODUITS */}
            <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode='popLayout'>
                {cart.map((item) => (
                <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group flex flex-col sm:flex-row items-center gap-5 bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors"
                >
                    {/* Image */}
                    <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    {/* Infos */}
                    <div className="flex-1 text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-1 block">
                        {item.category}
                    </span>
                    <h3 className="font-bold text-xl text-slate-800 leading-tight mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm">Prix unitaire: {item.price}€</p>
                    </div>

                    {/* Contrôles de Quantité */}
                    <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                        <button 
                        onClick={() => decrementQuantity(item.id)}
                        className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600 disabled:opacity-30 cursor-pointer"
                        disabled={item.quantity <= 1}
                        >
                        <Minus size={18}/>
                        </button>
                        <span className="font-black text-lg w-10 text-center text-slate-800">{item.quantity}</span>
                        <button 
                        onClick={() => addToCart(item)}
                        className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600 cursor-pointer"
                        >
                        <Plus size={18}/>
                        </button>
                    </div>
                    </div>

                    {/* Sous-total article */}
                    <div className="text-right min-w-[100px]">
                    <p className="text-sm text-gray-400 font-medium">Sous-total</p>
                    <p className="text-xl font-black text-slate-900">{(item.price * item.quantity).toFixed(2)}€</p>
                    </div>

                    {/* Bouton Supprimer */}
                    <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all cursor-pointer"
                    >
                    <Trash2 size={22} />
                    </button>
                </motion.div>
                ))}
            </AnimatePresence>
            </div>

            {/* SECTION DROITE : RÉSUMÉ DE COMMANDE */}
            <div className="lg:col-span-1">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-gray-100 sticky top-24"
            >
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Récapitulatif</h2>
                
                <div className="space-y-4 border-b border-gray-100 pb-8 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                    <span>Sous-total HT</span>
                    <span className="text-slate-900">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                    <span>Livraison</span>
                    <span className={`${shipping === 0 ? 'text-green-500 font-bold' : 'text-slate-900'}`}>
                    {shipping === 0 ? 'Offerte' : `${shipping.toFixed(2)}€`}
                    </span>
                </div>
                {shipping > 0 && (
                    <p className="text-[10px] text-orange-500 bg-orange-50 p-2 rounded-lg text-center font-bold">
                    Ajoutez {(100 - subtotal).toFixed(2)}€ pour la livraison gratuite !
                    </p>
                )}
                </div>

                <div className="flex justify-between items-end mb-10">
                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total TTC</span>
                <span className="text-4xl font-black text-slate-900 tracking-tighter">{total.toFixed(2)}€</span>
                </div>

                <button className="w-full bg-slate-900 hover:bg-orange-500 text-white py-5 rounded-2xl font-black transition-all transform active:scale-95 shadow-xl shadow-slate-200 hover:shadow-orange-200 mb-6 flex items-center justify-center gap-3 cursor-pointer group">
                Commander maintenant
                <ShieldCheck className="group-hover:animate-pulse" />
                </button>
                
                <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[11px] text-gray-400 justify-center">
                    <div className="h-1 w-1 bg-green-500 rounded-full"></div>
                    Paiement 100% sécurisé via Stripe
                </div>
                <Link to="/" className="text-center text-xs font-bold text-orange-500 hover:underline">
                    Continuer mes achats
                </Link>
                </div>
            </motion.div>
            </div>

        </div>
        </div>
    );
};

export default Cart;