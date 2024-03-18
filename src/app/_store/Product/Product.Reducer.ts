import { createReducer, on } from "@ngrx/store";
import { productState } from "./Product.State";
import { deleteProductSuccess, getProductSuccess, loadProductFail, loadProductSuccess, addProductFail } from "./Product.Actions";
import { state } from "@angular/animations";



const _ProductReducer = createReducer(productState,
    on(loadProductSuccess, (state, action) => {
        return {
            ...state,
            list: action.list,
            errormessage: '',
            editdata:{
              id: 1,
              titel: "",
              description: "",
              gtin: 1,
              imageUrl: "",
              productCode: ""
            }
        }
    }),
    on(getProductSuccess, (state, action) => {
        return {
            ...state,
            errormessage: '',
            editdata:action.obj
        }
    }),
    on(loadProductFail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addProductFail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    })
)


export function ProductReducer(state: any, action: any) {
    return _ProductReducer(state, action)
}
