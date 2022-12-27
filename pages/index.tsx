import Head from "next/head";
import { useRouter } from "next/router";
import Image from "../components/Image";
import Navbar from "../components/Navbar";
import AddNewImage from "../components/AddNewImage";
import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import useUser from "../hooks/useUser";
import { photo } from "../interface";
import useSWR from "swr";
import { useAtom } from "jotai";
import { userphotosAtom, filteredUserPhotoAtom } from "../store";
import PreLoader from "../components/PreLoader";
import Seo from "../components/Seo";

export default function Home() {
  const [showAddImageModal, setShowAddImageModal] = useState<boolean>(false);
  const { user, loading } = useUser();
  const router = useRouter();
  const { data: photos } = useSWR<photo[]>(user ? "/api/photo" : null);
  const [, setUserPhotos] = useAtom(userphotosAtom);
  const [filteredPhotos] = useAtom(filteredUserPhotoAtom);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (photos?.length) {
      setUserPhotos(photos);
    }
  }, [photos]);

  if (loading) {
    return (
      <>
        <Seo />
        <PreLoader />
      </>
    );
  }

  return (
    <>
      <Seo />
      {user && (
        <div className="bg-white flex flex-col justify-between min-h-screen">
          <main>
            <Navbar setShowAddImageModal={setShowAddImageModal} />
            <div className="columns-2 md:columns-3 space-y-4 -space-x-1 md:space-y-8 md:space-x-4 mx-4 md:mx-8 lg:mx-20 mt-10">
              {filteredPhotos.map((item, index) => (
                <Image
                  src={item.src}
                  label={item.label}
                  id={item._id!}
                  key={index}
                />
              ))}
            </div>
            <AnimatePresence initial={false} mode="wait">
              {showAddImageModal && (
                <AddNewImage setShowAddImageModal={setShowAddImageModal} />
              )}
            </AnimatePresence>
          </main>
          <footer className="text-center bg-white pt-6 mt-6 pb-4 text-sm">
            made with <span className="text-danger">&hearts;</span> by{" "}
            <a
              href="https://github.com/rd-trends"
              target="_blank"
              className="text-primary"
              rel="noreferrer"
            >
              Daniel Ikoyo
            </a>
          </footer>
        </div>
      )}
    </>
  );
}
