import'./orderStyle.css';
import { IOrderHeader } from '../../interfaces/OrderInterfaces';

const OrderHeader = ({сustomerName, сustomerPhoto, orderType, socialNetwork, link}: IOrderHeader) => {
    const checkCorrectLink = () => {
        if (link.split(':')[0] !== 'https' || link.split(':')[0] !== 'https') {
            link = 'https://' + link;
        }
    }
    checkCorrectLink();
    return (
        <div className="orderItem orderHeader">
            <div className="orderItemContainer">
                <div className="orderItemImg">
                    <img src={`./img/${сustomerPhoto}`} alt="img" />
                </div>
                <div className="orderItemContent">
                    <p>{сustomerName}</p>
                    <a href={link}>{`${orderType} ${socialNetwork}`}</a>
                </div>
            </div>
        </div>
    )
}

export default OrderHeader;