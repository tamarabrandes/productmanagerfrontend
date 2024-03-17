import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../_model/Product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {

  }

  GetAllProduct() {
    return this.http.get<Product[]>('/product/all');
  }
  CreateProduct(product: Product) {
    return this.http.post('/product/add', product);
  }
  UpdateProduct(product: Product) {
    return this.http.put('/product/update?id='+product.id, product);
  }
  DeleteProduct(id:number) { console.log('deleteProduct ' +id);
    return this.http.delete('/product/delete/'+id);
  }
  GetProductById(id:number) {
    return this.http.get<Product>('/product/find/'+id);
  }
    GetProductByGtin(gtin:number) {
      return this.http.get<Product>('/product/findgtin/'+gtin);
    }
  haveaccess() {
    return true;
  }
}
