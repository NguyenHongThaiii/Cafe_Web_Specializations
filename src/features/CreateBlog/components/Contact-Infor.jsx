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
        <div className="py-5 px-4 flex flex-col gap-5">
          <div className="flex items-center ">
            <label htmlFor="email" className="min-w-20 text-[14px] mr-16">
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
            <label htmlFor="facebook" className="min-w-20 text-[14px] mr-16">
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
            <label htmlFor="phone" className="min-w-20 text-[14px] mr-16">
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
