import React, {useContext} from "react"
import { AuthContext } from "../../contexts/auth"
import { Button } from "../../components/button"
import { IProps } from "../../interfaces/props.interface";

export function HomePage(){
    const { logout }: IProps | any = useContext(AuthContext)

    function handleLogout(){
        logout();
    }

    return(
        <div>
            <Button
                type="submit"
                handleOnClick={handleLogout}
            >Sair</Button>
        </div>
    )
}