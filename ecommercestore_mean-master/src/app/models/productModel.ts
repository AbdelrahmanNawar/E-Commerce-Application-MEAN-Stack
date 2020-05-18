export interface productModel{
    _id?:string,
    title?: string,
    image?: File,
    imageUrl?: string,
    price?: number,
    details?: string,
    quantity?: number,
    isPromoted?: string,
    promotion?: number,
    category?: string,
    isDeleted?: boolean
}