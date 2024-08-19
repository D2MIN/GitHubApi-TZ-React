import React, { useEffect, useRef, useState } from 'react';
import { Header } from './Components/header/Header';
import { WelcomePage } from './Components/welcomePage/WelcomePage';
import { Footer } from './Components/footer/Footer';
import { Repositories } from './Components/repositories/Repositories';
import { useSelector } from 'react-redux';
import { ReposNotFound } from './Components/Errors/ReposNotFound';

function App() {

  // state с массивом данных о репозиториях в нужном нам виде который мы получаем в Header компоненте
  const reposInfo = useSelector((state:any) => state.reposInfo);

  const count = useRef(0);
  const [nulApi, setNulApi] = useState(false);
  // Функция для ошибки если API в ответ дал пустой массив
  useEffect(()=>{
    if(!reposInfo.length){
      count.current ++;
    }
    if(count.current > 1){
      count.current --;
      setNulApi(true)
      setTimeout(()=>setNulApi(false), 2000);
    }
    console.log(reposInfo)
  }, [reposInfo])

  return (
    <>
      <Header/>
      {nulApi && <ReposNotFound/>}
      {reposInfo.length ? <Repositories/> : <WelcomePage/>}
      <Footer/>
    </>
  );
}

export default App;
