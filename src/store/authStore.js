import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
