import handlePopUp from './popUpHandler';


const FillImages = ({data}) => (
    <>
    {data.map(data => (
        <div className='genericGalleryItem'>
            <img src= {process.env.REACT_APP_CDN_URL+data} onClick={() => handlePopUp(data)} className='subGalleryImage'/>
        </div>
    ))}
    </>
)

export default FillImages