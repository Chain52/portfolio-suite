import React from "react";

import { useContainerDimensions } from "~/hooks/useContainerDimensions";

export interface RootContextValue {
  dimensions: ReturnType<typeof useContainerDimensions>["dimensions"];
}

const RootContext = React.createContext<RootContextValue>({
  dimensions: { height: 0, width: 0 }
});

interface RootContextProviderProps extends React.PropsWithChildren {}

export function useRootContext() {
  const context = React.useContext(RootContext);
  return context;
}

export function RootContextProvider({ children }: RootContextProviderProps) {
  const { containerRef, dimensions } = useContainerDimensions<HTMLDivElement>();
  return (
    <div ref={containerRef} className="overflow-auto grow">
      <RootContext.Provider value={{ dimensions }}>
        {children}
      </RootContext.Provider>
    </div>
  );
}
