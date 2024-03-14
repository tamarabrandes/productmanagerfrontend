import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../_model/Product';
import { Store } from '@ngrx/store';
import { addProduct, getProduct, updateProduct } from '../../_store/Product/Product.Actions';
import { getEditdata } from '../../_store/Product/Product.Selector';

@Component({
  selector: 'app-addProduct',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './addProduct.component.html',
  styleUrl: './addProduct.component.css'
})
export class addProductComponent implements OnInit {
  editcode = '';
  pagetitle = 'Add Product';
  constructor(private builder: FormBuilder, private store: Store, private actroute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.editcode = this.actroute.snapshot.paramMap.get('code') as string;
    if (this.editcode != null && this.editcode != '') {
      this.pagetitle = 'Edit product';
      this.myform.controls.code.disable();
      this.store.dispatch(getProduct({code:this.editcode}))
      this.store.select(getEditdata).subscribe(item => {
        this.myform.setValue({ code: item.code, name: item.name, email: item.email, phone: item.phone });
      });
    }
  }
  myform = this.builder.group({
    code: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required)
  })

  Saveproduct() {
    if (this.myform.valid) {
      const _obj: Product = {
        code: this.myform.value.code as string,
        name: this.myform.value.name as string,
        email: this.myform.value.email as string,
        phone: this.myform.value.phone as string,
      }
      console.log(_obj);
      if(this.editcode!=null && this.editcode!=''){
        _obj.code=this.editcode;
        this.store.dispatch(updateProduct({ inputdata: _obj }));
      }else{
        this.store.dispatch(addProduct({ inputdata: _obj }));
      }
     

    }

  }
}
