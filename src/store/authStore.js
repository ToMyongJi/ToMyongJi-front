import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      grantType: null,
      setAuthData: (grantType, accessToken, refreshToken) => set({ grantType, accessToken, refreshToken }),
      clearAuthData: () => set({ grantType: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
