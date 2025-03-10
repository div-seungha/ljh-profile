import { create } from "zustand";

const useStore = create((set) => ({
  color: "dark",
  setColor: (color: "dark" | "light") => set({ color }),
  lang: "ko",
  setLang: (lang: "ko" | "en") => set({ lang }),
}));

export default useStore;
