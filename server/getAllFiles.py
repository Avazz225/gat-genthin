from serverConn import listdir_r, list_s3_objects

def list_paths(path, length):
    directories,files = list_s3_objects(prefix=path, length=length)
    return directories

def getListOfFiles(dirName, length):
    # create a list of file and sub directories 
    # names in the given directory 
    listOfFile = listdir_r(dirName,True, length)
    return listOfFile

def getFS (path, length):
    paths = list_paths(path, length)
    allFiles = list()
    for p in paths:
        files = getListOfFiles(p, length)
        for file in files:
            try:
                file.insert(0, file[0].split('/')[1])
            except:
                files.remove(file)
        allFiles.append(files[0])

    return allFiles

def getFS_overv (path, length):
    paths = list_paths(path, length)
    allFiles = list()
    for p in paths:
        files = getListOfFiles(p, length)
        depth = lambda L: isinstance(L, list) and max(map(depth, L))+1

        if depth == 2:
            allFiles.append(files)
        else:
            allFiles.append(files[0])

    return allFiles