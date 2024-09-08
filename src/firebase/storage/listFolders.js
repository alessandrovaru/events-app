import { getStorage, ref, listAll } from "firebase/storage";

const storage = getStorage();
const listRef = ref(storage, 'mandalas'); // Adjust this reference as needed

async function listFolders() {
  try {
    const res = await listAll(listRef);
    const folders = res.prefixes.map(folderRef => ({ label: folderRef.name, value: folderRef.name }));
    return folders;
  } catch (error) {
    console.error("Error fetching folders", error);
    return [];
  }
}

export default listFolders;
