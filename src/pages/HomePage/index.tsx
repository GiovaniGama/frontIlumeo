import React, {useContext, useState, useEffect} from "react"
import { AuthContext } from "../../contexts/auth"
import { IProps } from "../../interfaces/props.interface"
import { createWorkSchedule, getWorkSchedule } from "../../services/api";
import Style from "./style.module.scss"

export function HomePage(){
    const { logout }: IProps | any = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [schedules, setSchedules] = useState<any>()
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setcheckOut] = useState('')

    // useEffect(() => {
    //     (async ()=>{
    //        await getWorkSchedule()
    //        .then((res) => {
    //             setSchedules(res.data)
    //             setLoading(false)
                
    //        })
    //        .catch((err) => {
    //             console.error(err)
    //        })

    //     })()   
    // }, [])

    // function handleLogout(){
    //     logout();
    // }

    // if(loading){
    //     return <div className="loading">Carregando Dados...</div>
    // }
    

   
    let now: any = new Date

    function handleSubmit(e: any){
        createWorkSchedule(new Date(checkIn), new Date(checkOut))
    }

    return(
        <>
        {
          checkIn != '' ?
            <>
            <div className={Style.container}>
              <form onSubmit={handleSubmit}>
                <button value={now} onClick={(e: any) => setcheckOut(e.target.value)}>checkOut</button>
              </form>
            </div>
            </>
            :
            <>
              <button value={now} onClick={(e: any) => setCheckIn(e.target.value)}>checkIn</button>
            </>
        
        }
        {}
        </>
    )
}