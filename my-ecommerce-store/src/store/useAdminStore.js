import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAdminStore = create(
    persist(
        (set) => ({
        isAdminAuthenticated: false,
        products: [],
        
        adminLogin: (id, pass) => {
            if (id === "admin@shop.com" && pass === "admin123") {
                set({ isAdminAuthenticated: true });
                return true;
            }
                return false;
        },
        
        adminLogout: () => set({ isAdminAuthenticated: false }),

        addProduct: (product) => set((state) => ({
            products: [...state.products, { ...product, id: Date.now() }]
        })),
        deleteProduct: (id) => set((state) => ({
            products: state.products.filter((p) => p.id !== id)
        })),
        }),
        { name: 'admin-storage' }
    )
);