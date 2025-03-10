import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ColorStore = {
  color: "dark" | "light";
  setColor: (color: "dark" | "light") => void;
};

export const useColorStore = create<ColorStore>()(
  persist(
    (set) => ({
      color: "dark",
      setColor: (color: "dark" | "light") => set({ color }),
    }),
    {
      name: "color-mode",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const useStore = create((set) => ({
  lang: "ko",
  setLang: (lang: "ko" | "en") => set({ lang }),
}));

export default useStore;
