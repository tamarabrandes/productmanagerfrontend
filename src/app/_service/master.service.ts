import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../_model/Product';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {

  }

  GetAllProduct() {
    //return this.http.get<Product[]>('http://productmanager-env.eba-g9wxi3vp.eu-central-1.elasticbeanstalk.com/product/all');
    return this.http.get<Product[]>('/product/all');
  }

  haveaccess() {
    return true;
  }
}
