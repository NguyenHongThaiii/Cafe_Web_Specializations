import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import ModalEditPreview from "./Modal-Edit-Preview";

ModalPreviewAvatar.propTypes = {
  url: PropTypes.string,
  hideModalPreview: PropTypes.func,
  file: PropTypes.object,
  hideModal: PropTypes.func,
};

function ModalPreviewAvatar({
  url = "",
  hideModalPreview = null,
  file = {},
  hideModal = null,
}) {
  if (typeof document === "undefined") return <div></div>;

  return createPortal(
    <div className="z-[10000] fixed flex items-center justify-center inset-0 bg-[rgba(0,0,0,.45)] ">
      <div className="w-[520px] bg-[rgba(0,0,0,.85)] text-sm relative mx-auto">
        <div className="rounded-[10px] overflow-hidden shadow-[0_2px_8px_rgb(0,0,0,0.15] bg-white relative">
          <button
            onClick={hideModalPreview}
            className="absolute top-0 right-0 flex items-center justify-center w-[56px] h-[56px]"
          >
            <FaTimes className="text-[rgba(0,0,0,.45)] text-lg" />
          </button>
          <div className="py-4 px-6 bg-white text-[rgba(0,0,0,.85)] border-b-[1px] border-b-[#f0f0f0] ">
            Chỉnh sửa ảnh
          </div>

          <ModalEditPreview
            url={url}
            file={file}
            hideModalPreview={hideModalPreview}
            hideModal={hideModal}
          />
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default ModalPreviewAvatar;
