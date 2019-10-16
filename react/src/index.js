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

function StyleSheet(props){
    let {
        type = "simple-circle",
        size = 70,
        color = "#27ae60",
        secondaryColor="#eeeeee",
        line = 3,
        duration = 2
    } = props;
    return (<style>
        {`.loader.${type}`}{
            `
            {
            --loader-width: ${size}px;
            --loader-height: ${size}px;
            --loader-color-primary: ${color};
            --loader-color-secondary: ${secondaryColor};
            --line-width: ${line}px;
            --animation-duration: ${duration}s;
            --loader-initial-scale: 0.1;
            }`
        }
    </style>);
}
function Loader(props){
    let {type = "simple-circle", visible = true} = props;  
    if(!visible) return null;
    return (
        <React.Fragment>
            <StyleSheet {...props}/>
            <div className={`loader ${type}`}></div>
        </React.Fragment>
    );
}

function FullLoader(props){
    const {backgroundColor = `rgba(0,0,0,0.4)`, visible = true } ={props};
    if(!visible) return null;
    return (<div style={{...fullLoaderStyle,backgroundColor}}>
        <Loader {...props}/>
    </div>);
}

const fullLoaderStyle = {
    width: '100%',
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 40000
}

export {
    Loader as default,
    FullLoader
}