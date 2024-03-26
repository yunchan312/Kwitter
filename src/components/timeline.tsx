import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import Kiwi from "./kiwi";

export interface IKiwi {
  id: string;
  photo?: string;
  kiwi: string;
  createdAt: number;
  userEmail: string;
  userId: string;
  username: string;
}

export default function TimeLine() {
  const [kiwis, setKiwis] = useState<IKiwi[]>([]);
  const fetchKiwis = async () => {
    const kiwisQuery = query(
      collection(database, "kiwi"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(kiwisQuery);
    const kiwiMap = snapshot.docs.map((doc) => {
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
    setKiwis(kiwiMap);
  };
  useEffect(() => {
    fetchKiwis();
  }, []);
  return (
    <div>
      {kiwis.map((kiwi) => (
        <Kiwi key={kiwi.id} {...kiwi} />
      ))}
    </div>
  );
}
