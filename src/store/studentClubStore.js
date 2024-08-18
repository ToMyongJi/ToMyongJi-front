import { create } from 'zustand';
import { fetchAllClubs } from '../utils/receiptApi';

const useStudentClubStore = create((set, get) => ({
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
  getClubNameById: (clubId) => {
    const club = get().clubs.find((club) => club.id === clubId);
    return club ? club.studentClubName : '알 수 없는 동아리';
  },
}));

useStudentClubStore.getState().fetchClubs();

export default useStudentClubStore;
