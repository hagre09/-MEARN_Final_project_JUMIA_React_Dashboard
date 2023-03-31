import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { GetSingleProduct } from "../../../redux/actions/Product";
const ProductDetails = () => {
  const { product } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  let { id } = useParams();
  useEffect(() => {
    dispatch(GetSingleProduct(id));
  }, [id]);
console.log(product,'product')
  return (
    <>
      <div>name:{product.name}</div>
      {/* <div>image:{product.imagePath[0]}</div> */}
      <div>price:{product.price}</div>
      {/* <div>category:{product.category.name}</div> */}
      <div>sup category:{product.subcategory}</div>
    </>
  );
};

export default ProductDetails;
