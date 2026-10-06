import type { User } from "@/lib/types";
import { create } from "zustand";

interface Location {
  city: string;
  state: string;
  postal_code: string;
  latitude?: string;
  longitude?: string;
  address: string;
}

interface UserStore {
  user: User | null;
  setUser: (val: User | null) => void;
  location: Location | null;
  setLocation: (val: Location) => void;
  socket: WebSocket | null;
  setSocket: (val: WebSocket | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (val) => {
    set({ user: val });
  },
  location: JSON.parse(sessionStorage.getItem("location")!) ?? null,
  setLocation: (val) => {
    sessionStorage.setItem("location", JSON.stringify(val));
    set({ location: val });
  },
  socket: null,
  setSocket: (val) => {
    set({ socket: val });
  },
}));
