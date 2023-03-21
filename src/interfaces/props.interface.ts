import { ReactNode } from "react";

export interface IProps {
    children?: ReactNode
    logout?: Function | undefined
    login?: Function
    authenticated?: boolean
    loading?: boolean
}