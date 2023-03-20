import { IButton } from '../../interfaces/button.interface'
import Style from './style.module.scss'

export function Button(props: IButton){
    return(
        <div className={Style.container}>
            <button 
                className={Style.container__button} 
                type={props.type}
                onClick={props.handleOnClick}>
                <span>
                    {props.children}
                </span>
            </button>
        </div>
    )
}