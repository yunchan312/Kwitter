import { deleteDoc, doc } from "firebase/firestore";
import { auth, database, storage } from "../firebase";
import { IKiwi } from "./timeline";
import { deleteObject, ref } from "firebase/storage";

export default function Kiwi({ username, photo, kiwi, userId, id }: IKiwi) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(database, "kiwi", id));
      if (photo) {
        const photoRef = ref(
          storage,
          `kiwi/${user.uid}-${user.displayName}/${id}`
        );
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };
  return (
    <div className="border-2 border-kiwiCeed rounded-xl py-3 px-5 mb-5">
      <div className="flex items-center justify-between mb-5">
        <div className="font-bold text-xl">{username}</div>
        {user?.uid === userId ? (
          <div
            onClick={onDelete}
            className="cursor-pointer text-red-400 font-semibold border-2 border-red-400 px-2 rounded-lg hover:text-white hover:bg-red-400"
          >
            Delete
          </div>
        ) : null}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-lg">{kiwi}</div>
        {photo ? (
          <div>
            <img
              src={`${photo}`}
              className="max-w-[150px] max-h-[250px] rounded-lg shadow-lg"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
