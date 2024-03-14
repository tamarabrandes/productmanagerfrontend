import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../_service/master.service';
import { Product } from '../../../_model/Product';
import { MaterialModule } from '../../../_module/Material.Module';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteProduct, loadProduct } from '../../_store/Product/Product.Actions';
import { getProductList } from '../../_store/Product/Product.Selector';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-Product',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  constructor(private store: Store,private router:Router) {

  }
  productdata!: Product[];
  datasource: any;
  displayColums: string[] = ['id', 'titel', 'description', 'gtin', 'action'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.LoadInitialData();
  }

  LoadInitialData() {
    this.store.dispatch(loadProduct());
    this.store.select(getProductList).subscribe(item => {
      this.productdata = item;
      this.datasource = new MatTableDataSource(this.productdata);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  deleteproduct(code: string) {
    if (confirm("do you want to remove?")) {
      this.store.dispatch(deleteProduct({ code: code }));
    }
  }

  editproduct(code: string) {
    this.router.navigateByUrl('/product/edit/'+code);
  }

}
