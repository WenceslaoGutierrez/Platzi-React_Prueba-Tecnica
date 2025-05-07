import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, Order, ShoppingCartContextType } from '../Types/index';

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  // Shopping Cart · Item count
  const [count, setCount] = useState(0);

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout Side Menu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Product Detail · Selected product
  const [productToShow, setProductToShow] = useState<Product | null>(null);

  // Shopping Cart · Products in cart
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  // Shopping Cart · Orders
  const [order, setOrder] = useState<Order[]>([]);

  // Store · All items and filtered items
  const [items, setItems] = useState<Product[] | null>(null);
  const [filteredItems, setFilteredItems] = useState<Product[] | null>(null);

  // Store · Search filters
  const [searchByTitle, setSearchByTitle] = useState<string | null>(null);
  const [searchByCategory, setSearchByCategory] = useState<string | null>(null);

  // Store · Current date string
  const currentDate = new Date().toLocaleDateString('en-US');

  // API · Fetch product data
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        console.log('🟢 Products loaded from API:', data);
        setItems(data);
      })
      .catch((err) => console.error('🔴 Error fetching products:', err));
  }, []);

  // Filtering logic by title and category
  const filterBy = (
    searchType: string | null,
    items: Product[] | null,
    searchByTitle: string | null,
    searchByCategory: string | null
  ): Product[] | null => {
    if (!items) return null;

    if (searchType === 'BY_TITLE') {
      return items.filter((item) =>
        item.title.toLowerCase().includes((searchByTitle || '').toLowerCase())
      );
    }

    if (searchType === 'BY_CATEGORY') {
      return items.filter((item) =>
        item.category.toLowerCase().includes((searchByCategory || '').toLowerCase())
      );
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return items
        .filter((item) =>
          item.category.toLowerCase().includes((searchByCategory || '').toLowerCase())
        )
        .filter((item) =>
          item.title.toLowerCase().includes((searchByTitle || '').toLowerCase())
        );
    }

    return items;
  };

  // Effect · Reactively filter items
  useEffect(() => {
    let searchType: string | null = null;

    if (searchByTitle && searchByCategory) searchType = 'BY_TITLE_AND_CATEGORY';
    else if (searchByTitle) searchType = 'BY_TITLE';
    else if (searchByCategory) searchType = 'BY_CATEGORY';

    const result = filterBy(searchType, items, searchByTitle, searchByCategory);
    setFilteredItems(result);
    console.log('🔍 Filtered items:', result);
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        order,
        setOrder,
        items,
        setItems,
        filteredItems,
        setFilteredItems,
        searchByTitle,
        setSearchByTitle,
        searchByCategory,
        setSearchByCategory,
        currentDate,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
