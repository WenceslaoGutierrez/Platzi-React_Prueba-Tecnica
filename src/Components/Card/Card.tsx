import { useContext } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import type { Product } from "../../Types";

type CardProps = {
  data: Product;
};

const Card = ({ data }: CardProps) => {
  const context = useContext(ShoppingCartContext);

  const showProduct = (productDetail: Product) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
  };

  const addProductToCart = (
    event: React.MouseEvent<HTMLDivElement>,
    productData: Product
  ) => {
    event.stopPropagation();
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productData]);
    context.openCheckoutSideMenu();
    context.closeProductDetail();
  };

  const renderIcon = (id: number) => {
    const isInCart = context.cartProducts.some((product) => product.id === id);

    return (
      <div
        className={`absolute top-0 right-0 flex justify-center items-center w-6 h-6 rounded-full m-2 p-1 ${
          isInCart ? "bg-black" : "bg-white"
        }`}
        onClick={isInCart ? undefined : (e) => addProductToCart(e, data)}
      >
        {isInCart ? (
          <CheckIcon className="h-6 w-6 text-white" />
        ) : (
          <PlusIcon className="h-6 w-6 text-black" />
        )}
      </div>
    );
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProduct(data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {data.category}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data.image}
          alt={data.title}
        />
        {renderIcon(data.id)}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light">{data.title}</span>
        <span className="text-lg font-medium">${data.price}</span>
      </p>
    </div>
  );
};

export default Card;
