import cloudinary from 'cloudinary'


 cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_COMPANY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE,
    secure: true,
});


export const useCloudinaryUplaod = async (imagePath: string) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        // Upload the image
        const result = await  cloudinary.v2.uploader.upload(imagePath, options);
        return result;
    } catch (error) {
        console.error("cloudinary upload error",error);
    }
};


export const useCloudinaryDelete = async (public_id: string) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        // Delete the image
        const result = await  cloudinary.v2.uploader.destroy(public_id)
        return result;
    } catch (error) {
        console.error("cloudinary upload error",error);
    }
};

