import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';
import Layout from '../../Components/Layout/Layout';
import OrderCard from '../../Components/OrderCard/OrderCard';
import type { Product } from '../../Types';

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index: number | string = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  if (index === 'last') {
    index = context.order.length - 1;
  } else {
    index = Number(index);
  }

  const currentOrder = context.order?.[index];

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-6'>
        <Link to='/my-orders' className='absolute left-0'>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className='flex flex-col w-80'>
        {currentOrder?.products.map((product: Product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyOrder;
