import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { authGuard } from './_service/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent , canActivate: [authGuard]},
    { path: 'product', component: ProductComponent, canActivate: [authGuard] },
    {
        path: 'product/add', loadComponent: () => import('./component/addProduct/addProduct.component').then(m => m.addProductComponent),
        canActivate: [authGuard]
    },
    {
        path: 'product/update/:id', loadComponent: () => import('./component/addProduct/addProduct.component').then(m => m.addProductComponent),
        canActivate: [authGuard]
    }
];
