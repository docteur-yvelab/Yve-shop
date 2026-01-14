import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminStore } from '../../store/useAdminStore';
import { Plus, Trash2, Edit } from 'lucide-react';
import AddProductModal from '../../components/admin/AddProductModal';

const AdminProducts = () => {
    // On récupère les produits et la fonction de suppression du store
    const products = useAdminStore((state) => state.products);
    const deleteProduct = useAdminStore((state) => state.deleteProduct);
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des Produits</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer shadow-md"
                >
                    <Plus size={20}/> Ajouter un produit
                </button>
            </div>

            <AddProductModal open={isModalOpen} setOpen={setIsModalOpen} />

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Produit</th>
                            <th className="p-4 font-semibold text-gray-600">Catégorie</th>
                            <th className="p-4 font-semibold text-gray-600">Prix</th>
                            <th className="p-4 font-semibold text-gray-600">Stock</th>
                            <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                            <span className="font-medium text-gray-700">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm">{product.category}</td>
                                    <td className="p-4 font-bold text-orange-600">{product.price}€</td>
                                    <td className="p-4 text-gray-600">{product.stock} unités</td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                                                <Edit size={18}/>
                                            </button>
                                            <button 
                                                onClick={() => deleteProduct(product.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                            >
                                                <Trash2 size={18}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-20 text-center text-gray-400">
                                    <p className="text-lg">Aucun produit dans le catalogue.</p>
                                    <p className="text-sm">Cliquez sur "Ajouter un produit" pour commencer.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default AdminProducts;