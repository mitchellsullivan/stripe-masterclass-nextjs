// import React, { createContext, useState } from 'react';
// import SHOP_DATA, {ShopProduct} from '../lib/data-utils';
//
// export interface IProductsContext {
//   products: ShopProduct[],
//   activeProduct: ShopProduct | null,
//   setCurrentProduct: void
// }
//
// export const ProductsContext = createContext<IProductsContext>({
//   products: [],
//   activeProduct: null
// });
//
// const ProductsContextProvider: React.FunctionComponent = ({ children }) => {
//   const [products, setProducts] = useState(SHOP_DATA);
//   const [activeProduct, setActiveProduct] = useState<ShopProduct>(null);
//
//
//
//   const ctx: IProductsContext = {
//     products,
//     activeProduct
//   }
//
//   return (
//     <ProductsContext.Provider value={ctx}>
//       {
//         children
//       }
//     </ProductsContext.Provider>
//   );
// }
//
// export default ProductsContextProvider;

export default 1;
