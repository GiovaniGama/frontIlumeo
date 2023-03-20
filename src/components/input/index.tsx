import Style from './style.module.scss'
import { IInput } from '../../interfaces/input.interface'

export function Input(props: IInput){
    return(
        <div className={Style.container}>
            <p className={Style.container__label}>{props.text}</p>
            <input 
                className={Style.container__input} 
                type={props.type} 
                name={props.name}
                id={props.id}
                onChange={props.handleOnChange}
                placeholder={props.placeholder}/>
        </div>
    )    
}