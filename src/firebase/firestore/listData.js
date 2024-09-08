import { getStorage } from "firebase-admin/storage";

const storage = getStorage();

async function listStorageData(storage_folder) {
  const bucket = storage.bucket(); // Access the default bucket
  try {
    const [files] = await bucket.getFiles({ prefix: storage_folder }); // List files with the folder prefix
    const items = files.map(file => ({ label: file.name, value: file.name }));
    return items;
  } catch (error) {
    console.error("Error fetching items", error);
    return [];
  }
}

export default listStorageData;
