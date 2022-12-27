import { atom } from "jotai";
import { photo } from "./interface";

const data: photo[] = [
  {
    src: "https://picsum.photos/500/300?random=1",
    label: "label 1",
    _id: "jdjdks",
  },
  {
    src: "https://picsum.photos/500/400?random=2",
    label: "label 1",
    _id: "jdjdksnd",
  },
  {
    src: "https://picsum.photos/500/500?random=3",
    label: "label 1",
    _id: "jdjdksq1",
  },
  {
    src: "https://picsum.photos/500/300?random=4",
    label: "label 1",
    _id: "jdjdksq2",
  },
  {
    src: "https://picsum.photos/500/600?random=5",
    label: "label 1",
    _id: "jdjdksq3",
  },
  {
    src: "https://picsum.photos/500/400?random=6",
    label: "label 1",
    _id: "jdjdksq4",
  },
  {
    src: "https://picsum.photos/500/500?random=7",
    label: "label 1",
    _id: "jdjdksq5",
  },
  {
    src: "https://picsum.photos/500/600?random=8",
    label: "label 1",
    _id: "jdjdksq6",
  },
];

export const userphotosAtom = atom<photo[]>(data);
export const searchAtom = atom<string>("");
export const filteredUserPhotoAtom = atom((get) => {
  const search = get(searchAtom).toLowerCase();
  const userPhotos = get(userphotosAtom);
  return userPhotos.filter((photo) =>
    photo.label.toLowerCase().includes(search)
  );
});
