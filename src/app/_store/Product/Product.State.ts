import { ProductModel } from "../../../_model/Product";

export const productState: ProductModel = {
    list: [],
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
