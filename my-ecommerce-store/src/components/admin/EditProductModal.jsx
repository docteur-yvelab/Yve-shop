import { useState, useEffect } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { X, Package, DollarSign, ImageIcon, Hash } from 'lucide-react';
import { motion , AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const EditProductModal = ({ open , setOpen, product }) => {
    const updateProduct = useAdminStore((state) => state.updateProduct);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        image: ''
    });

    // Charger les données du produit quand le modal s'ouvre
    useEffect(() => {
        if (product) {
        setFormData({
            name: product.name,
            price: product.price,
            stock: product.stock,
            image: product.image
        });
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(product.id, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
        });
        toast.success("Produit mis à jour !");
        setOpen(false);
    };

    if (!open) return null;

    return (
        <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-slate-900">Modifier le produit</h3>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                <label className="text-sm font-bold ml-1">Nom</label>
                <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" value={formData.name} className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-bold ml-1">Prix (€)</label>
                    <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="number" step="0.01" value={formData.price} className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setFormData({...formData, price: e.target.value})} />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-bold ml-1">Stock</label>
                    <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="number" value={formData.stock} className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                    </div>
                </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all mt-4">
                Enregistrer les modifications
                </button>
            </form>
            </motion.div>
        </div>
        </AnimatePresence>
    );
};

export default EditProductModal;