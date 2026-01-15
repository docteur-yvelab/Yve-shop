import { useState } from 'react';
import { X, Package, DollarSign, Tag, Hash, Upload, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const AddProductModal = ({ open, setOpen, refresh }) => {
    // États pour les champs du formulaire
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Électronique');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null); 
    
    // Gérer le changement d'image
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Veuillez sélectionner une image pour le produit.");
            return;
        }

        // Utilisation de FormData pour envoyer le fichier et les textes au PHP
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('description', description);
        formData.append('image', file);

        try {
            const response = await fetch("http://localhost/backend/products.php", {
                method: "POST",
                body: formData, 
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Produit ajouté avec succès !");
                setOpen(false);
                resetForm();
                refresh();
            } else {
                toast.error(data.message || "Erreur lors de l'ajout.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            toast.error("Impossible de communiquer avec le serveur.");
        }
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setStock('');
        setDescription('');
        setFile(null);
        setPreview(null);
    };

    if (!open) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                        <h3 className="text-2xl font-black text-slate-900">Ajouter un produit</h3>
                        <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Section Image */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700 block">Image du produit</label>
                                <div className="relative group h-64 w-full border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden hover:border-orange-500 transition-colors bg-gray-50">
                                    {preview ? (
                                        <>
                                            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                            <button 
                                                type="button" 
                                                onClick={() => {setFile(null); setPreview(null);}}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg"
                                            >
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <label className="cursor-pointer flex flex-col items-center">
                                            <Upload className="text-gray-400 mb-2 group-hover:text-orange-500" size={40} />
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Choisir un fichier</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Section Infos */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-black uppercase text-slate-400">Nom du produit</label>
                                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="ex: iPhone 15" />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-black uppercase text-slate-400">Catégorie</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-bold">
                                        <option value="Électronique">Électronique</option>
                                        <option value="Mode">Mode</option>
                                        <option value="Maison">Maison</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-black uppercase text-slate-400">Prix (€)</label>
                                        <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="0.00" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-black uppercase text-slate-400">Stock</label>
                                        <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="ex: 10" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-slate-400">Description</label>
                            <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none" placeholder="Décrivez le produit..."></textarea>
                        </div>

                        <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-500 transition-all shadow-xl shadow-slate-200">
                            Enregistrer le produit
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddProductModal;



// import * as Dialog from '@radix-ui/react-dialog';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useState, useRef } from 'react';
// import { useAdminStore } from '../../store/useAdminStore';
// import { X, Upload, ImageIcon, Loader2 } from 'lucide-react';
// import { toast } from 'sonner';

// const AddProductModal = ({ open, setOpen }) => {
//     const addProduct = useAdminStore((state) => state.addProduct);
//     const fileInputRef = useRef(null);
    
//     // États locaux
//     const [preview, setPreview] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         price: '',
//         category: 'Électronique',
//         stock: '',
//         image: ''
//     });

//     // Gestion du fichier image (Conversion en Base64 pour le stockage local)
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (file.size > 2 * 1024 * 1024) { // Limite de 2MB pour le stockage local
//                 toast.error("L'image est trop lourde (max 2MB)");
//                 return;
//             }

//             setIsUploading(true);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreview(reader.result);
//                 setFormData({ ...formData, image: reader.result });
//                 setIsUploading(false);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!formData.image) {
//             toast.error("Veuillez ajouter une image pour le produit");
//             return;
//         }

//         addProduct({
//             ...formData,
//             price: parseFloat(formData.price),
//             stock: parseInt(formData.stock),
//         });

//         toast.success(`${formData.name} ajouté au catalogue !`);
        
//         // Réinitialisation complète
//         setFormData({ name: '', price: '', category: 'Électronique', stock: '', image: '' });
//         setPreview(null);
//         setOpen(false);
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
//                                 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
//                             />
//                         </Dialog.Overlay>
                        
//                         <Dialog.Content asChild>
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
//                                 className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl z-[101] overflow-y-auto max-h-[90vh]"
//                             >
//                                 <div className="flex justify-between items-center mb-2">
//                                     <Dialog.Title className="text-2xl font-bold text-gray-800">Nouveau Produit</Dialog.Title>
//                                     <Dialog.Close asChild>
//                                         <button className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer text-gray-400 hover:text-gray-600">
//                                             <X size={20} />
//                                         </button>
//                                     </Dialog.Close>
//                                 </div>
                                
//                                 <Dialog.Description className="text-gray-500 text-sm mb-6">
//                                     Remplissez les informations pour publier l'article sur la boutique.
//                                 </Dialog.Description>

//                                 <form onSubmit={handleSubmit} className="space-y-5">
//                                     {/* Zone d'Upload Photo */}
//                                     <div 
//                                         onClick={() => fileInputRef.current?.click()}
//                                         className={`relative group h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all
//                                         ${preview ? 'border-orange-500 bg-orange-50/10' : 'border-gray-200 bg-gray-50 hover:border-orange-400'}`}
//                                     >
//                                         {preview ? (
//                                             <img src={preview} alt="Preview" className="h-full w-full object-contain p-2 rounded-2xl" />
//                                         ) : (
//                                             <div className="flex flex-col items-center">
//                                                 {isUploading ? (
//                                                     <Loader2 className="animate-spin text-orange-500 mb-2" size={32} />
//                                                 ) : (
//                                                     <>
//                                                         <ImageIcon className="text-gray-400 group-hover:text-orange-500 mb-2 transition-colors" size={32} />
//                                                         <span className="text-sm font-medium text-gray-500">Ajouter une photo</span>
//                                                     </>
//                                                 )}
//                                             </div>
//                                         )}
//                                         <input 
//                                             type="file" 
//                                             ref={fileInputRef} 
//                                             onChange={handleImageChange} 
//                                             accept="image/*" 
//                                             className="hidden" 
//                                         />
//                                     </div>

//                                     {/* Informations Textuelles */}
//                                     <div className="space-y-4">
//                                         <div>
//                                             <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Nom du produit</label>
//                                             <input
//                                                 required
//                                                 placeholder="ex: iPhone 15 Pro Max"
//                                                 className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition"
//                                                 value={formData.name}
//                                                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//                                             />
//                                         </div>

//                                         <div className="grid grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Prix (€)</label>
//                                                 <input
//                                                     required type="number" step="0.01"
//                                                     placeholder="0.00"
//                                                     className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
//                                                     value={formData.price}
//                                                     onChange={(e) => setFormData({...formData, price: e.target.value})}
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Quantité</label>
//                                                 <input
//                                                     required type="number"
//                                                     placeholder="10"
//                                                     className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
//                                                     value={formData.stock}
//                                                     onChange={(e) => setFormData({...formData, stock: e.target.value})}
//                                                 />
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <label className="text-xs font-semibold uppercase text-gray-400 ml-1">Catégorie</label>
//                                             <select
//                                                 className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
//                                                 value={formData.category}
//                                                 onChange={(e) => setFormData({...formData, category: e.target.value})}
//                                             >
//                                                 <option>Électronique</option>
//                                                 <option>Mode</option>
//                                                 <option>Maison</option>
//                                                 <option>Beauté</option>
//                                             </select>
//                                         </div>
//                                     </div>

//                                     <button
//                                         type="submit"
//                                         disabled={isUploading}
//                                         className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-200 active:scale-95 cursor-pointer disabled:opacity-50"
//                                     >
//                                         Publier le produit
//                                     </button>
//                                 </form>
//                             </motion.div>
//                         </Dialog.Content>
//                     </Dialog.Portal>
//                 )}
//             </AnimatePresence>
//         </Dialog.Root>
//     );
// };

// export default AddProductModal;