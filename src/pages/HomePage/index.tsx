import React, {useContext} from "react"
import { AuthContext } from "../../contexts/auth"
import { Button } from "../../components/button"

export function HomePage(){
    const { logout } = useContext(AuthContext)

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