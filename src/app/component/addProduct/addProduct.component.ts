import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../_model/Product';
import { Store } from '@ngrx/store';
import { addProduct, getProduct, updateProduct , getProductByGtin} from '../../_store/Product/Product.Actions';
import { getEditdata } from '../../_store/Product/Product.Selector';

@Component({
  selector: 'app-addProduct',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './addProduct.component.html',
  styleUrl: './addProduct.component.css'
})
export class addProductComponent implements OnInit {
  editid = 0;
  dummy = Number(1234);
  pagetitle = 'Add Product';
  constructor(private builder: FormBuilder, private store: Store, private actroute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.editid = Number(this.actroute.snapshot.paramMap.get('id'));
    if (this.editid != null && this.editid != 0 && this.editid != undefined) {console.log(this.editid);
      this.pagetitle = 'Edit product';
      this.myform.controls.id.disable();
      this.myform.controls.productCode.disable();
      this.store.dispatch(getProduct({id:this.editid}))
      this.store.select(getEditdata).subscribe(item => {
        this.myform.setValue({ id: item.id, titel: item.titel, description: item.description, gtin: item.gtin, imageUrl: item.imageUrl, productCode: item.productCode });
      });
    }
  }
myform = this.builder.group({
    id: this.builder.control(this.dummy, Validators.required),
    titel: this.builder.control("", Validators.required),
    description: this.builder.control("", Validators.required),
    gtin: this.builder.control(this.dummy, Validators.required),
    imageUrl: this.builder.control("", Validators.required),
    productCode: this.builder.control("", Validators.required),
});

 CheckGtin() {
     const gtin = Number(this.myform.value.gtin);
     if (gtin != null && gtin != 0 && gtin != undefined) {
         this.store.dispatch(getProductByGtin({ gtin: gtin }));
         this.store.select(getEditdata).subscribe(item => {
         if(this.myform.value.titel == '') {
             this.myform.controls.titel.setValue(item.titel);
           }
         });
     }
 }
 Saveproduct() {
     const _obj: Product = {
         id: this.myform.value.id as number,
         titel: this.myform.value.titel as string,
         description: this.myform.value.description as string,
         gtin: this.myform.value.gtin as number,
         imageUrl: this.myform.value.imageUrl as string,
         productCode: this.myform.value.productCode as string
     }
     console.log(_obj);
     if (this.editid != null && this.editid != 0) {
         _obj.id = this.editid;
         this.store.dispatch(updateProduct({
             inputdata: _obj
         }));
     } else {
         _obj.id = this.editid;
         this.store.dispatch(addProduct({
             inputdata: _obj
         }));
     }
 }
}
