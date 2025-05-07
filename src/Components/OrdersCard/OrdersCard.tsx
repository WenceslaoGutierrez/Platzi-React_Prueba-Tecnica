import { ChevronRightIcon } from "@heroicons/react/24/solid";

type OrdersCardProps = {
  date: Date;
  totalPrice: number;
  totalProducts: number;
};

const OrdersCard = ({ date, totalPrice, totalProducts }: OrdersCardProps) => {
  return (
    <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80">
      <div className="flex justify-between w-full">
        <p className="flex flex-col">
          <span className="font-light">{date.toLocaleDateString("en-US")}</span>
          <span className="font-light">{totalProducts} artículos</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-2xl">${totalPrice}</span>
          <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
