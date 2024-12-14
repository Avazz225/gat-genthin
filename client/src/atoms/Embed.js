function Embed({src ,width="900px",height="400px", center = false}){

    if (center){
        return(
            <center>
                <iframe src={src} 
                height={height}
                width={width}
                style={{
                    height: {height},
                    maxHeight: "75vh",
                    width: {width},
                    maxWidth: "90vw",
                    borderRadius: ".5em", 
                    borderWidth: "1px", 
                    borderStyle: "solid", 
                    borderColor: "var(--contrastCol)",
                    }
                }/>
            </center>
        )
    } else {
        return(
            <iframe src={src} 
                height={height}
                width={width}
                style={{
                    height: {height},
                    width: {width},
                    borderRadius: ".5em", 
                    borderWidth: "1px", 
                    borderStyle: "solid", 
                    borderColor: "var(--contrastCol)",
                }
            }/>
        )
    }  
}

export {Embed}