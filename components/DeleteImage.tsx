import React, { useState } from "react";
import { useAtom } from "jotai";
import { userphotosAtom } from "../store";
import Modal from "./Modal";
import Button from "./Button";

interface props {
  setShowDeleteImageModal: (status: boolean) => void;
  id: string;
}

const DeleteImage = ({ setShowDeleteImageModal, id }: props) => {
  const [password, setpassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [, setUserPhotos] = useAtom(userphotosAtom);

  const handleDeletePhoto = async () => {
    setError("");
    setLoading(true);
    try {
      await fetch(`/api/photo/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          setUserPhotos((prev) => {
            return prev.filter((photo) => photo._id !== id);
          });
          setShowDeleteImageModal(false);
        }
        if (response.status === 401) {
          setError("Incorrect password");
          setLoading(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal>
      <div className="py-4 px-6 text-[#333333]">
        <h3 className="font-medium text-[24px] mb-2 ">Are you sure</h3>
        <div>
          <label className="block text-sm mb-2" htmlFor="password">
            password
          </label>
          <input
            type="text"
            placeholder="**************"
            id="password"
            className="w-full rounded-xl py-2 px-4 border border-[#4F4F4F] outline-none bg-transparent hover:focus:border-[#3DB46D] mb-4"
            value={password}
            onChange={(e) => {
              if (error) setError("");
              setpassword(e.target.value);
            }}
          />
          {error && <p className="text-[#EB5757]">{error}</p>}
        </div>
        <div className="flex items-center justify-end mt-2 mb-1">
          <Button
            className="mr-4"
            color="secondary"
            onClick={() => setShowDeleteImageModal(false)}
          >
            cancel
          </Button>
          <Button loading={loading} color="danger" onClick={handleDeletePhoto}>
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteImage;
