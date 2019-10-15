import React from "react";
import "../../loaders/vars.css";
import "../../loaders/simple-circle/simple-circle.css";

function Loader(props){
    let type = props.type || "simple-circle";
    return (<div className={`loader ${type}`}></div>);
}

export {Loader}