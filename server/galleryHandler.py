from getAllFiles import getFS
from serverConn import listdir_r

def getImages(root, length):
    previews = getFS(root, length)
    return previews

def getImgs2(root, length):
    # ['images/hanssachs/Hahn1997.jpg', 'images/hanssachs/HansSachs1.jpg', 'images/hanssachs/HansSachs2.jpg', 'images/hanssachs/fahrenderSchueler.jpg', 'images/hanssachs/hanssachs-1996.jpg', 'images/hanssachs/hanssachs-2000-tangermuende.jpg']
    return listdir_r(root, True, length)