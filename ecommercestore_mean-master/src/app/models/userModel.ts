
export interface userModel {
    _id?: string,
    username: string,
    email: string,
    role: string,
    password: string,
    gender: string,
    ordersCount?: number,
    orders?: [],
    image?: File,
    imageUrl?: string,
}
