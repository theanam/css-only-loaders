import React from "react";
import "../../loaders/vars.css";
import "../../loaders/simple-circle/simple-circle.css";

class Loader extends React.Component{
    render(){
        return (<div className={`loader ${type}`}></div>);
    }
}

Loader.propTypes = {
    type: propTypes.string
}

export {Loader}