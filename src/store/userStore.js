import { create } from 'zustand';
import { fetchUserInfo } from '../utils/authApi';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  fetchUser: async (userId) => {
    try {
      const userInfo = await fetchUserInfo(userId);
      set({ user: userInfo });
    } catch (error) {
      console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
    }
  },
}));

export default useUserStore;
