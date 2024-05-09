import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import app from "./firebaseconfig";

const storage = getStorage(app);
export const uploadBanner = async (file: File) => {
    const storage = getStorage(app);
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `banners/${file.name}`);
        console.log(file, "inf irebase calls");
        uploadBytes(storageRef, file)
            .then((snapshot: any) => {
                getDownloadURL(snapshot.ref)
                    .then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        resolve("Uploaded");
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const updateBanner = async (file: File, previousName: string) => {
    const storage = getStorage(app);
    return new Promise((resolve, reject) => {
        const deleteRef = ref(storage, `banners/${previousName}`);
        const storageRef = ref(storage, `banners/${file.name}`);
        deleteObject(deleteRef)
            .then(() => {
                uploadBytes(storageRef, file)
                    .then((snapshot: any) => {
                        getDownloadURL(snapshot.ref)
                            .then((downloadURL) => {
                                resolve(downloadURL);
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
};


export const uploadPackagePhotos = async (file: File, directory: string) => {
    const storage = getStorage(app);
    return new Promise((resolve, reject) => {
        const uploadUrl = `packages${directory}/${file.name}`;
        console.log("uploadUrl", uploadUrl);
        const storageRef = ref(storage, uploadUrl);
        console.log(file, "inf irebase calls");
        uploadBytes(storageRef, file)
            .then((snapshot: any) => {
                getDownloadURL(snapshot.ref)
                    .then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        resolve(downloadURL);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
};


export const handlePackageImageUpload = async (file: File) => {
    try {
        return await uploadPackagePhotos(file, '/images');
    } catch (error) {
        console.log("Error uploading image:", error);
        return null;
    }
};

export const handlePackagePDFUpload = async (file?: File) => {
    if (!file) {
        console.log("Error no file provided for pdf");
        return null;
    }
    try {
        return await uploadPackagePhotos(file, '/pdf');
    } catch (error) {
        console.log("Error uploading image:", error);
        return null;
    }
};

export const uploadImageAndGetURL = async (path, file) => {
    const imagesRef = ref(storage, `images/${path}`);
    await uploadBytes(imagesRef, file);
    console.log("Uploaded an image");
    const url = await getDownloadURL(imagesRef);
    return url;
};
