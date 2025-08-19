import React from 'react';

interface BlockProps extends React.PropsWithChildren {
  scale: number;
}

export default function Block({ scale, children }: BlockProps) {
  return (
    <div
      style={{ gridColumn: `span ${scale} / span ${scale}` }}
      className="border-2 border-black grid grid-cols-subgrid place-items-center"
    >
      {children}
    </div>
  );
}
