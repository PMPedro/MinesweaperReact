import React, { useState, useEffect } from "react";
let timeIntervalId;

export default function Timer({ gameOver , timerzero }) {
  let [time, setTime] = useState(0);
  let [check, setCheck] = useState(false);
  
  useEffect(() => {
    
    if(check){
      setTime(0);
    setCheck(false);
    }


    if(gameOver){
      setTime(0);
    }

  /*  if(timerzero){
      setTime(0);
      
    }*/

    function incrementTime() {
      setTimeout(() => {
        let newTime = time + 1;
        setTime(newTime);
      }, 1000);
    }
    incrementTime();
  }, [time]);
  
  
  useEffect(() => {
   setCheck(true);
  } , [timerzero]);

 

  console.log(timeIntervalId);
  return (
    <div style={{ color: "white", fontSize: 20, background: "maroon"}}>
      <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
        ⏰
      </span>
      {time}
    </div>
  );
}

