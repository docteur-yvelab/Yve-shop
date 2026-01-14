import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} ajouté au panier !`, {
        icon: <ShoppingCart size={16} className="text-orange-500" />,
        });
    };

    return (
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
        >
        {/* Image du produit */}
        <div className="relative h-64 overflow-hidden bg-gray-50">
            <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm">
                {product.category}
            </span>
            </div>
        </div>

        {/* Détails */}
        <div className="p-5">
            <h3 className="text-lg font-bold text-gray-800 truncate mb-1">{product.name}</h3>
            
            <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs text-gray-400 ml-1">(4.5)</span>
            </div>

            <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-black text-slate-900">{product.price}€</span>
            <button 
                onClick={handleAddToCart}
                className="bg-slate-900 hover:bg-orange-500 text-white p-3 rounded-xl transition-colors cursor-pointer"
            >
                <ShoppingCart size={20} />
            </button>
            </div>
        </div>
        </motion.div>
    );
};

export default ProductCard;