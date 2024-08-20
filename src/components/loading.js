export const LoadingForm = () => {
  return (
    <div className="fixed w-screen h-screen bg-white top-0 z-50 left-0 flex flex-col gap-12 items-center justify-center">
      <div className="flex items-center gap-4 text-4xl font-extrabold">
        <svg
          width="45"
          height="44"
          viewBox="0 0 45 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.7274 14.5884V0.0812988H14.9043V14.5884H0.0811234V29.4116H14.9043V43.9187H29.7274V29.4116H44.5505V14.5884H29.7274ZM29.7274 29.0955H14.9043V14.9067H29.7274V29.0955Z"
            fill="#0166FF"
          />
        </svg>
        Geld
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-white w-8 h-8 flex  animate-spin items-center justify-center rounded-full border-4 border-l-blue-600"></div>
        <p>Түр хүлээнэ үү...</p>
      </div>
    </div>
  );
};
