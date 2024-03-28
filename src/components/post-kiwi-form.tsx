import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, database, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [kiwi, setKiwi] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKiwi(e.target.value);
  };
  const fileSize = (file: File | null) => {
    if (file && file.size <= 1000000) {
      return true;
    }
    return false;
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || kiwi === "" || kiwi.length > 180) return;
    try {
      setLoading(true);
      if (file && !fileSize(file)) {
        alert("Error: file size is too big.(maximun: 1MB)");
      } else {
        const document = await addDoc(collection(database, "kiwi"), {
          kiwi,
          createdAt: Date.now(),
          username: user.displayName || "Annonymous",
          userId: user.uid,
          userEmail: user.email,
        });
        if (fileSize(file) && file) {
          const locationRef = ref(
            storage,
            `kiwi/${user.uid}-${user.displayName}/${document.id}`
          );
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(result.ref);
          await updateDoc(document, {
            photo: url,
          });
        }
      }
      setKiwi("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <textarea
        required
        onChange={onChange}
        rows={5}
        maxLength={180}
        value={kiwi}
        placeholder="What is your 🥝?"
        className="border-2 p-1 border-kiwi rounded-lg h-[130px] w-[100%] resize-none focus:outline-none focus:border-kiwiCenter"
      />
      <label
        htmlFor="file"
        className="border-kiwi border-2 font-semibold py-1 px-5 text-center rounded-3xl cursor-pointer text-kiwi"
      >
        {file ? "Photo added 🥝" : "Add photo"}
      </label>
      <input
        className="hidden"
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <input
        type="submit"
        value={isLoading ? "Posting" : "Post Kiwi"}
        className=" bg-kiwi py-1 px-5 text-center rounded-3xl cursor-pointer text-kiwiCeed font-semibold"
      />
    </form>
  );
}
