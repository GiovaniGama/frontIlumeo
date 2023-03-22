import { ButtonHTMLAttributes, ReactEventHandler, ReactNode } from "react"


export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?: ReactNode
    type: "button" | "submit" | "reset" | undefined
}