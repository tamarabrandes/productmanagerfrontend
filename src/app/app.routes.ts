import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { authGuard } from './_service/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'product', loadComponent: () => import('./component/product/product.component').then(m => m.ProductComponent),
        canActivate: [authGuard]
    }
];
