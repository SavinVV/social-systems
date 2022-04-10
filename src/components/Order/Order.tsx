import OrderHeader from "./OrderHeader";
import OrderItem from "./OrderItem";
import'./orderStyle.css';
import { IOrder } from "../../interfaces/OrderInterfaces";

const Order = ({order}: IOrder) => {
    let orderItems;
    if (order.orderType === 'Аккаунт') {
        orderItems = [
            <OrderItem
                itemName={'Подписчики'}
                itemImgName={'subscribers.svg'}
                volume={order.numberOfSubscribers as number}
                key={'subscribers'}/>
        ]
    } else {
        orderItems = [
            <OrderItem
                itemName={'Лайки'}
                itemImgName={'like.svg'}
                volume={order.numberOflikes as number}
                key={'likes'}/>,
            <OrderItem
                itemName={'Репосты'}
                itemImgName={'repost.svg'}
                volume={order.numberOfReposts as number}
                key={'reposts'}/>
        ]
    }

    return (
        <div className="order">
            <OrderHeader
                    сustomerName={'Андрей Иванович'}
                    сustomerPhoto={order.сustomerPhoto}
                    orderType={order.orderType}
                    socialNetwork={order.socialNetwork}
                    link={order.link}/>
            {orderItems.map(item => item)}
        </div>
    )
}

export default Order;