import React from "react";
import style from './repositories.module.scss';
import { ReposTable } from "./reposTable/ReposTable";
import {SelectRepoInfo} from "./selectRepoInfo/SelectRepoInfo";

export function Repositories(){
    return(
        <div className={style.repositories}>
            <ReposTable/>
            <SelectRepoInfo/>
        </div>
    )
}