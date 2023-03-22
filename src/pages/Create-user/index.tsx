import { useState } from "react"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { createUser } from "../../services/api"
import Style from "./style.module.scss"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

export function CreateUser(){
    
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    
    function handleSubmit($event: { preventDefault: () => void }){
        $event.preventDefault()
        createUser(user, password)
        .then(() => {
            navigate("/login")
        })
        .catch(() => {
            Swal.fire({
                title: 'Error!',
                text: 'Usuário já existe!',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        })
    }

    return(
        <div className={Style.create}>
            <div className={Style.create__title}>
                <span>Ponto</span>
                <h1>Ilumeo</h1>
            </div>
            <form className={Style.create__form} onSubmit={handleSubmit}>
                <div className={Style.create__input__user}>
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
                <div className={Style.create__input__password}>
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
                <div className={Style.create__actions}>
                    <Button type="submit">Confirmar</Button>
                </div>
            </form>
        </div>
    )
}