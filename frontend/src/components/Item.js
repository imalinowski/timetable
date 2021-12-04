import React from "react";

export function Item(props) {
    return (
        <div className="item" style={{color: props.color}}>
            {props.value}
        </div>
    );
}