import { useState, useEffect } from 'react';
import { Search, Filter, PackageSearch, Loader2, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from '../../components/shop/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Tous');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const categories = ['Tous', 'Électronique', 'Mode', 'Maison'];

    // Fonction pour charger les produits
    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Le ?t=... force le navigateur à ignorer le cache et voir les nouveaux produits
            const response = await fetch(`http://localhost/backend/products.php?t=${new Date().getTime()}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Erreur lors du chargement des produits:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // --- LOGIQUE DE RECHERCHE ET FILTRAGE ---
    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'Tous' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="text-orange-500" size={20} />
                            <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">Premium Collection</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900">YVE SHOP<span className="text-orange-500">.</span></h1>
                    </motion.div>

                    {/* Barre de recherche intelligente */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative w-full md:w-[400px] group"
                    >
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Rechercher un produit, une marque..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-[2rem] shadow-xl shadow-slate-200/50 outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-slate-700"
                        />
                    </motion.div>
                </header>

                {/* Barre de Filtres */}
                <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
                    <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg shadow-slate-200">
                        <Filter size={20} />
                    </div>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-4 rounded-2xl font-black text-sm transition-all cursor-pointer whitespace-nowrap ${
                                activeCategory === cat 
                                ? 'bg-orange-500 text-white shadow-xl shadow-orange-200 scale-105' 
                                : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grille de Produits ou Loader */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 className="animate-spin text-orange-500 mb-4" size={48} />
                        <p className="text-slate-400 font-black uppercase tracking-tighter">Mise à jour du catalogue...</p>
                    </div>
                ) : (
                    <div className="relative">
                        <motion.div 
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="col-span-full py-20"
                                    >
                                        <div className="bg-white rounded-[3rem] p-16 text-center shadow-sm border border-dashed border-slate-200 flex flex-col items-center">
                                            <div className="bg-slate-50 p-6 rounded-full mb-6">
                                                <PackageSearch size={60} className="text-slate-200" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-800 mb-2">Oups ! Aucun résultat</h3>
                                            <p className="text-slate-400 font-medium max-w-xs">
                                                Nous n'avons trouvé aucun produit correspondant à <span className="text-orange-500 font-bold">"{searchTerm}"</span>.
                                            </p>
                                            <button 
                                                onClick={() => {setSearchTerm(''); setActiveCategory('Tous');}}
                                                className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-500 transition-colors"
                                            >
                                                Réinitialiser les filtres
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;