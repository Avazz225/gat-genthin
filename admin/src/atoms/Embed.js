import { selectEmbed } from "../helpers/tools"
import DeleteComponentBtn from "./DeleteComponent"
import { Icon } from "@iconify/react/dist/iconify.js"
import "./Embed.css"

function Embed({src ,width="900px",height="400px", center = false, deleteMode, deleteData, index, modifyState}){

    if (center){
        return(
            <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
                <center>
                    <div className='relPos' style={{"maxWidth":width}}>
                        <WrenchBtn index={index} selectEmbed={selectEmbed} modifyState={modifyState} width={width} height={height} center={center} src={src}/>
                        <iframe 
                            src={src} 
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
                                zIndex: 10
                                }
                            }
                        />
                    </div>
                </center>
            </DeleteComponentBtn>
        )
    } else {
        return(
            <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
                <div className='relPos' style={{"maxWidth":width}}>
                    <WrenchBtn index={index} selectEmbed={selectEmbed} modifyState={modifyState} width={width} height={height} center={center} src={src} />
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
                            zIndex: 10
                        }
                    }/>
                </div>
            </DeleteComponentBtn>
        )
    }  
}

function WrenchBtn(props){
    return(
        
        <div className="wrenchBtn" onClick={(e) => {props.selectEmbed(e, e.pageX, e.pageY, "embed", props.index, props.modifyState, props.width, props.height, props.center, props.src)}}>
            <Icon icon="mdi:wrench-outline" className="wrench"/>
        </div>
        
    )
}

export {Embed}