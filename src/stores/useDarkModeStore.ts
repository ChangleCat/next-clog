import { create } from "zustand";

type darkModeStore = {
  darkMode: boolean;
  setDarkMode: (darkmode:boolean)=>void;
}

export const useDarkModeStore = create<darkModeStore>((set)=>({
  darkMode: true,
  setDarkMode: (darkMode) => set(()=> ({darkMode:darkMode}))
}))