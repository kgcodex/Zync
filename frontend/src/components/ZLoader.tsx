const ZLoader = ({ size = 100, color = 'white', duration = 2 }) => {
  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <style>
          {`
            @keyframes drawZ {
              0% { stroke-dashoffset: 300; opacity: 0; }
              10% { opacity: 1; }
              70% { stroke-dashoffset: 0; }
              90%, 100% { stroke-dashoffset: 0; opacity: 0; }
            }
            .z-path {
              stroke-dasharray: 300;
              stroke-dashoffset: 300;
              animation: drawZ ${duration}s ease-in-out infinite;
            }
          `}
        </style>
        <path
          className="z-path"
          d="M 20 25 L 80 25 L 20 75 L 80 75"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default ZLoader;
