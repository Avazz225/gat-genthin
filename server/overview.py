import random
import os
from getAllFiles import getFS_overv, list_paths

def flatten(l):
    try:
        return flatten(l[0]) + (flatten(l[1:]) if len(l) > 1 else []) if type(l) is list else [l]
    except IndexError:
        return []

def getPreviews(root):
    dirs = list_paths(root, 1)
    base = getFS_overv(root, 1)
    previews = list()

    for b in base:
        previews.append(getThree(b))
    return previews

def getThree(tar):
    tar = flatten(tar)
    size = len(tar)-2
    random.shuffle(tar)
    del tar[3:]
    if(size<0): size = 0
    tar.append(size)
    category = tar[0].split('/')[0]
    tar.insert(0,category)
    return tar