export const AddRecordType = ({ chooseType, setChooseType }) => {
  return (
    <div
      className="bg-gray-100 rounded-full py-2 relative flex justify-between overflow-hidden"
      onClick={() => setChooseType(!chooseType)}
    >
      <div
        className={`flex-1 text-center ${
          chooseType ? "text-white" : "text-black"
        } z-10 `}
      >
        Expense
      </div>
      <div
        className={`absolute w-1/2 text-transparent rounded-full h-full top-0 ${
          chooseType
            ? "translate-x-0 bg-blue-600"
            : "translate-x-full bg-green-500"
        }`}
      ></div>
      <div
        className={`flex-1 text-center ${
          chooseType ? "text-black" : "text-white"
        } z-10 `}
      >
        Income
      </div>
    </div>
  );
};
