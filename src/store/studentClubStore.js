import { create } from 'zustand';
import { fetchAllClubs } from '../utils/receiptApi';

const useStudentClubStore = create((set) => ({
  clubs: [],
  isLoading: false,
  error: null,
  fetchClubs: async () => {
    set({ isLoading: true });
    try {
      const clubs = await fetchAllClubs();
      set({ clubs, isLoading: false, error: null });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));

export default useStudentClubStore;
