import'./orderStyle.css';
import { Component } from "react";
import { observer } from "mobx-react"; 
import { observable, action, makeObservable } from "mobx";
import { IOrderItem } from '../../interfaces/OrderInterfaces';

@observer
class OrderItem extends Component<IOrderItem>{
    @observable counter = 0;
    progress = 0;

    constructor(props: IOrderItem) {
        super(props);
        makeObservable(this);
    }

    @action
    setCounter = () => {
        if (this.props.volume <= 10) {
            this.counter += 1;
            this.progress += 1/this.props.volume;
        } else {
            this.counter += this.props.volume/10;
            this.progress += 0.1;
        }
    }

    componentDidMount(): void {
        const counterInteval = setInterval(() => {
            if (Math.round(this.counter) < this.props.volume) {
                this.setCounter();
            } else {
                clearInterval(counterInteval);
            }
        }, 1000)
    }
    render() {
        const {itemName, itemImgName, volume} = this.props;
        return (
            <div className="orderItem">
                <div className="orderItemContainer">
                    <div className="orderItemImg">
                        <img src={`./img/${itemImgName}`} alt={itemName} />
                    </div>
                    <div className="orderItemContent">
                        <p className="orderItemName">{itemName}</p>
                        <p>{this.counter.toFixed()} / {volume}</p>
                        <progress value={this.progress}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderItem;