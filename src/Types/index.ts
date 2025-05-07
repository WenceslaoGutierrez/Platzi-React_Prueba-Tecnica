// Product
export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};
  
// Order
export type Order = {
    date: string;
    products: Product[];
    totalProducts: number;
    totalPrice: number;
};

// ShoppingCart Context
export type ShoppingCartContextType = {
    count: number;
    setCount: (count: number) => void;
    isProductDetailOpen: boolean;
    openProductDetail: () => void;
    closeProductDetail: () => void;
    isCheckoutSideMenuOpen: boolean;
    openCheckoutSideMenu: () => void;
    closeCheckoutSideMenu: () => void;
    productToShow: Product | null;
    setProductToShow: (product: Product) => void;
    cartProducts: Product[];
    setCartProducts: (products: Product[]) => void;
    order: Order[];
    setOrder: (order: Order[]) => void;
    items: Product[] | null;
    setItems: (items: Product[]) => void;
    filteredItems: Product[] | null;
    setFilteredItems: (items: Product[] | null) => void;
    searchByTitle: string | null;
    setSearchByTitle: (title: string | null) => void;
    searchByCategory: string | null;
    setSearchByCategory: (category: string | null) => void;
    currentDate: string;
  };