import React from 'react';

const Display = ({ input, output, onChange}) => {
    return (
        <>
            <div className="form-group">
                <textarea 
                    className="form-control mt-2 mb-2" 
                    rows="4"  
                    defaultValue={input}
                    read="true">        
                </textarea>
                <textarea 
                    className="form-control mt-2 mb-2" 
                    rows="4"  
                    defaultValue={output}
                    read="true">        
                </textarea>
            </div> 
        </>
    )
}

export default Display;