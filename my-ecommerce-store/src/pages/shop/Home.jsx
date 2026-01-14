import { useAdminStore } from '../../store/useAdminStore';
import ProductCard from '../../components/shop/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
    const products = useAdminStore((state) => state.products);

    return (
        <div className="min-h-screen bg-gray-50/50">
            
        {/* Hero Section simple */}
        <section className="bg-slate-900 text-white py-16 px-6">
            <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl md:text-6xl font-black mb-4"
            >
                Découvrez nos <span className="text-orange-500">Exclusivités</span>
            </motion.h1>
            <p className="text-gray-400 max-w-xl mx-auto">
                Des produits sélectionnés avec soin pour votre quotidien, livrés en un temps record.
            </p>
            </div>
        </section>

        {/* Grille de Produits */}
        <main className="max-w-7xl mx-auto py-12 px-6">
            <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Nos Articles</h2>
            <span className="text-sm text-gray-500 font-medium">{products.length} produits trouvés</span>
            </div>

            {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
            ) : (
            <div className="text-center py-20">
                <p className="text-gray-400">Le catalogue est vide pour le moment.</p>
            </div>
            )}
        </main>
        </div>
    );
};

export default Home;