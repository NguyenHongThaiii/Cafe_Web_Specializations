import React, { useState } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { FaTimes, FaUpload } from "react-icons/fa";
import ModalPreviewAvatar from "./Modal-Preview-Avatar";

ModalUploadAvatar.propTypes = {
  hideModal: PropTypes.func,
};

function ModalUploadAvatar({ hideModal = null }) {
  if (typeof document === "undefined") {
    return <div></div>;
  }
  const [urlImg, setUrlImg] = useState("");
  const [file, setFile] = useState(null);
  const [isModalPreview, setIsModalPreview] = useState(false);
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    const tempImage = URL.createObjectURL(file);
    setIsModalPreview(true);
    setUrlImg(tempImage);
    setFile(file);
  };
  return createPortal(
    <div className="fixed inset-0 z-[100000000000000000] bg-[rgba(0,0,0,.65)] ">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-black w-[600px] bg-white rounded-[10px] shadow-[0_2px_8px_rgb(0,0,0,0.15)] overflow-hidden">
          <div className="px-[60px] shrink-0 h-[60px] border-b-[1px] border-b-[rgba(0,0,0,.1)] text-center relative">
            <div className="h-full flex items-center justify-center">
              <h2 className="text-black font-bold">Cập nhật ảnh đại diện</h2>
            </div>
            <div
              onClick={hideModal}
              className="absolute top-3 right-4 text-[#666] w-9 h-9 text-[26px] cursor-pointer bg-[#e4e6eb] rounded-full flex items-center justify-center"
            >
              <FaTimes />
            </div>
          </div>

          <div className="p-4 min-h-[200px]">
            <label
              htmlFor="avatar"
              className="block py-4 bg-[#fafafa] cursor-pointer border-dotted border-[2px] border-[#e1e1e1] "
            >
              <input
                type="file"
                name=""
                id="avatar"
                className="hidden"
                accept="image/*"
                onChange={handleOnChange}
                multiple={false}
              />
              <div>
                <p className="pb-5 flex items-center justify-center">
                  <FaUpload className="text-[40px] text-[#c1c1c1]" />
                </p>
                <p className="mb-1 text-[rgba(0,0,0,.85)] text-lg text-center">
                  Chọn ảnh hoặc kéo ảnh vào đây để cập nhật ảnh đại diện
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
      {isModalPreview && (
        <ModalPreviewAvatar
          url={urlImg}
          hideModalPreview={() => setIsModalPreview(false)}
          file={file}
          hideModal={hideModal}
        />
      )}
    </div>,
    document.querySelector("body")
  );
}

export default ModalUploadAvatar;
