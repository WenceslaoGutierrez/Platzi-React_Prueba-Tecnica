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

// Account
export type Account = {
  name: string;
  email: string;
  password: string;
};

// ShoppingCart Context
export type ShoppingCartContextType = {
    account: Record<string, unknown>;
    setAccount: (data: Record<string, unknown>) => void;
    signOut: boolean;
    setSignOut: (value: boolean) => void;
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
    filteredItems: Product[];
    setFilteredItems: (items: Product[]) => void;
    searchByTitle: string | null;
    setSearchByTitle: (title: string | null) => void;
    searchByCategory: string | null;
    setSearchByCategory: (category: string | null) => void;
    currentDate: string;
  };