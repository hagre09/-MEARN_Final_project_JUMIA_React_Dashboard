import ThemeReducer from "./ThemeReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { ProductsReducer } from "./Products";
import { categoryReducer } from "./Categories";
import { supCategoryReducer } from "./SupCategory";

const rootReducer = combineReducers({
  ThemeReducer,
  auth: authReducer,
  products: ProductsReducer,
  categories: categoryReducer,
  supCategories: supCategoryReducer,
});

export default rootReducer;
