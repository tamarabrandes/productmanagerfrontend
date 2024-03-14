import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterService } from "../../_service/master.service";
import { addProduct, addProductSuccess, deleteProduct, deleteProductSuccess, emptyAction, getProduct, getProductSuccess, loadProduct, loadProductFail, loadProductSuccess, showAlert, updateProduct, updateProductSuccess } from "./Product.Actions";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class ProductEffects {
    constructor(private action$: Actions, private service: MasterService, private _snackbar: MatSnackBar) {

    }

    _loadProduct = createEffect(() =>
        this.action$.pipe(
            ofType(loadProduct),
            exhaustMap((action) => {
                return this.service.GetAllProduct().pipe(
                    map((data) => {
                        return loadProductSuccess({ list: data })
                    }),
                    catchError((_err) => of(loadProductFail({ errormessage: _err.message })))
                )
            })
        )
    )

    Showsnackbaraler(message: string, resptype: string = 'fail') {
        let _class = resptype === 'pass' ? 'text-green' : 'text-red';
        return this._snackbar.open(message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: [_class]
        })
    }

}
