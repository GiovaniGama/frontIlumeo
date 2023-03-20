import { ChangeEventHandler, ReactNode } from "react"

export interface IInput{
    text: string
    placeholder: string
    type: string
    name: string
    id: string
    value: string
    children?: ReactNode
    handleOnChange: ChangeEventHandler<HTMLInputElement>
}