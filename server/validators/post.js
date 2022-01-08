function validateImage(img){
    // this will be checked from cloudinary later
    if(img === null){
        throw new Error("Image must be provided")
    }
} 


function validateContent(content){
    if(content.length < 1 || content.length > 50){
        throw new Error("The content must be between 1 and 50 characters")
    }
}


export {
    validateContent,
    validateImage
}