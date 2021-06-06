import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";

const loaderStyle = {
    "position": "fixed",
    "width": "100%", "height": "100%"
}
const PageLoadSpinner = (props) => {


    return (
        <div className="is-flex is-justify-content-center" style={loaderStyle}>
            <div className="is-flex is-align-items-center">
                <ScaleLoader className="is-flex" color="#00d1b2" height={150} margin={20} width={8} radius={8} />
            </div>
        </div>
    )
}

export default PageLoadSpinner;