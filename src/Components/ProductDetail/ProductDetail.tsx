import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import './styles.css';

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);
  const product = context.productToShow;

  if (!product) return null;

  return (
    <aside
      className={`${context.isProductDetailOpen ? "flex" : "hidden"} 
            product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <XMarkIcon
          className="h-6 w-6 text-black cursor-pointer"
          onClick={context.closeProductDetail}
        />
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full rounded-lg"
          src={product.image}
          alt={product.title}
        />
      </figure>
      <p className="flex flex-col p-6">
        <span className="font-medium text-2xl mb-2">${product.price}</span>
        <span className="font-medium text-md">{product.title}</span>
        <span className="font-light text-sm">{product.description}</span>
      </p>
    </aside>
  );
};

export default ProductDetail;
