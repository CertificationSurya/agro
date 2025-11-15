import fs from 'fs';

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err)=> {
        if (err){
            console.log(`File Deletion failed ${filePath}`);
        }
        else {
            console.log(`File deletion from uploads successfully ${filePath}`)
        }
    })
}

export default deleteFile;