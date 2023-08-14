import { combineReducers } from "redux";

import MaincategoryReducer from "./MaincategoryReducer";
import SubcategoryReducer from "./SubcategoryReducer";
import BrandReducer from "./BrandReducer";
import ProductReducer from "./ProductReducer";
import CartReducer from "./CartReducer";
import CheckoutReducer from "./CheckoutReducer";
import ContactReducer from "./ContactReducer ";
import NewslatterReducer from "./NewslatterReducer ";
import WishlistReducer from "./WishlistReducer ";


export default combineReducers({
    MaincategoryStateData: MaincategoryReducer,
    SubcategoryStateData: SubcategoryReducer,
    BrandStateData: BrandReducer,
    ProductStateData: ProductReducer,
    CartStateData: CartReducer ,
    CheckoutStateData: CheckoutReducer,
    ContactStateData: ContactReducer,
    NewslatterStateData: NewslatterReducer,
    WishlistStateData: WishlistReducer

})
