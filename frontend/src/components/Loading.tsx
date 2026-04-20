import React from 'react';

import { Spinner } from './ui/spinner';

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-row justify-center items-center gap-2">
        <Spinner /> Loading...
      </div>
    </div>
  );
};

export default Loading;
