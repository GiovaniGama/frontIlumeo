import React, {useState, useContext} from "react"
import { AuthContext } from "../../contexts/auth"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import Style from "./style.module.scss"
import { IProps } from "../../interfaces/props.interface"
 
export function LoginPage(){
    const { authenticated, login }: IProps | any = useContext(AuthContext)

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit($event: { preventDefault: () => void }){
        $event.preventDefault()
        console.log("submit", {user, password});
        login(user, password)
    }

    return(
        <div className={Style.login}>
            <div className={Style.login__title}>
                <span>Ponto</span>
                <h1>Ilumeo</h1>
            </div>
            <form className={Style.login__form} onSubmit={handleSubmit}>
                <div className={Style.login__input__user}>
                    <Input 
                        text="Código do usuário" 
                        placeholder="Digite o usuário"
                        type="text"
                        name="user"
                        id="user"
                        value={user}
                        handleOnChange={
                            ($event: { target: { value: React.SetStateAction<string> } }) => {
                                setUser($event.target.value)
                            } 
                        }/>
                </div>
                <div className={Style.login__input__password}>
                    <Input 
                        text="Senha" 
                        placeholder="Digite a sua senha"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        handleOnChange={
                            ($event: { target: { value: React.SetStateAction<string> } }) => {
                                setPassword($event.target.value)
                            } 
                        }/>
                </div>
                <div className={Style.login__actions}>
                    <Button type="submit">Confirmar</Button>
                </div>
            </form>
        </div>
    )
}

function login(user: string, password: string) {
    throw new Error("Function not implemented.")
}
