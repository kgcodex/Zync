import ZLoader from './ZLoader';

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <ZLoader /> Loading...
      </div>
    </div>
  );
};

export default Loading;
