import './ButtonStyle.css';
import { IButton } from '../../interfaces/ButtonInterfaces';

const Button = ({ className, text, width, onClick}:IButton) => {
    return (
        <div className={`btn ${className}`} style={{width: width}} onClick={onClick}>
            {text}
        </div>
    )
}

export default Button;