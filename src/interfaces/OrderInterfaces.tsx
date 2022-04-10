export interface IOrder {
    order: IOrderData,
}

export interface IOrderData {
    сustomerName: string,
    сustomerPhoto: string,
    orderType: string,
    socialNetwork: string,
    link: string,
    numberOflikes?: number,
    numberOfReposts?: number,
    numberOfSubscribers?: number,
}

export interface IOrderItem {
    itemName: string,
    itemImgName: string,
    volume: number
}

export interface IOrderHeader {
    сustomerName: string,
    сustomerPhoto: string,
    orderType: string,
    socialNetwork: string,
    link: string
}