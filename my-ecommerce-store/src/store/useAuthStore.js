import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        // Action pour l'inscription / connexion
        login: (userData, token) => set({ 
            user: userData, 
            token: token, 
            isAuthenticated: true 
        }),

        // Action pour la déconnexion
        logout: () => set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
        }),

        // Mise à jour du profil (ex: ajout d'adresse)
        updateUser: (updatedData) => set((state) => ({
            user: { ...state.user, ...updatedData }
        })),
        }),
        {
        name: 'auth-storage', // Nom de la clé dans le localStorage
        }
    )
);