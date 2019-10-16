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
    let {
        type = "simple-circle",
        size = 70,
        color = "#27ae60",
        line = 3,
        duration = 2
    } = props;

    return (
        <React.Fragment>
            <style>
                {`.loader.${type}`}{
                    `
                    {
                    --loader-width: ${size}px;
                    --loader-height: ${size}px;
                    --loader-color-primary: ${color};
                    --loader-color-secondary: #eee;
                    --line-width: ${line}px;
                    --animation-duration: ${duration}s;
                    --loader-initial-scale: 0.1;
                    }`
                }
            </style>
            <div className={`loader ${type}`}></div>
        </React.Fragment>
    )
}

export {Loader}