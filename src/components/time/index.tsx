import Style from "./style.module.scss"

export default function Timer(props : any) {
  return (
    <div className={Style.timer}>
      <div className={Style.timer__time}>
        <span className={Style.timer__span}>
          
          {("0" + Math.floor((props.time / 3600000) % 60)).slice(-2)}
          <p>h</p>
        </span>
        <span className={Style.timer__span}>
          <div className={Style.timer__span_minutes}>
            {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}
          </div>
          <p>m</p>
        </span>
      </div>
      <div className={Style.timer__text}>
        <p>Horas de hoje</p>
      </div>
    </div>
  );
}