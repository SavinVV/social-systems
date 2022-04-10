import './appStyle.css'
import { IOrderData } from '../../interfaces/OrderInterfaces';
import { Component } from "react";
import { observer } from "mobx-react"; 
import { observable, action, makeObservable } from "mobx";
import Order from "../Order";
import Button from "../Button";
import Modal from '../Modal';

const testOrder: IOrderData = {
    сustomerName: 'Андрей Иванович',
    сustomerPhoto: 'avatar.svg',
    orderType: 'Аккаунт',
    socialNetwork: 'Инстаграм',
    link: 'https://www.instagram.com/test/',
    numberOflikes: 0,
    numberOfReposts: 0,
    numberOfSubscribers: 10000,
}

@observer
class App extends Component {
    @observable modalIsOpen = false;
    @observable orders: IOrderData[] = [testOrder];

    constructor(props) {
        super(props);
        makeObservable(this);
    }

    @action
    toggleModalIsOpen = () => {
        this.modalIsOpen = !this.modalIsOpen;
    }

    @action
    addOrderItem = (item: IOrderData) => {
        this.orders.push(item);
    }

    render() {
        return (
            <div className="app">
                <div className='appContainer'>
                    <Button
                        className={'addOrderBtn'}
                        text="Добавить заказ"
                        onClick={this.toggleModalIsOpen}/>
                    {this.orders.map((item, index) => {
                        return (
                            <Order
                                order={item}
                                key={item.сustomerName + index}/>
                        )
                    })}
                </div>
                {this.modalIsOpen ? 
                    <Modal 
                    closeModal={this.toggleModalIsOpen}
                    addOrderItem={this.addOrderItem}/> : 
                    ''}
            </div>
        )
    }
}

export default App;