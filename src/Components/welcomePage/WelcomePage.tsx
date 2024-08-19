import React from "react";
import style from './welcomePage.module.scss';
import { useSelector } from "react-redux";

export function WelcomePage(){
    return(
        <div className={style.welcomePage}>
            <h1 className={style.welcomeTitle}>Добро пожаловать</h1>
        </div>
    );
}