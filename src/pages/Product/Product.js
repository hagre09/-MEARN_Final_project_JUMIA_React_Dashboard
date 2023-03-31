import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductList,
  total,
  deleteProduct,
} from "../../redux/actions/Product";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/table/Table";
import { APIURL } from "../../netWork/netWork";

// import { getCategoryListAll } from "../../redux/actions/Category";

export default function Products() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { num } = useParams() || 1;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(num);
  // const [pages, setPages] = useState(1);
  const pages = total;
  // const { categories } = useSelector(state => state.categories)
  // useEffect(() => {
  //     dispatch(getCategoryListAll())
  // }, []);
  const [state, setState] = useState({
    checValue: "",
    checkKey: "",
  });
  const [search, setSearch] = useState();

  // const { checkKey, checValue } = state

  // const handelIKeyChange = (e) => {
  //     let { name, value } = e.target;
  //     setState({ ...state, [name]: value })
  // }

  // const handelValuChange = (e) => {
  //     let { name, value } = e.target;
  //     setState({ ...state, [name]: value })
  // }
  // //    Math.ceil
  // // console.log(pages)
  useEffect(() => {
    dispatch(getProductList(page, { search, ...state }));

    // setPages(total)
  }, [page, state, search]);

  // console.log(products, total, 'ppp')

  // /////////////////////////////////////////////////
  // const [names, setName] = useState('');
  // // const submitHandler = (e) => {
  // //     e.preventDefault();

  // //   };
  // const handelInputChange = (e) => {
  //     setName(e.target.value)
  //     console.log(e.target.value)
  // };

  // console.log(totalWords.replace(/ .*/,''),'test')

  const handeldelete = (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
  };
  const columns = [
    {
      key: "name",
      label: "Product name",
      type: "text",
    },
    {
      key: "image",
      label: "image",
      type: "action",
      payload({ row }) {
        return <img src={APIURL + row.imagePath[0]} alt="" height="50px" />;
      },
    },
    {
      key: "countInStock",
      label: "Stock",
      type: "text",
    },
    {
      key: "price",
      label: "price",
      type: "text",
    },

    {
      key: "_id",
      label: "action",
      type: "action",
      payload({ row }) {
        return (
          <div className=" row justify-content-between align-content-center  ">
            <Link
              to={"/ProductDetails/" + row._id}
              className="col-12 d-flex col-md-4 justify-content-center text-center align-content-center"
            >
              <i
                class="bi bi-eye showicon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Review"
              ></i>
            </Link>
            <Link
              to={"/FormProduct/" + row._id}
              className="col-12 d-flex col-md-4 justify-content-center text-center align-content-center"
            >
              <i
                className="bi bi-pencil-square upicon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit"
              ></i>
            </Link>
            <i
              className="bi bi-trash-fill delicon   col-12 d-flex col-md-4 justify-content-center text-center align-content-center"
              onClick={() => handeldelete(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete"
            ></i>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container ">
      <Link to="/FormProduct">
        <button className="btn btn-btn m-3 ">New Product</button>
      </Link>
      <div className="container ">
        <div className="ms-auto row mb-3 col-lg-6">
          <div className="topnav__search col-6">
            <input
              type="text"
              placeholder="Search here..."
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <i className="bx bx-search"></i>
          </div>
        </div>
        {products.length ? (
          <>
            <Table columns={columns} rows={products} />
            <Pagination page={page || 1} pages={pages} changePage={setPage} />
          </>
        ) : (
          "no data"
        )}
      </div>
    </div>
  );
}
