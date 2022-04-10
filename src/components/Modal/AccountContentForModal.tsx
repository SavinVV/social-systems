import './modalStyle.css';
import { Component } from "react";
import ItemForContentModal  from './ItemForContentModal';
import { IAccountContentForModal } from '../../interfaces/ModalInterfaces';

class AccountContentForModal extends Component<IAccountContentForModal>{
    subscribersTotalPrice = 0;

    setSubscribersTotalPrice = (subscribersTotalPrice: number) => {
        this.subscribersTotalPrice = subscribersTotalPrice;
        this.props.caclTotalPrice(subscribersTotalPrice);
    }

    render() {
        const {socialNetwork} = this.props;
        const subscriberPrice = socialNetwork === 'instagram' ? 5 : 4;
        return (
            <div className="modalItemsBlock">
                <ItemForContentModal
                    itemName={'Подписчики'}
                    itemImgName={'subscribers.svg'}
                    price={subscriberPrice}
                    calcTotalPrice={this.setSubscribersTotalPrice}
                    getTotalNumber={this.props.onChangeNumberOfSubscribers}/>
            </div>
        )
    }
}

export default AccountContentForModal;