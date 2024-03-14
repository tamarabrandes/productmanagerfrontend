import { createAction, props } from "@ngrx/store"
import { Product } from "../../../_model/Product"

export const LOAD_PRODUCT = '[product] load product'
export const LOAD_PRODUCT_SUCCESS = '[product] load product success'
export const LOAD_PRODUCT_FAIL = '[product] load product fail'

export const GET_PRODUCT = '[product] get product'
export const GET_PRODUCT_SUCCESS = '[product] get product success'

export const ADD_PRODUCT = '[product] add product'
export const ADD_PRODUCT_SUCCESS = '[product] add product success'

export const UPDATE_PRODUCT = '[product] update product'
export const UPDATE_PRODUCT_SUCCESS = '[product] update product success'

export const DELETE_PRODUCT = '[product] delete product'
export const DELETE_PRODUCT_SUCCESS = '[product] delete product success'

export const SHOW_ALERT = '[product] show alert'


export const loadProduct = createAction(LOAD_PRODUCT)
export const loadProductSuccess = createAction(LOAD_PRODUCT_SUCCESS, props<{ list: Product[] }>())
export const loadProductFail = createAction(LOAD_PRODUCT_FAIL, props<{ errormessage: string }>())

export const getProduct = createAction(GET_PRODUCT, props<{ code: string }>())
export const getProductSuccess = createAction(GET_PRODUCT_SUCCESS, props<{ obj: Product }>())


export const addProduct = createAction(ADD_PRODUCT, props<{ inputdata: Product }>())
export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS)

export const updateProduct = createAction(UPDATE_PRODUCT, props<{ inputdata: Product }>())
export const updateProductSuccess = createAction(UPDATE_PRODUCT_SUCCESS)

export const deleteProduct = createAction(DELETE_PRODUCT, props<{ code: string }>())
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS, props<{ code: string }>())

export const showAlert = createAction(SHOW_ALERT, props<{ message: string, resptype: string }>())
export const emptyAction = createAction('emptyaction')
