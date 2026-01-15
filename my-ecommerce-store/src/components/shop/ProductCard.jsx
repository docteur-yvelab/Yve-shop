import { motion } from 'framer-motion';
import { ShoppingCart, Star, Package, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    
    // URL pointant vers ton dossier uploads dans XAMPP
    const IMAGE_BASE_URL = "http://localhost/backend/uploads/";

    /**
     * Logique d'affichage d'image :
     * 1. Si image_url commence par "data:image", c'est du Base64 (ancien test).
     * 2. Sinon, c'est un nom de fichier stocké dans le dossier /uploads/.
     */
    const getImageUrl = () => {
        if (!product.image_url) return "https://placehold.co/600x600?text=Pas+d'image";
        
        if (product.image_url.startsWith('data:image')) {
            return product.image_url;
        }
        return `${IMAGE_BASE_URL}${product.image_url}`;
    };

    const handleAddToCart = () => {
        if (product.stock <= 0) {
            toast.error("Rupture de stock !");
            return;
        }

        addToCart(product);
        toast.success(`${product.name} ajouté !`, {
            icon: <ShoppingCart size={16} className="text-orange-500" />,
            style: { borderRadius: '20px' }
        });
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full group"
        >
            {/* --- Section Image --- */}
            <div className="relative h-72 overflow-hidden p-3">
                <img 
                    src={getImageUrl()} 
                    alt={product.name} 
                    className="w-full h-full object-cover rounded-[2rem] group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        e.target.src = "https://placehold.co/600x600?text=Image+non+trouvée";
                    }}
                />
                
                {/* Badge Catégorie */}
                <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-800 shadow-xl border border-white/50">
                        {product.category}
                    </span>
                </div>

                {/* Badge Stock Critique */}
                {product.stock > 0 && product.stock <= 5 && (
                    <div className="absolute bottom-6 left-6">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-xl text-[9px] font-bold flex items-center gap-1 animate-pulse shadow-lg shadow-red-200">
                            <AlertTriangle size={10} /> {product.stock} restants
                        </span>
                    </div>
                )}
            </div>

            {/* --- Section Détails --- */}
            <div className="p-7 flex flex-col flex-grow">
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-orange-500 transition-colors">
                            {product.name}
                        </h3>
                        <ShieldCheck size={18} className="text-blue-500 flex-shrink-0" />
                    </div>
                    
                    <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs font-black text-slate-400 ml-2">4.9/5</span>
                    </div>
                </div>

                {/* --- Section Prix & Action --- */}
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-50">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900">{product.price}</span>
                            <span className="text-lg font-bold text-slate-900">€</span>
                        </div>
                        <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">
                            En stock
                        </span>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className={`p-5 rounded-[1.5rem] transition-all flex items-center justify-center shadow-xl ${
                            product.stock > 0 
                            ? 'bg-slate-900 hover:bg-orange-500 text-white shadow-slate-200 hover:shadow-orange-200 active:scale-95 cursor-pointer' 
                            : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                        }`}
                        title={product.stock > 0 ? "Ajouter au panier" : "Indisponible"}
                    >
                        {product.stock > 0 ? <ShoppingCart size={24} /> : <Package size={24} />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;