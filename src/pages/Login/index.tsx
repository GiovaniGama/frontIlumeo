import React, {useState} from "react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import Style from "./style.module.scss"


 
export function LoginPage(){
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit($event: { preventDefault: () => void }){
        $event.preventDefault()
        console.log("submit", {user, password});
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