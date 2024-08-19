import React, { useEffect, useState } from "react";
import {useGetReposQuery} from '../../Redux/gitApi/gitApi'
import {Irepos, IreposInfo} from "../../models/gitReposModel";
import style from './heade.module.scss'
import { useDispatch } from "react-redux";
import { setInfo } from "../../Redux/gitDataSlice/gitDataSlice";

export function Header(){

    const dispatch = useDispatch();

    const [reposValue, setReposValue] = useState(''); // state для записи данных введеных в input
    const [reposname, setReposname] = useState(''); // state для повторного вызова useGetReposQuery при изменении значения поиска

    // Вызов метода для получения данных из GitHub API
    const {data : repos } = useGetReposQuery(reposname, {skip : reposname.length < 1,});

    function getGitRepos(){
        setReposname(reposValue);
    }

    // Асинхроная функция что бы диспатчить данные в слайс со стейтом данных 
    useEffect(()=>{
        if (repos) {
            const allRepos = repos.items; // Получение массива данных о полученных репозиториях
            // Собираем новый массив с нужными нам полями кроме всех языков, т.к. для этого нужен отдельный запрос
            const allReposInfo: IreposInfo[] = allRepos.map((rep: Irepos) => ({
                user : rep.owner.login,
                name: rep.name,
                lang: rep.language,
                forks: rep.forks_count,
                stars: rep.stargazers_count,
                date: rep.updated_at,
                license: rep.license?.name,
            }));
            
            dispatch(setInfo(allReposInfo)); // диспатчим экшин
          }
    }, [repos])
    
    return(
        <div className={style.header}>
           <input className={style.inputSearch} onChange={(e)=>{setReposValue(e.target.value)}} value={reposValue} type="text" placeholder="Repos name"/>
           <button className={style.btnSearch} onClick={getGitRepos}>Искать</button>
        </div>
    )
}