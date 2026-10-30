// context/ParamContext.tsx
'use client';

import { createContext, useContext } from 'react';

const ParamContext = createContext( { slug: null });

export function ParamProvider({ children, slug }) {
  return <ParamContext.Provider value={{ slug }}>{children}</ParamContext.Provider>;
}

export const useParam = () => useContext(ParamContext);
