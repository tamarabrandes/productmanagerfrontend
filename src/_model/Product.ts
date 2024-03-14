export interface Product{
    id: number;
    titel: string;
    description: string;
    gtin: number;
    imageUrl: string;
    productCode: string;
}


export interface ProductModel{
    list:Product[],
    errormessage:string,
    editdata:Product
}
