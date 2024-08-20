export const Steps = ({ steps }) => {
  return (
    <div className="flex gap-12 w-fit m-auto relative">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 bg-blue-600 rounded-full text-center text-white">
          1
        </div>
        <p>Currency</p>
      </div>
      <div
        className={`absolute border-2 ${
          steps > 1 ? "border-blue-600" : "border-gray-300"
        }  top-[10px] -z-10 left-9  w-24`}
      ></div>
      <div className="flex flex-col items-center">
        <div
          className={`w-6 h-6 ${
            steps > 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
          }  rounded-full text-center`}
        >
          2
        </div>
        <p>Balance</p>
      </div>
      <div
        className={`absolute border-2 ${
          steps > 2 ? "border-blue-600" : "border-gray-300"
        }  top-[10px] -z-10 left-36  w-24`}
      ></div>
      <div className="flex flex-col items-center">
        <div
          className={`w-6 h-6 ${
            steps > 2 ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
          } rounded-full text-center`}
        >
          3
        </div>
        <p>Finish</p>
      </div>
    </div>
  );
};
