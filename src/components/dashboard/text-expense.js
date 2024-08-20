import { FaArrowDown } from "react-icons/fa6";

export const TextExpense = () => {
  return (
    <div className="bg-white shadow-sm h-56 rounded-2xl col-span-2">
      <div className="border-b-2 p-4 flex items-center font-bold">
        <div className="w-2 h-2 bg-orange-500 rounded-full m-2"></div>Your
        Expenses
      </div>
      <div className="p-6 content-between">
        <div className="text-4xl font-bold">-1,200,000₮</div>
        <div className="text-gray-400">Your Expenses Amount</div>
        <div className="mt-8 flex items-center gap-2">
          <div className="h-5 w-5 bg-orange-500 rounded-full flex items-center justify-center">
            <FaArrowDown className="text-white w-3 h-3" />
          </div>
          32% from last month
        </div>
      </div>
    </div>
  );
};
