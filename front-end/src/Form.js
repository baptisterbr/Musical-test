import React from 'react';

import './scss/Form.scss';

const Form = (props) => {

    const clearClass = (target) => {
        target.className = "";
        props.changeMusic();
    }

    const onClickHandler = (e) => {
        e.preventDefault();
        let answer = props.verifyAnswer(e.target.firstChild);
        let body = document.getElementsByTagName("body");
        if(answer){
            body[0].className += "good-answer";
        }else{
            body[0].className += "bad-answer";
        }
        setTimeout(() => {clearClass(body[0])}, 5000);
    }

    return <div className="form-container">
        <h2>Alors, qui chante ce titre de {props.music.year} ?</h2>
        <div className="input-container">
            <div className="input-column">
                <button onClick={onClickHandler}>{props.answers[0]}</button>
                <button onClick={onClickHandler}>{props.answers[1]}</button>
            </div>
            <div className="input-column">
                <button onClick={onClickHandler}>{props.answers[2]}</button>
                <button onClick={onClickHandler}>{props.answers[3]}</button>
            </div>
        </div>
    </div>;
}

export default Form;