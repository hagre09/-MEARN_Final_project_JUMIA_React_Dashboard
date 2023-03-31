import { axiosInstance } from "../../netWork/netWork";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = {
  headers: {
    "content-type":
      "multipart/form-data; boundary=--------------------------037384031508980924639346",
  },
};

export var total;
export const getProductList = (pag, x) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(
      `/products/filter?page=${pag}`,
      x
    );
    total = response.data.pages;
    dispatch({
      type: "GET_Products_LIST",
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const AddNewProduct = (prod) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/products", prod, config);
    dispatch({
      type: "ADD_PRODUCT",
      payload: response.data,
    });
    toast.success(`Product was added successfully`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (err) {
    toast.error(`${err.message} `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

// export var filterpro = []
// export const getAllProductList = (ns) => async (dispatch) => {
//     try {
//         const response = await axiosInstance.post(`/products/search/${ns}`);
//         console.log('response', response)
//         filterpro = response.data
//         dispatch({
//             type: "ALL_PRODUCTS_LIST",
//             payload: response.data
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    const res = await axiosInstance.post(`/products/filter?page=1`);
    dispatch({
      type: "DELET_PRODUCT",
      payload: res.data,
    });
    toast.success(`Item deleted successfully`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (err) {
    console.log(err);
    toast.error(`${err.message} `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const GetSingleProduct = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/products/details/${id}`);
    dispatch({
      type: "GET_SINGIL_Product",
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UpdateProduct = (pro, id) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, pro, config);
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// //////// Reviews

// export const GetReviewsSingleProduct = (id) => async (dispatch) => {
//     try {
//         //   console.log(dispatch)
//         const response = await axiosInstance.get(`/products/details/${id}`);
//         console.log('response', response)
//         dispatch({
//             type: "GET_REVIEWS_SINGIL_Product",
//             payload: response.data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const deleteSingleReview = (pid, rid) => async (dispatch) => {
//     try {
//         //   console.log(dispatch)
//         const response = await axiosInstance.put(`/products/${pid}/${rid}`);
//         // console.log('response',response)
//         dispatch({
//             type: "DELET_SINGLE_REVIEW_PRODUCT",
//             payload: response.data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const GetProductsCategories = () => async (dispatch) => {
//     try {
//         //   console.log(dispatch)
//         const response = await axiosInstance.get(`/products/chart/productCategories`);
//         console.log('response', response)
//         dispatch({
//             type: "GET_Products_CATEGORIES",
//             payload: response.data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// export var EleModel;
// export const AddNewElecModel = (mod) => async (dispatch) => {
//     try {
//         //   console.log(dispatch)
//         const response = await axiosInstance.post('/products/model', mod);
//         console.log('response', response.data._id )
//         EleModel = response.data._id
//         dispatch({
//             type: "ADD_ELECMODEL",
//             payload: response.data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const Updatemodel = (pro, id) => async (dispatch) => {
//     try {
//         console.log(pro, id)
//         const response = await axiosInstance.put(`/products/up/mod/${id}`, pro);
//         console.log('response', response)
//         dispatch({
//             type: "UPDATE_MODEL",
//             payload: response.data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };
