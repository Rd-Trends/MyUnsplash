import { yupResolver } from "@hookform/resolvers/yup";
import { useAtom } from "jotai";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { userphotosAtom } from "../store";
import Button from "./Button";
import Modal from "./Modal";

interface props {
  setShowAddImageModal: (status: boolean) => void;
}

interface formData {
  label: string;
  src: string;
}

const schema = yup
  .object({
    label: yup.string().required("Please provide a label for this image"),
    src: yup.string().url().required("Please provide a url for this image"),
  })
  .required();

const AddNewImage = ({ setShowAddImageModal }: props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [, setUserPhotos] = useAtom(userphotosAtom);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>({ resolver: yupResolver(schema) });

  const handlePhotoUpload = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await fetch("/api/photo", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((photo) => {
          setUserPhotos((prev) => [photo, ...prev]);
          setLoading(false);
        });
      reset();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  });

  return (
    <Modal>
      <div className="py-4 px-6 text-darkgrey">
        <h3 className="font-medium text-[24px] mb-4 ">Add a new photo</h3>
        <form className="" onSubmit={handlePhotoUpload}>
          <label className="block text-sm mb-2" htmlFor="label">
            Label
          </label>
          <input
            type="text"
            placeholder="name of photo"
            id="label"
            className="w-full rounded-xl py-2 px-4 outline-none border border-secondary bg-transparent hover:focus:border-primary "
            {...register("label")}
          />
          {errors?.label && (
            <p className=" mt-2 mb-1 text-danger">{errors.label.message}</p>
          )}
          <label htmlFor="imageurl" className="block text-sm mb-2 mt-4">
            Photo URL
          </label>
          <input
            type="text"
            placeholder="https://picsum.photos/500/300?random=1"
            id="imageurl"
            className="w-full rounded-xl py-2 px-4 outline-none border border-secondary bg-transparent hover:focus:border-primary"
            {...register("src")}
          />
          {errors?.src && (
            <p className=" mt-1 mb-2 text-danger">{errors.src.message}</p>
          )}

          <div className="flex items-center justify-end mt-4 mb-1">
            <Button
              className="mr-4 shadow-none bg-transparent font-semibold"
              color="secondary"
              onClick={(e: FormEvent) => {
                e.preventDefault();
                setShowAddImageModal(false);
              }}
            >
              cancel
            </Button>
            <Button className="" loading={loading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewImage;
