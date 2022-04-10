import './modalStyle.css';
import { IItemForContentModal } from '../../interfaces/ModalInterfaces';
import { Component } from "react";
import { observer } from "mobx-react"; 
import { observable, action, makeObservable } from "mobx";

@observer
class ItemForContentModal extends Component<IItemForContentModal>{
    @observable totalPrice = 0;

    constructor(props: IItemForContentModal) {
        super(props);
        makeObservable(this);
    }

    @action
    setTotalPrice = (value: number) => {
        this.totalPrice = Math.floor((value * this.props.price));
    }

    onChangeInput = (e) => {
        e.target.value = e.target.value.replace(/\D/g,'');
        if (String(e.target.value).length > 6) {
            e.target.value = e.target.value.slice(0, 7);
        }
        e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        if (e.target.value === '') {
            e.target.value = 0;
        }
        if (e.target.value.length > 1 && e.target.value[0] === '0') {
            e.target.value = e.target.value.slice(1, e.target.value.length);
        }
        
        let value = e.target.value !== '' ? +e.target.value.split(' ').join('') : 0;
        this.setTotalPrice(value)
        this.props.calcTotalPrice(this.totalPrice);
        this.props.getTotalNumber(value);
    }

    render() {
        const {itemName, itemImgName} = this.props;
        return (
            <div className="modalItem wrapper">
                <div className='modalItemContent'>
                    <div className="modalItemImg">
                        <img src={`./img/${itemImgName}`} alt={itemName} />
                    </div>
                    <p>{itemName}</p>
                </div>
                <div className='modalItemPriceBlock'>
                    <input type="text" defaultValue={0} onChange={e => this.onChangeInput(e)}/>
                    <p>{`${this.totalPrice} ₽`}</p>
                </div>
            </div>
        )
    }
}

export default ItemForContentModal;