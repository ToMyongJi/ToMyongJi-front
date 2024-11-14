import { create } from 'zustand';

const useCollegeStore = create((set) => ({
  colleges: [],
  setColleges: (colleges) => set({ colleges }),
  clearColleges: () => set({ colleges: [] }),
  addCollege: (college) =>
    set((state) => ({
      colleges: [...state.colleges, college],
    })),
  updateCollege: (updatedCollege) =>
    set((state) => ({
      colleges: state.colleges.map((college) =>
        college.collegeId === updatedCollege.collegeId ? updatedCollege : college
      ),
    })),
  removeCollege: (collegeId) =>
    set((state) => ({
      colleges: state.colleges.filter((college) => college.collegeId !== collegeId),
    })),
}));

export default useCollegeStore;
