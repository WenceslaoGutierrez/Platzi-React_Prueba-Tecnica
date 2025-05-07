import { useContext } from 'react';
import type { ChangeEvent } from 'react';
import Layout from '../../Components/Layout/Layout';
import Card from '../../Components/Card/Card';
import ProductDetail from '../../Components/ProductDetail/ProductDetail';
import { ShoppingCartContext } from '../../Context/ShoppingCartContext';
import type { Product } from '../../Types';

const Home = () => {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    console.log('🟩 Rendered items:', context.filteredItems);
  
    if (context.filteredItems.length === 0) {
      return <div>We don't have anything</div>;
    }
  
    return context.filteredItems.map((item: Product) => (
      <Card key={item.id} data={item} />
    ));
  };
  

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    context.setSearchByTitle(event.target.value);
  };

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>Exclusive Products</h1>
      </div>
      <input
        type='text'
        placeholder='Search a product'
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
        onChange={handleSearch}
      />
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
};

export default Home;
