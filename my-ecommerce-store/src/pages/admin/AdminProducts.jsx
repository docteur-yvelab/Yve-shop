import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Tag } from 'lucide-react';
import AddProductModal from '../../components/admin/AddProductModal';
import { toast } from 'sonner';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Charger les produits depuis MySQL
    const fetchProducts = async () => {
        const res = await fetch("http://localhost/backend/products.php");
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id) => {
        if(confirm("Supprimer ce produit ?")) {
            await fetch(`http://localhost/backend/products.php?id=${id}`, { method: 'DELETE' });
            toast.success("Produit supprimé");
            fetchProducts(); // Rafraîchir la liste
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-slate-900">Gestion Inventaire</h2>
                <button onClick={() => setIsAddOpen(true)} className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
                    <Plus size={20}/> Nouveau Produit
                </button>
            </div>

            <AddProductModal open={isAddOpen} setOpen={setIsAddOpen} refresh={fetchProducts} />

            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b">
                        <tr className="text-gray-400 text-xs uppercase font-black">
                            <th className="p-6">Produit</th>
                            <th className="p-6">Catégorie</th>
                            <th className="p-6">Prix / Stock</th>
                            <th className="p-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id} className="border-b hover:bg-gray-50/50 transition">
                                <td className="p-6 flex items-center gap-4">
                                    <img src={p.image_url} className="w-12 h-12 rounded-xl object-cover" />
                                    <span className="font-bold">{p.name}</span>
                                </td>
                                <td className="p-6">
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2 w-fit">
                                        <Tag size={14}/> {p.category}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <div className="font-black">{p.price}€</div>
                                    <div className="text-xs text-gray-400">{p.stock} en stock</div>
                                </td>
                                <td className="p-6 flex justify-center gap-2">
                                    <button onClick={() => handleDelete(p.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                                        <Trash2 size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;


// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useAdminStore } from '../../store/useAdminStore';
// import { Plus, Trash2, Edit, AlertCircle, ShoppingCart } from 'lucide-react';
// import AddProductModal from '../../components/admin/AddProductModal';
// import EditProductModal from '../../components/admin/EditProductModal';

// const AdminProducts = () => {
//     const products = useAdminStore((state) => state.products);
//     const deleteProduct = useAdminStore((state) => state.deleteProduct);
    
//     const [isAddOpen, setIsAddOpen] = useState(false);
//     const [isEditOpen, setIsEditOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     const handleEditClick = (product) => {
//         setSelectedProduct(product);
//         setIsEditOpen(true);
//     };

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
//             <div className="flex justify-between items-center mb-8">
//                 <div>
//                     <h2 className="text-3xl font-black text-slate-900">Stock & Inventaire</h2>
//                     <p className="text-gray-500 font-medium">Contrôlez vos {products.length} références</p>
//                 </div>
//                 <button 
//                     onClick={() => setIsAddOpen(true)}
//                     className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-orange-500 transition-all font-bold shadow-lg shadow-slate-200"
//                 >
//                     <Plus size={20}/> Nouveau Produit
//                 </button>
//             </div>

//             <AddProductModal open={isAddOpen} setOpen={setIsAddOpen} />
//             <EditProductModal open={isEditOpen} setOpen={setIsEditOpen} product={selectedProduct} />

//             <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
//                 <table className="w-full text-left">
//                     <thead className="bg-gray-50 border-b">
//                         <tr className="text-gray-400 text-xs uppercase font-black">
//                             <th className="p-6">Désignation</th>
//                             <th className="p-6">Prix</th>
//                             <th className="p-6">État du Stock</th>
//                             <th className="p-6 text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-50">
//                         {products.map((product) => (
//                             <tr key={product.id} className="hover:bg-slate-50/50 transition">
//                                 <td className="p-6">
//                                     <div className="flex items-center gap-4">
//                                         <img src={product.image} className="w-14 h-14 rounded-2xl object-cover bg-gray-100" alt="" />
//                                         <span className="font-bold text-slate-800">{product.name}</span>
//                                     </div>
//                                 </td>
//                                 <td className="p-6 font-black text-slate-900">{product.price}€</td>
//                                 <td className="p-6">
//                                     <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm ${
//                                         product.stock <= 5 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
//                                     }`}>
//                                         <div className={`w-2 h-2 rounded-full ${product.stock <= 5 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
//                                         {product.stock} en réserve
//                                     </div>
//                                 </td>
//                                 <td className="p-6">
//                                     <div className="flex justify-center gap-2">
//                                         <button 
//                                             onClick={() => handleEditClick(product)}
//                                             className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition cursor-pointer"
//                                         >
//                                             <Edit size={20}/>
//                                         </button>
//                                         <button 
//                                             onClick={() => deleteProduct(product.id)}
//                                             className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition cursor-pointer"
//                                         >
//                                             <Trash2 size={20}/>
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </motion.div>
//     );
// };

// export default AdminProducts;