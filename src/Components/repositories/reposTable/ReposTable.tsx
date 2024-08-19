import React, { useEffect, useState } from "react";
import style from './reposTable.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { IreposInfo } from "../../../models/gitReposModel";
import { useGetAllLangQuery } from "../../../Redux/gitApi/getAllLangRepo";
import { setInfo } from "../../../Redux/gitDataSlice/repoInfoSlice";


export function ReposTable(){

    const dispatch = useDispatch();
    const reposInfo = useSelector((state:any) => state.reposInfo); // Получаем массив объектов с нужными полями из Slice
    const [repos, setRepos] = useState(reposInfo); // State для хранения массив объектов с нужными полями из Slice

    const [visibleCounter, setVisibleCounter] = useState(false); // Переменная флаг для отображения выбора колличества строк в таблице
    const [countVisibleRepos, setCountVisibleRepos] = useState(4); // Переменная для количества отображаемых в таблице строк по дефолту 4

    // Переменные для номеров видимых в таблице строк
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(countVisibleRepos);

    const [selectRepoInfo, setSelectRepoInfo] = useState({repo_user : '', repo_name : ''}); // State для обьекта запроса на GitHub API при выборе строки таблицы
    const {data : allLang } = useGetAllLangQuery(selectRepoInfo , {skip : selectRepoInfo.repo_user == '',}); // Получение данных из redux-toolkit от API

    // Функция обновления получаемых в таблицу данных
    useEffect(()=>{
        setRepos(reposInfo);
    },[reposInfo])

    // Функция для запроса к API 
    useEffect(()=>{
        // Получаем выбранный обьект и диспатчим экшин 
        const data = reposInfo.filter((elem : any)=> elem.user == selectRepoInfo.repo_user && elem.name == selectRepoInfo.repo_name );
        dispatch(setInfo([data[0], allLang]));
    }, [allLang])

    // Функция для отрисовки строк таблицы
    function createReposList(){
        return repos.map((rep : IreposInfo , id:number)=>{
            let isoDate = rep.date;
            const date = new Date(isoDate);
            // Получаем день, месяц и год
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const year = String(date.getFullYear()).slice(0);
            const formattedDate = `${day}.${month}.${year}`;
            return (
                <tr className={style.list} onClick={()=>setSelectRepoInfo({repo_user : rep.user, repo_name : rep.name})} key={id}>
                    <td className={style.cell}>{rep.name}</td>
                    <td className={style.cell}>{rep.lang}</td>
                    <td className={style.cell}>{rep.forks}</td>
                    <td className={style.cell}>{rep.stars}</td>
                    <td className={style.cell}>{formattedDate}</td>
                </tr>
            )
        });
    }

    // Функция для изменение номеров видимых строк при выборе количсетва отображаемых строк в таблице
    function getCounterList(count : number){
        setStart(0)
        setEnd(count)
        setCountVisibleRepos(count);
        setVisibleCounter(false);
    }
    
    // Функция для изменения номеров при пагинации
    function changePosition(type : string){
        if(type === 'left'){
            if(start > countVisibleRepos){
                setStart(start - countVisibleRepos);
                setEnd(end - countVisibleRepos);
            }else{
                setStart(0)
                setEnd(countVisibleRepos);
            }
        }
        if(type === 'rigth'){
            if(end + countVisibleRepos <= reposInfo.length){
                setStart(start + countVisibleRepos);
                setEnd(end + countVisibleRepos);
            }else{
                if(reposInfo.length > countVisibleRepos){
                    setStart(reposInfo.length - countVisibleRepos)
                    setEnd(reposInfo.length);
                }
            }
        }
    }

    return(
        <div className={style.reposTableSection}>
            <h1 className={style.title}>Результаты поиска</h1>
            <div className={style.tableNuvConteiner}>
                <div className={style.reposTable}>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th className={style.headerTable}>Название</th>
                                <th className={style.headerTable}>Язык</th>
                                <th className={style.headerTable}>Число форков</th>
                                <th className={style.headerTable}>Число звезд</th>
                                <th className={style.headerTable}>Дата обновления</th>
                            </tr>
                        </thead>
                        <tbody className={style.bodyTable}>
                            {createReposList().slice(start,end)}
                        </tbody>
                    </table>
                </div>

                <div className={style.nuvTable}>
                    Rows per page:
                    <div className={style.counterListSection}>
                        {visibleCounter && 
                            <div className={style.countersList}>
                                <p onClick={()=>{getCounterList(4)}}>4</p>
                                <p onClick={()=>{getCounterList(5)}}>5</p>
                                <p onClick={()=>{getCounterList(6)}}>6</p>
                                <p onClick={()=>{getCounterList(7)}}>7</p>
                                <p onClick={()=>{getCounterList(8)}}>8</p>
                                <p onClick={()=>{getCounterList(9)}}>9</p>
                                <p onClick={()=>{getCounterList(10)}}>10</p>
                            </div>
                        }
                        <div onClick={()=>{setVisibleCounter(!visibleCounter)}} className={style.numberList}>
                            {countVisibleRepos}
                            <img src="img/ArrowDropDownFilledcircle-down.png" alt="" />
                        </div>
                    </div>
                    <div className={style.numberOf}>{start == 0 ? 1 : start}-{end} of {reposInfo.length}</div>
                    <div className={style.btnSection}>
                        <img src="img/_IconButton_.png" onClick={()=>{changePosition('left')}} />
                        <img src="img/_IconButton_ (1).png" onClick={()=>{changePosition('rigth')}} />
                    </div>
                </div>
            </div>
        </div>
    )
}