import React, {useEffect, useState} from "react";
import {ProductClient} from "@api/product";

export const ProductList = (props: Props) => {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    ProductClient.searchProduct(0).then(resp => {
      setProducts(resp.content);
    });
  }, []);

  return (
    <div style={{marginTop: '100px'}}>
      {(products && products.length === 0) ? (
        <h2>Henüz ürün ekleme yapılmamıştır.</h2>
      ) : (
        <h1>TEST</h1>
      )}
    </div>
  );
};

interface Props {
  userIsLogin: boolean
}