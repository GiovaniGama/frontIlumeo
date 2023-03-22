import { IButton } from '../../interfaces/button.interface'
import Style from './style.module.scss'

export function Button(props: IButton){
    return(
        <div className={Style.container}>
            <button 
                className={Style.container__button}
                value={props.value}
                {...props}>
                <span>
                    {props.children}
                </span>
            </button>
        </div>
    )
}