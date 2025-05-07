import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';
import OrdersCard from '../../Components/OrdersCard/OrdersCard';
import type { Order } from '../../Types';

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>My Orders</h1>
      </div>
      {
        context.order.map((order: Order, index: number) => (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
              date={new Date(order.date)}
              />
          </Link>
        ))
      }
    </Layout>
  );
}

export default MyOrders;
