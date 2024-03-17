import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterService } from "../../_service/master.service";
import { addProduct, addProductSuccess, deleteProduct, deleteProductSuccess, emptyAction, getProduct, getProductByGtin, getProductSuccess, loadProduct, loadProductFail, loadProductSuccess, showAlert, updateProduct, updateProductSuccess } from "./Product.Actions";
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


    _getProduct = createEffect(() =>
    this.action$.pipe(
        ofType(getProduct),
        exhaustMap((action) => {
            return this.service.GetProductById(action.id).pipe(
                map((data) => {
                    return getProductSuccess({ obj: data })
                }),
                catchError((_err) => of(emptyAction()))
            )
        })
     )
   )
    _getProductByGtin = createEffect(() =>
    this.action$.pipe(
        ofType(getProductByGtin),
        exhaustMap((action) => {
            return this.service.GetProductByGtin(action.gtin).pipe(
                map((data) => {
                    return getProductSuccess({ obj: data })
                }),
                catchError((_err) => of(emptyAction()))
            )
        })
     )
   )
    _addProduct = createEffect(() =>
        this.action$.pipe(
            ofType(addProduct),
            switchMap((action) => {
                return this.service.CreateProduct(action.inputdata).pipe(
                    switchMap(() => {
                        return of(addProductSuccess(), showAlert({ message: 'Added successfully', resptype: 'pass' }))
                    }),
                    catchError((_err) => of(showAlert({ message: 'Failed to add', resptype: 'fail' })))
                )
            })
        )
    )

    _updateProduct = createEffect(() =>
        this.action$.pipe(
            ofType(updateProduct),
            switchMap((action) => {
                return this.service.UpdateProduct(action.inputdata).pipe(
                    switchMap(() => {
                        return of(updateProductSuccess(), showAlert({ message: 'Updated successfully', resptype: 'pass' }))
                    }),
                    catchError((_err) => of(showAlert({ message: 'Failed to update', resptype: 'fail' })))
                )
            })
        )
    )

    _deleteProduct = createEffect(() =>
        this.action$.pipe(
            ofType(deleteProduct),
            switchMap((action) => { console.log('deleteProduct - ' + action.id);
                return this.service.DeleteProduct(action.id).pipe(
                    switchMap(() => { console.log('deleteProduct -- ' + action.id);
                        return of(deleteProductSuccess({id:action.id}), showAlert({ message: 'Removed successfully', resptype: 'pass' }))
                    }),
                    catchError((_err) => of(showAlert({ message: 'Failed to delete', resptype: 'fail' })))
                )
            })
        )
    )


    _showalert = createEffect(() =>
        this.action$.pipe(
            ofType(showAlert),
            exhaustMap((action) => {
                return this.Showsnackbaraler(action.message, action.resptype).afterDismissed().pipe(
                    map(() => {
                        return emptyAction();
                    })
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
