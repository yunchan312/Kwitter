import { useEffect, useState } from "react";
import { auth, database, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { IKiwi } from "../components/timeline";
import Kiwi from "../components/kiwi";

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [kiwis, setKiwis] = useState<IKiwi[]>([]);
  const fetchKiwis = async () => {
    const kiwiQuery = query(
      collection(database, "kiwi"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(kiwiQuery);
    const kiwis = snapshot.docs.map((doc) => {
      const { kiwi, createdAt, userId, username, photo, userEmail } =
        doc.data();
      return {
        kiwi,
        createdAt,
        userId,
        username,
        photo,
        userEmail,
        id: doc.id,
      };
    });
    setKiwis(kiwis);
  };
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatar/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };
  useEffect(() => {
    fetchKiwis();
  }, []);
  return (
    <div className="flex flex-col gap-10 justify-start items-center">
      <label
        htmlFor="avatar"
        className="overflow-hidden w-[80px] h-[80px] rounded-full bg-kiwi flex justify-center items-center"
      >
        {avatar ? (
          <img
            className="overflow-hidden border-2 border-kiwi w-[80px] h-[80px] rounded-full"
            src={avatar}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#e2ff92"
            className="w-12 h-12"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </label>
      <input
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
        className="hidden"
      />
      <div className="text-xl">{user?.displayName ?? "Anonymous"}</div>
      <div className="w-[100%] flex flex-col gap-3">
        {kiwis.map((kiwi) => (
          <Kiwi key={kiwi.id} {...kiwi} />
        ))}
      </div>
    </div>
  );
}
