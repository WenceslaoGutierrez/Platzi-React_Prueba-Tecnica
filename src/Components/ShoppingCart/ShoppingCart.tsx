import { useContext, type ReactNode } from "react";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { ShoppingBagIcon } from '@heroicons/react/24/solid'


const ShoppingCart = ():ReactNode =>{
    const context = useContext(ShoppingCartContext);
    
    const openCheckoutSideMenu = ():void =>{
        context.openCheckoutSideMenu();
        context.closeProductDetail();
    }

    return(
        <div className="relative flex gap-0.5 items-center" onClick={openCheckoutSideMenu}>
          <ShoppingBagIcon className='w-6 h-6 fill-none stroke-black cursor-pointer'/>
          <div className="absolute bottom-3.5 left-3.5 flex justify-center items-center rounded-full bg-black w-4 h-4 text-xs text-white">
            {context.cartProducts.length}
          </div>
        </div>
    )
};

export default ShoppingCart;