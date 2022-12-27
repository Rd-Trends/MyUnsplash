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
    if (photos) {
      setUserPhotos(photos);
    }
  }, [photos]);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <>
      <Head>
        <title>Upload your beautiful or favourite images | MyUnsplash</title>
        <meta
          name="description"
          content="Upload the url of your favourite image, and get displayed beautifully!"
        />

        <meta
          property="og:url"
          content="https://myunsplash-trends.vercel.app"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Upload your beautiful or favourite images | MyUnsplash"
        />
        <meta
          property="og:description"
          content="Upload the url of your favourite image, and get displayed beautifully!"
        />
        <meta
          property="og:image"
          content="https://myunsplash-trends.vercel.app/og.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
      </Head>
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
            made with <span className="text-[#EB5757]">&hearts;</span> by{" "}
            <a
              href="https://github.com/rd-trends"
              target="_blank"
              className="text-[#3DB46D]"
            >
              Daniel Ikoyo
            </a>
          </footer>
        </div>
      )}
    </>
  );
}
