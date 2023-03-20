import { ICard } from "../../interfaces/card.interface";
import Style from "./style.module.scss"

export function Card(props: ICard){
    return(
        <div className={Style.container}>
            <div className={Style.container__date}>
                <p>{props.date}</p>
            </div>
            <div className={Style.container__time}>
                <p>{props.time}</p>
            </div>
        </div>
    )
}