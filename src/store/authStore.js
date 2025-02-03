import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      authData: null,
      setAuthData: (grantType, accessToken, refreshToken) =>
        set({
          authData: {
            grantType,
            accessToken,
            refreshToken,
          },
        }),
      clearAuthData: () => set({ authData: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
