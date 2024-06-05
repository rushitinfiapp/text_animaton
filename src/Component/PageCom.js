
import React from 'react';

export default function PageCom(props) {
    const { animationText } = props;
    return (
        <div className="showCanvas">
            <div className="showPage">
                <canvas ref={animationText}></canvas>
            </div>
        </div>
    );
}