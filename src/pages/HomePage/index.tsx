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
    let now:any = new Date()

    const { logout }: IProps | any = useContext(AuthContext)
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
  
    async function handleSubmit($event: { preventDefault: () => void; }){
      $event.preventDefault()
      await createWorkSchedule(new Date(checkIn), new Date(checkOut))
      window.location.reload()
    }

    function handleStart(){
      setIsActive(true);
      setCheckIn(now)
      setIsPaused(false);
    };
    
    function handlePauseResume(){
      setIsPaused(!isPaused);
      setcheckOut(now)
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
                    <button onClick={() => handlePauseResume()} type="submit">
                      <span>Hora de saída</span>
                      </button>
                  </form>
                </div>
                :
                <div className={Style.container__button}>
                  <button  onClick={() => handleStart()}>
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
              schedules?.length === 0 || schedules === undefined ?
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
              schedules?.sort((a, b) => (a.id_schedule < b.id_schedule)? 1:-1).map((data) => (
                <div className={Style.container__result} key={data.id_schedule}>
                  <Card date={moment(data.date_check_in).format('DD/MM/yyyy')} time={convertHour(moment.duration(moment(data.date_check_out).diff(moment(data.date_check_in))).asSeconds())}/>
                </div>
              ))
            }
          </div>
          <div className={Style.container__button}>
            <button onClick={handleLogout}>
              <span>
                Sair
              </span>
            </button>
          </div>
        </div>
        </>
    )
}