
import { IOrderData } from "./OrderInterfaces";

export interface IModal {
    closeModal: () => void;
    addOrderItem: (orderItem: IOrderData) => void;
}

export interface IAccountContentForModal {
    socialNetwork: string,
    caclTotalPrice: (totalPrice: number) => void;
    onChangeNumberOfSubscribers: (e:number) => void;
}

export interface IPostContentForModal {
    socialNetwork: string,
    caclTotalPrice: (totalPrice: number) => void;
    onChangeNumberOflikes: (e:number) => void;
    onChangeNumberOfReposts: (e:number) => void;
}

export interface IItemForContentModal {
    itemName: string,
    itemImgName: string,
    price: number
    calcTotalPrice: (totalPrice: number) => void;
    getTotalNumber: (num: number) => void;
}

