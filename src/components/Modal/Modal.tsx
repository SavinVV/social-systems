import './modalStyle.css';
import { IModal } from '../../interfaces/ModalInterfaces';
import { Component } from "react";
import { observer } from "mobx-react"; 
import { observable, action, makeObservable } from "mobx";
import Button from '../Button';
import PostContentForModal from './PostContentForModal';
import AccountContentForModal from './AccountContentForModal';
import { IOrderData } from '../../interfaces/OrderInterfaces';

@observer
class Modal extends Component<IModal>{
    @observable addBtnIsActive = false;
    @observable socialNetwork = '';
    @observable orderType = '';
    @observable totalPrice = 0;
    сustomerName = 'Андрей Иванович';
    сustomerPhoto = 'avatar.svg';
    orderLink = '';
    numberOflikes = 0;
    numberOfReposts = 0;
    numberOfSubscribers = 0;

    constructor(props: IModal) {
        super(props);
        makeObservable(this);
    }

    @action
    setSocialNetworkAndOrderType = (socialNetwork = '', orderType = '') => {
        this.socialNetwork = socialNetwork;
        this.orderType = orderType;
    }

    @action
    setActiveAddBtn = (value: boolean) => {
        this.addBtnIsActive = value;
    }

    @action
    setTotalPrice = (totalPrice: number) => {
        this.totalPrice = totalPrice;
    }

    checkValidationLink = (): boolean => {
        const instAccountReg = /^(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com)\/(\w+)\/?$/igm;
        const instPostReg = /^(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com)\/(\p)\/([a-zA-Z0-9_-]+)\/?$/igm;
        const vkAccountReg = /^(?:(?:http|https):\/\/)?(?:vk.com)\/([a-zA-Z0-9_-]+)\/?$/igm;
        const vkPostReg = /^(?:(?:http|https):\/\/)?(?:vk.com)\/([a-zA-Z0-9_-]+)(\?w=wall)([a-zA-Z0-9%_-]+)\/?$/igm;
        
        if (instPostReg.test(this.orderLink)) {
            this.setSocialNetworkAndOrderType('Инстаграм', 'Пост');
            return true;
        } else if (instAccountReg.test(this.orderLink)) {
            this.setSocialNetworkAndOrderType('Инстаграм', 'Аккаунт');
            return true;
        } else if (vkPostReg.test(this.orderLink)) {
            this.setSocialNetworkAndOrderType('ВК', 'Пост');
            return true;
        } else if (vkAccountReg.test(this.orderLink)) {
            this.setSocialNetworkAndOrderType('ВК', 'Аккаунт');
            return true;
        } else {
            this.setSocialNetworkAndOrderType();
            return false;
        }
    }

    checkValidationData = (): boolean => {
        if (this.numberOflikes || this.numberOfReposts || this.numberOfSubscribers) {
            return true;
        } else {
            return false;
        }
    }

    onChangeLink = (e: any) => {
        this.orderLink = e.target.value;
        const redWarning = document.querySelector('.redWarning');
        const inputImg = document.querySelector('.inputImg img');
        const inputLink = document.querySelector('.modalInput');
        if (this.checkValidationLink()) {
            redWarning?.classList.add('hiden');
            e.target.style.borderColor = '#ececec';
            inputImg?.classList.remove('hiden');
            inputLink?.classList.add('inputWithImg');
        } else if (this.orderLink === '') {
            redWarning?.classList.add('hiden');
            e.target.style.borderColor = '#ececec';
            inputImg?.classList.add('hiden');
            inputLink?.classList.remove('inputWithImg');
        } else {
            this.setSocialNetworkAndOrderType();
            this.setTotalPrice(0);
            redWarning?.classList.remove('hiden');
            e.target.style.borderColor = '#ff6a6a';
            inputImg?.classList.add('hiden');
            inputLink?.classList.remove('inputWithImg');
        }
    }

    onAddBtn = () => {
        if (this.checkValidationData()) {
            const oreder: IOrderData = {
                сustomerName: this.сustomerName,
                сustomerPhoto: this.сustomerPhoto,
                orderType: this.orderType,
                socialNetwork: this.socialNetwork,
                link: this.orderLink,
                numberOflikes: this.numberOflikes,
                numberOfReposts: this.numberOfReposts,
                numberOfSubscribers: this.numberOfSubscribers
            } 
            this.props.addOrderItem(oreder);
            this.props.closeModal();
        }
    }

    setNumberOflikes = (num: number) => {
        this.numberOflikes = num;
        this.checkValidationData() ? this.setActiveAddBtn(true) : this.setActiveAddBtn(false);
    }

    setNumberOfReposts = (num: number) => {
        this.numberOfReposts = num;
        this.checkValidationData() ? this.setActiveAddBtn(true) : this.setActiveAddBtn(false);
    }

    setNumberOfSubscribers = (num: number) => {
        this.numberOfSubscribers = num;
        this.checkValidationData() ? this.setActiveAddBtn(true) : this.setActiveAddBtn(false);
    }

    render() {
        return (
            <div className='modalContainer'>
            <div className='modal'>
                <div className='modalHeader'>
                    <p>Оформление заказа</p>
                </div>
                <div className='modalContent'>
                    <div className='linkBlockContainer'>
                        <div className="linkBlock wrapper">
                            <span>Укажите ссылку на то, что хотите продвинуть</span>
                            <div className='linkContainer'>
                                <input className='modalInput' type="text" placeholder='Введите ссылку' onChange={ e => this.onChangeLink(e)}/>
                                <div className='inputImg'>
                                    <img src={this.socialNetwork === 'ВК' ? './img/vk.svg' : './img/instagram.svg'} alt="socialNetwork" className='hiden'/>
                                </div>
                            </div>
                            <p className='redWarning hiden'>Некорректная ссылка</p>
                        </div>
                    </div>
                    { this.orderType === 'Аккаунт' ?
                    <AccountContentForModal
                        caclTotalPrice={this.setTotalPrice}
                        socialNetwork={this.socialNetwork}
                        onChangeNumberOfSubscribers={this.setNumberOfSubscribers}/> :
                    this.orderType  === 'Пост' ?
                    <PostContentForModal
                        caclTotalPrice={this.setTotalPrice}
                        socialNetwork={this.socialNetwork}
                        onChangeNumberOflikes={this.setNumberOflikes}
                        onChangeNumberOfReposts={this.setNumberOfReposts}/> :
                        ''
                    }              
                </div>
                <div className='modalFooter'>
                    <div className='modalFooterPrice'>
                        <span>Итого:&ensp;</span><p>{String(this.totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} руб.</p>
                    </div>
                    <div className='footerBtns'>
                        <Button
                            className={'greyBtn'}
                            text="Закрыть"
                            onClick={this.props.closeModal}/>
                        <Button
                            className={this.addBtnIsActive ? '' : 'disabledRedBtn'}
                            text="Добавить"
                            onClick={this.onAddBtn}/>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Modal;