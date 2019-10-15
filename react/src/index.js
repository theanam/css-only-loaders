import React from "react";
import "../../loaders/vars.css";
import "../../loaders/simple-circle/simple-circle.css";
import "../../loaders/rotating-plane/rotating-plane.css";
import "../../loaders/blasting-circle/blasting-circle.css";
import "../../loaders/blasting-ripple/blasting-ripple.css";
import "../../loaders/box-rotation/box-rotation.css";
import "../../loaders/clock/clock.css";
import "../../loaders/color-pulse-ball/color-pulse-ball.css";
import "../../loaders/double-circle/double-circle.css";
import "../../loaders/hour-glass/hour-glass.css";
import "../../loaders/quantum-spinner/quantum-spinner.css";
import "../../loaders/recursive-circle/recursive-circle.css";

function Loader(props){
    let type = props.type || "simple-circle";
    return (<div className={`loader ${type}`}></div>);
}

export {Loader}