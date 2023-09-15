import handlePopUp from './popUpHandler';


const FillImages = ({data}) => (
    <>
    {data.map(data => (
        <div class='genericGalleryItem'>
            <img src= {data} onClick={() => handlePopUp(data)} className='subGalleryImage'/>
        </div>
    ))}
    </>
)

export default FillImages