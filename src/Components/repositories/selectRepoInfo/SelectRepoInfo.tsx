import React, { useEffect, useState } from "react";
import style from './selectRepoInfo.module.scss';
import { useSelector } from "react-redux";

export function SelectRepoInfo(){

    // Массив данных с 2 полями - массивом IrepoInfo который мы получаем в Header компоненте и обьект со всеми языками репозитория
    const repoInfo = useSelector((state : any) => state.selectRepoInfo);
    // State для отображения данных на странице
    const [info,setInfo] = useState(repoInfo);

    useEffect(()=>{
        setInfo(repoInfo)
    }, [repoInfo])
    
    // Функция разворачивает обьект с языками и возвращает массив с языками в теге p
    function getAllLang(){
        let data = [];
        // Разворачиваем обёект в массив для удобной работы
        if(info[1]){
            for(let lang of Object.keys(info[1])){
                data.push(lang)
            }
        }
        // Пересобираем массив в массив тегов с дынными
        return data.map((lang)=>{
            return (<p>{lang}</p>)
        });
    }
    
    return(
        <div className={style.selectRepoInfoSection}>
            {repoInfo[0] == undefined ? 
            <div className={style.noSelect}><p>Выберите репозиторий</p></div> :
            
            <div className={style.selectRepoInfo}>
                <div className={style.name}>
                    <h1>{info[0]?.name}</h1>
                </div>
                <div className={style.langStars}>
                    <p className={style.mainLang}>{info[0]?.lang || 'Unavailable'}</p>
                    <div className={style.starCount}>
                        <img width='24px' height='24px' src="img/Star.png" alt="Звезд :" />
                        <p>{info[0]?.stars}</p>
                    </div>
                </div>
                <div className={style.allLang}>
                    {getAllLang()}
                </div>
                <div className={style.license}><p>{info[0]?.license || 'Not License'}</p></div>
            </div>
            }
        </div>
    )
}