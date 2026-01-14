// import * as Dialog from '@radix-ui/react-dialog';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useState } from 'react';
// import { useAdminStore } from '../../store/useAdminStore';
// import { X } from 'lucide-react';
// import { toast } from 'sonner';

// const AddProductModal = ({ open, setOpen }) => {
//     const addProduct = useAdminStore((state) => state.addProduct);
//     const [formData, setFormData] = useState({
//         name: '',
//         price: '',
//         category: 'Électronique',
//         stock: '',
//         image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         // Sécurité : Vérification des types
//         const priceNum = parseFloat(formData.price);
//         const stockNum = parseInt(formData.stock);

//         if (isNaN(priceNum) || isNaN(stockNum)) {
//             toast.error("Veuillez entrer des nombres valides pour le prix et le stock");
//             return;
//         }

//         addProduct({
//             ...formData,
//             price: priceNum,
//             stock: stockNum,
//         });

//         toast.success(`${formData.name} ajouté !`);
//         setOpen(false); // Ferme la modal
        
//         // Reset le formulaire
//         setFormData({ name: '', price: '', category: 'Électronique', stock: '', image: formData.image });
//     };

//     return (
//         <Dialog.Root open={open} onOpenChange={setOpen}>
//             <AnimatePresence>
//                 {open && (
//                     <Dialog.Portal forceMount>
//                         <Dialog.Overlay asChild>
//                             <motion.div
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 exit={{ opacity: 0 }}
//                                 className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
//                             />
//                         </Dialog.Overlay>
//                         <Dialog.Content asChild>
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0.95, y: 10 }}
//                                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                                 exit={{ opacity: 0, scale: 0.95, y: 10 }}
//                                 className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl z-[101]"
//                             >
//                                 <Dialog.Title className="text-xl font-bold mb-1">Nouveau Produit</Dialog.Title>
//                                 <Dialog.Description className="text-gray-500 text-sm mb-4">
//                                     Ajoutez un article à votre inventaire.
//                                 </Dialog.Description>

//                                 <form onSubmit={handleSubmit} className="space-y-4">
//                                     <input
//                                         placeholder="Nom"
//                                         required
//                                         className="w-full p-2 border rounded-lg outline-orange-500"
//                                         value={formData.name}
//                                         onChange={(e) => setFormData({...formData, name: e.target.value})}
//                                     />
//                                     <div className="flex gap-2">
//                                         <input
//                                             placeholder="Prix"
//                                             type="number"
//                                             required
//                                             className="w-full p-2 border rounded-lg outline-orange-500"
//                                             value={formData.price}
//                                             onChange={(e) => setFormData({...formData, price: e.target.value})}
//                                         />
//                                         <input
//                                             placeholder="Stock"
//                                             type="number"
//                                             required
//                                             className="w-full p-2 border rounded-lg outline-orange-500"
//                                             value={formData.stock}
//                                             onChange={(e) => setFormData({...formData, stock: e.target.value})}
//                                         />
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
//                                     >
//                                         Confirmer l'ajout
//                                     </button>
//                                 </form>

//                                 <Dialog.Close asChild>
//                                     <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
//                                         <X size={20} />
//                                     </button>
//                                 </Dialog.Close>
//                             </motion.div>
//                         </Dialog.Content>
//                     </Dialog.Portal>
//                 )}
//             </AnimatePresence>
//         </Dialog.Root>
//     );
// };

// export default AddProductModal;




import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { X, Upload, ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AddProductModal = ({ open, setOpen }) => {
    const addProduct = useAdminStore((state) => state.addProduct);
    const fileInputRef = useRef(null);
    
    // États locaux
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Électronique',
        stock: '',
        image: ''
    });

    // Gestion du fichier image (Conversion en Base64 pour le stockage local)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // Limite de 2MB pour le stockage local
                toast.error("L'image est trop lourde (max 2MB)");
                return;
            }

            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setFormData({ ...formData, image: reader.result });
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error("Veuillez ajouter une image pour le produit");
            return;
        }

        addProduct({
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
        });

        toast.success(`${formData.name} ajouté au catalogue !`);
        
        // Réinitialisation complète
        setFormData({ name: '', price: '', category: 'Électronique', stock: '', image: '' });
        setPreview(null);
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                            />
                        </Dialog.Overlay>
                        
                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl z-[101] overflow-y-auto max-h-[90vh]"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <Dialog.Title className="text-2xl font-bold text-gray-800">Nouveau Produit</Dialog.Title>
                                    <Dialog.Close asChild>
                                        <button className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer text-gray-400 hover:text-gray-600">
                                            <X size={20} />
                                        </button>
                                    </Dialog.Close>
                                </div>
                                
                                <Dialog.Description className="text-gray-500 text-sm mb-6">
                                    Remplissez les informations pour publier l'article sur la boutique.
                                </Dialog.Description>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Zone d'Upload Photo */}
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`relative group h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all
                                        ${preview ? 'border-orange-500 bg-orange-50/10' : 'border-gray-200 bg-gray-50 hover:border-orange-400'}`}
                                    >
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="h-full w-full object-contain p-2 rounded-2xl" />
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                {isUploading ? (
                                                    <Loader2 className="animate-spin text-orange-500 mb-2" size={32} />
                                                ) : (
                                                    <>
                                                        <ImageIcon className="text-gray-400 group-hover:text-orange-500 mb-2 transition-colors" size={32} />
                                                        <span className="text-sm font-medium text-gray-500">Ajouter une photo</span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleImageChange} 
                                            accept="image/*" 
                                            className="hidden" 
                                        />
                                    </div>

                                    {/* Informations Textuelles */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Nom du produit</label>
                                            <input
                                                required
                                                placeholder="ex: iPhone 15 Pro Max"
                                                className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Prix (€)</label>
                                                <input
                                                    required type="number" step="0.01"
                                                    placeholder="0.00"
                                                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Quantité</label>
                                                <input
                                                    required type="number"
                                                    placeholder="10"
                                                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                                                    value={formData.stock}
                                                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Catégorie</label>
                                            <select
                                                className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                                                value={formData.category}
                                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            >
                                                <option>Électronique</option>
                                                <option>Mode</option>
                                                <option>Maison</option>
                                                <option>Beauté</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isUploading}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-200 active:scale-95 cursor-pointer disabled:opacity-50"
                                    >
                                        Publier le produit
                                    </button>
                                </form>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
};

export default AddProductModal;