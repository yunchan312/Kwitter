import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase";
import Kiwi from "./kiwi";
import { Unsubscribe } from "firebase/auth";

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

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchKiwis = async () => {
      const kiwisQuery = query(
        collection(database, "kiwi"),
        orderBy("createdAt", "desc"),
        limit(50)
      );
      // const snapshot = await getDocs(kiwisQuery);
      // const kiwiMap = snapshot.docs.map((doc) => {
      //   const { kiwi, createdAt, userId, username, photo, userEmail } =
      //     doc.data();
      //   return {
      //     kiwi,
      //     createdAt,
      //     userId,
      //     username,
      //     photo,
      //     userEmail,
      //     id: doc.id,
      //   };
      // });
      unsubscribe = await onSnapshot(kiwisQuery, (snapshot) => {
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
      });
    };
    fetchKiwis();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <>
      {kiwis.length === 0 ? (
        <div className="flex justify-center items-center h-[100%]">
          <div className="font-bold text-xl">There is no 🥝</div>
        </div>
      ) : (
        <div>
          {kiwis.map((kiwi) => (
            <Kiwi key={kiwi.id} {...kiwi} />
          ))}
        </div>
      )}
    </>
  );
}
