import React from 'react';

const containerStyle = {
    minHeight: "15em"
}

const Display = ({ input, output }) => {
    return (
        <>
            <div className="container border mb-4" style={containerStyle}>
                <div className="pt-4 text-center">
                    <p>{input}</p>
                </div>
                <div className=" p-2  text-center">
                    <p>{output}</p>
                </div>
            </div>

        </>
    )
}

export default Display;