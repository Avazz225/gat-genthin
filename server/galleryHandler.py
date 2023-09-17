from getAllFiles import getFS
from serverConn import listdir_r, get_from_s3, save_to_s3

def getImages(root, length):
    try:
        images = eval(get_from_s3(root[:-1]))
    except:
        images = getFS(root, length)
        save_to_s3(root[:-1], str(images))
    
    return images


def getImgs2(root, length):
    try:
        images = eval(get_from_s3(root[:-1]))
    except:
        images = listdir_r(root, True, length)
        save_to_s3(root[:-1], str(images))
    
    return images