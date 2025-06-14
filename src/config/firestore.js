import { firestoreDb, storage } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const addBlog = async (blogData) => {
  try {
    await addDoc(collection(firestoreDb, "blog"), blogData);
  } catch (error) {
    console.error("Error adding blog:", error);
    throw new Error("Could not add blog: " + error.message);
  }
};

export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Could not upload image: " + error.message);
  }
};

export async function imageToBase64(img) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject("File reading error");
    reader.readAsDataURL(img);
  });
}

export const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const maxSize = 800;
        if (width > height && width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        } else if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.5
        );
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export const deleteBlog = async (blogId) => {
  try {
    const blogDoc = doc(firestoreDb, "blog", blogId);
    await deleteDoc(blogDoc);
    return true;
  } catch (e) {
    console.log("Error deleting the blog !", e);
    throw new Error("Error deleting the blog !", e.message);
  }
};

export const updateBlog = async (blogId, blogData) => {
  try {
    const blogRef = doc(firestoreDb, "blog", blogId);
    await updateDoc(blogRef, blogData);
    return true;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw new Error("Could not update blog: " + error.message);
  }
};
