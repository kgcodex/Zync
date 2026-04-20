import React, { type ReactNode, useMemo } from 'react';

type MeetingGripProps = {
  children: ReactNode[];
};

const MeetingGrid = ({ children }: MeetingGripProps) => {
  const count = children.length;

  const gridClasses = useMemo(() => {
    if (count === 1) return 'grid-cols-1 max-w-[60%]';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2 max-w-[80%] pt-40';
    if (count <= 4) return 'grid-cols-1 md:grid-cols-2 max-w-[80%]';
    if (count <= 6) return 'grid-cols-2 lg:grid-cols-3 max-w-[1200px]';
    return 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  }, [count]);
  return (
    <div className="w-full h-[calc(100vh-100px)] p-6 overflow-y-auto  px-6 no-scrollbar">
      <div className={`grid gap-4 w-full h-fit mx-auto transition-all duration-500 ${gridClasses}`}>
        {children}
      </div>
    </div>
  );
};

export default MeetingGrid;
