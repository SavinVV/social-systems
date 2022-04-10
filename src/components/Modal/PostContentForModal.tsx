import './modalStyle.css';
import { IPostContentForModal } from '../../interfaces/ModalInterfaces';
import { Component } from "react";
import ItemForContentModal  from './ItemForContentModal';

class PostContentForModal extends Component<IPostContentForModal>{
    likeTotalPrice = 0;
    repostTotalPrice = 0;

    setLikeTotalPrice = (likeTotalPrice: number) => {
        this.likeTotalPrice = likeTotalPrice;
        const totalPrice = this.likeTotalPrice + this.repostTotalPrice;
        this.props.caclTotalPrice(totalPrice);
    }

    setRepostTotalPrice = (repostTotalPrice: number) => {
        this.repostTotalPrice = repostTotalPrice;
        const totalPrice = this.likeTotalPrice + this.repostTotalPrice;
        this.props.caclTotalPrice(totalPrice);
    }

    render() {
        const {socialNetwork} = this.props;
        const likePrice = socialNetwork === 'instagram' ? 5 : 2;
        const repostPrice = socialNetwork === 'instagram' ? 1.3 : 2.2;
        return (
            <div className="modalItemsBlock">
                <ItemForContentModal
                    itemName={'Лайки'}
                    itemImgName={'like.svg'}
                    price={likePrice}
                    calcTotalPrice={this.setLikeTotalPrice}
                    getTotalNumber={this.props.onChangeNumberOflikes}/>
                <ItemForContentModal
                    itemName={'Репосты'}
                    itemImgName={'repost.svg'}
                    price={repostPrice}
                    calcTotalPrice={this.setRepostTotalPrice}
                    getTotalNumber={this.props.onChangeNumberOfReposts}/>
            </div>
        )
    }
}

export default PostContentForModal;