const cloudinary = require("../config/cloudinary.js")


async function fileUpload(req , res, next){
    ```// this function is triggered in every file upload
        // the data will be parsed in pictureProps object
        // it will parse :
            - place [where the picture must be put]
            - picture [the picture which must be uploaded]
          // if not internal server error happens the result will be assigned to req and will be accessible in req.[the place where is uploaded]
    ```
    const {picture , place} = req.pictureProps
    await cloudinary.uploader.upload(picture , { folder: `Chatter/${place}` }, (err , result ) => {
        if(err){
            console.log(err)
            return req.status(500).json({
                message : "Cloudinary Internal Server Error"
            })
        }
        req[place]=  result.secure_url
        next()
        // this will assign to the req the same property as the input property
    } )
}

module.exports = {
    fileUpload
}