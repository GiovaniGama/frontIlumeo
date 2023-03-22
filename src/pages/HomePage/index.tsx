import React, {useContext, useState, useEffect} from "react"
import { Card } from "../../components/card";
import { AuthContext } from "../../contexts/auth"
import { IProps } from "../../interfaces/props.interface"
import { ISchedules } from "../../interfaces/schedules.interface";
import { createWorkSchedule, getUser, getWorkSchedule } from "../../services/api";
import moment from "moment";
import Style from "./style.module.scss"
import Timer from "../../components/time";

export function HomePage(){
    const { logout }: IProps | any = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [schedules, setSchedules] = useState<ISchedules[]>()
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setcheckOut] = useState('')
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [user, setUser] = useState<any>()

    useEffect(() => {     
        (async ()=>{
           await getWorkSchedule()
           .then((res) => {
                setSchedules(res.data)        
                setLoading(false)
           })
           .catch((err) => {
                console.error(err)
           })

           await getUser()
           .then((res) => {
              setUser(res.data.user)
           }).catch((err) => {
                console.error(err)
           })

        })()
        

        let interval: any = null;
    
        if (isActive && isPaused === false) {
          interval = setInterval(() => {
            setTime((time) => time + 10);
          }, 10);
        } else {
          clearInterval(interval);
        }
        return () => {
          clearInterval(interval);
        };
    }, [isActive, isPaused])


  function convertHour(hour: number){
      const dateObj = new Date(hour * 1000);
      const hours = dateObj.getUTCHours();
      const minutes = dateObj.getUTCMinutes();
      const seconds = dateObj.getSeconds();
    
        const timeString = hours.toString().padStart(2, '0') + ':' + 
        minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0');

        return timeString
  }

  
    function handleLogout(){
        logout();
    }

    let now: any = new Date

    function handleSubmit(e: any){
      e.preventDefault()
        createWorkSchedule(new Date(checkIn), new Date(checkOut))
    }

    const handleStart = (e: any) => {
      setIsActive(true);
      setCheckIn(e)
      setIsPaused(false);
    };
    
    const handlePauseResume = (e: any) => {
      setIsPaused(!isPaused);
      setcheckOut(e)
      window.location.reload();
    };

    return(
        <>
        <div className={Style.container}>
          <div className={Style.container__header}>
            <div className={Style.container__title}>
              <h1>Relógio de ponto</h1>
            </div>
            <div className={Style.container__content}>
              <span>#{user}</span>
              <p>Usuário</p>
            </div>
          </div>
          <div className={Style.container__timer}>
            <Timer time={time}/>
          </div>
          <div className={Style.container__action}>
            {
              checkIn != '' ?
                <div className={Style.container__button}>
                  <form onSubmit={handleSubmit}>
                    <button value={now} onClick={(e: any) => handlePauseResume(e.target.value)} type={undefined}>
                      <span>Hora de saída</span>
                      </button>
                  </form>
                </div>
                :
                <div className={Style.container__button}>
                  <button value={now} onClick={(e: any) => handleStart(e.target.value)} type={undefined}>
                    <span>
                      Hora de entrada
                    </span>
                  </button>
                </div>
            }
            {}
          </div>
          <div className={Style.container__message}>
            {
              !schedules ?
              <div className={Style.container__message_p}>
                <p>Não há pontos registrados</p>
              </div>
              :
              <div className={Style.container__message_p}>
                <p>Dias anteriores</p>
              </div>
            }
          </div>
          <div className={Style.container__schedules}>
            {
              schedules?.map((data) => (
                
                <div className={Style.container__result} key={data.id_schedule}>
                  <Card date={moment(data.date_check_in).format('DD/MM/yyyy')} time={convertHour(moment.duration(moment(data.date_check_out).diff(moment(data.date_check_in))).asSeconds())}/>
                </div>
              ))
            }
          </div>
          <div className={Style.container__button}>
            <button onClick={() => handleLogout()} type={undefined}>
              <span>Sair</span>
            </button>
          </div>
        </div>
        </>
    )
}