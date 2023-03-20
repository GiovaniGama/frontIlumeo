import { MouseEventHandler, ReactNode } from "react"


export interface IButton{
    children?: ReactNode
    type: "button" | "submit" | "reset" | undefined
    handleOnClick?: MouseEventHandler<HTMLButtonElement>
}