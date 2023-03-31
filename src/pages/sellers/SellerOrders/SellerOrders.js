import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
// import { getSellerOrders } from './../../../redux/actions/Seller';



export default function SellerOrders() {
    // const { sellerOrders } = useSelector(state => state.sellers)
    // const dispatch = useDispatch(); 
    // let { id } = useParams();

    // useEffect(() => {
    //     dispatch(getSellerOrders(id));
    // }, []);
    return (
        <div>
            SellerOrders
          
        </div>
    )
}
