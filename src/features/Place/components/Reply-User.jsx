import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TextareaCustomControl from "../../../components/Form-Control/Textarea-Custom-Control";

ReplyUser.propTypes = {
  isReply: PropTypes.bool,
  hideReply: PropTypes.func,
  onSubmit: PropTypes.func,
  review: PropTypes.object,
};

function ReplyUser({
  isReply = false,
  review = {},
  hideReply = null,
  onSubmit = null,
}) {
  const user = useSelector((state) => state.auth.current);
  console.log(user);

  const replyRef = useRef(null);
  const [state, setState] = useState({});

  useEffect(() => {
    if (replyRef && replyRef.current) {
      replyRef.current.focus();
    }
  }, [isReply]);

  const handleSubmit = async () => {
    console.log({
      reply: state.reply,
      userId: user.id,
      reviewId: review.id,
    });
    await onSubmit({
      reply: state.reply,
      userId: user.id,
      reviewId: review.id,
    });

    // hideReply();
  };
  const handleOnChange = (value) => {
    setState(value);
  };
  return (
    <div className="border-l-[1px] border-l-[#eee] ml-[6px] mt-[16px] pl-[10px]">
      <div className="mt-1 pt-4 border-t-[1px] border-t-[#ddd]">
        <div className="py-[5px] px-[10px] bg-[#eee] rounded-[12px] ">
          <div className="flex items-center justify-between border-b-[1px] border-b-[#e0e0e0] py-1 ">
            <div className="flex items-start ">
              <Link
                to={`/profile/${user?.slug}`}
                className="mr-[11px] w-10 h-10 lg:w-[64px] lg:h-[64px]"
              >
                <img
                  src={user?.image?.url}
                  alt={user?.name}
                  className="w-full h-full rounded-full"
                />
              </Link>
              <div className="flex flex-col gap-y-1 ">
                <h3 className="text-base font-semibold hover:underline cursor-pointer lg:text-[18px]">
                  {user?.name}
                </h3>
                {/* <span className="text-xs font-normal text-[#898c95] mb-[2px] block hover:underline cursor-pointer">
                  Đã đánh giá từ 22 ngày trước
                </span> */}
              </div>
            </div>
          </div>

          <form className="mt-2" ref={replyRef}>
            <TextareaCustomControl
              className="bg-[#f5f5f7] text-xs lg:text-sm "
              name="reply"
              id="reply"
              onKeyPress={handleSubmit}
              onChange={handleOnChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReplyUser;
