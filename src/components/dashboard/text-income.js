import { FaArrowUp } from "react-icons/fa6";

export const TextIncome = ({ income }) => {
  const stringAmount = () => {
    return income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";
  }
  return (
    <div className="bg-white shadow-sm h-56 rounded-2xl col-span-2">
      <div className="border-b-2 p-4 flex items-center font-bold">
        <div className="w-2 h-2 bg-lime-500 rounded-full m-2"></div>Your Income
      </div>
      <div className="p-6 content-between">
        <div className="text-4xl font-bold">{stringAmount()}</div>
        <div className="text-gray-400">Your Income Amount</div>
        <div className="mt-8 flex items-center gap-2">
          <div className="h-5 w-5 bg-lime-500 rounded-full flex items-center justify-center">
            <FaArrowUp className="text-white w-3 h-3" />
          </div>
          0% from last month
        </div>
      </div>
    </div>
  );
};
