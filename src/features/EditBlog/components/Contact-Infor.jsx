import React from "react";
import PropTypes from "prop-types";
import InputControlCommon from "../../../components/Form-Control/Input-Control-Common";

ContactInfor.propTypes = {
  control: PropTypes.object,
  formState: PropTypes.object,
};

function ContactInfor({ control = null, formState = null }) {
  return (
    <>
      <p className="text-[21px] font-medium text-primary pb-2  border-b-[1px]">
        Thông tin liên hệ
      </p>
      <div>
        <div className="py-5 lg:px-4 flex flex-col gap-5 px-0">
          <div className="flex items-center ">
            <label
              htmlFor="email"
              className="lg:min-w-40 min-w-[92px] text-[14px] "
            >
              Email:
            </label>
            <InputControlCommon
              control={control}
              name="email"
              id="email"
              type="text"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="flex items-center ">
            <label
              htmlFor="facebook"
              className="lg:min-w-40 min-w-[92px] text-[14px] "
            >
              Facebook:
            </label>
            <InputControlCommon
              control={control}
              name="facebook"
              id="facebook"
              type="text"
              placeholder="https://www.facebook.com"
            />
          </div>
          <div className="flex items-center ">
            <label
              htmlFor="phone"
              className="lg:min-w-40 min-w-[92px] text-[14px] "
            >
              Điện thoại:
            </label>
            <InputControlCommon
              control={control}
              name="phone"
              id="phone"
              type="text"
              placeholder="0971151472"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactInfor;
