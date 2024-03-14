import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductModel } from "../../../_model/Product";

const getproductstate = createFeatureSelector<ProductModel>('product');


export const getProductList = createSelector(getproductstate, (state) => {
    return state.list;
})

export const getEditdata = createSelector(getproductstate, (state) => {
    return state.editdata;
})
