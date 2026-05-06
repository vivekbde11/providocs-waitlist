"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const WaitlistCtx = createContext<Ctx>({ open: false, setOpen: () => {} });

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <WaitlistCtx.Provider value={{ open, setOpen }}>
      {children}
    </WaitlistCtx.Provider>
  );
}

export function useWaitlist() {
  return useContext(WaitlistCtx);
}
