import { clientConfig } from "@/config";
import { getStorage } from "firebase-admin/storage";

// Specify your Firebase Storage bucket name
const storage = getStorage();
const bucketName = clientConfig.storageBucket; // Replace with your actual bucket name

async function listStorageData(storage_folder) {
  const bucket = storage.bucket(bucketName); // Explicitly specify the bucket name
  try {
    const [files] = await bucket.getFiles({ prefix: storage_folder }); // List files in the specified folder
    const items = files.map(file => ({ label: file.name, value: file.name })); // Map files to desired format
    return items;
  } catch (error) {
    console.error("Error fetching items", error);
    return [];
  }
}

export default listStorageData;
