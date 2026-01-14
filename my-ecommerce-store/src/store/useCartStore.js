// import { create } from 'zustand';

// export const useCartStore = create((set, get) => ({
//     cart: [],
    
//     // Ajouter au panier avec vérification d'existence
//     addToCart: (product) => {
//         const cart = get().cart;
//         const found = cart.find((item) => item.id === product.id);

//         if (found) {
//         const updatedCart = cart.map((item) =>
//             item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//         set({ cart: updatedCart });
//         } else {
//         set({ cart: [...cart, { ...product, quantity: 1 }] });
//         }
//     },

//     removeFromCart: (productId) => set((state) => ({
//         cart: state.cart.filter((item) => item.id !== productId)
//     })),

//     decrementQuantity: (productId) => set((state) => {
//         const cart = state.cart.map(item => {
//             if (item.id === productId && item.quantity > 1) {
//                 return { ...item, quantity: item.quantity - 1 };
//             }
//             return item;
//         });
//         return { cart };
//     }),

//     clearCart: () => set({ cart: [] }),

//     // Sélecteur pour calculer le total
//     getTotalPrice: () => {
//         return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
//     },
// }));


import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
        cart: [],
        addToCart: (product) => {
            const cart = get().cart;
            const found = cart.find((item) => item.id === product.id);
            if (found) {
            set({
                cart: cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
            });
            } else {
            set({ cart: [...cart, { ...product, quantity: 1 }] });
            }
        },
        removeFromCart: (productId) => set((state) => ({
            cart: state.cart.filter((item) => item.id !== productId)
        })),
        decrementQuantity: (productId) => set((state) => ({
            cart: state.cart.map(item =>
            item.id === productId && item.quantity > 1 
            ? { ...item, quantity: item.quantity - 1 } : item
            )
        })),
        clearCart: () => set({ cart: [] }),
        getTotalPrice: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
        {
        name: 'cart-storage',
        }
    )
);