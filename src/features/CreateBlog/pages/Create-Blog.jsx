import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import areasApi from "../../../api/areasApi";
import LayoutUser from "../../../components/Layout/Layout-User";
import BasicInfor from "../components/Basic-Infor";
import ContactInfor from "../components/Contact-Infor";
import ImageFrame from "../components/Image-Frame";
import OtherInfor from "../components/Other-Infor";
import kindsApi from "../../../api/kindsApi";
import conveniencesApi from "../../../api/conveniencesApi";
import purposesApi from "../../../api/purposesApi";
const schema = yup.object({
  name: yup
    .string("Vui lòng nhập tên quán.")
    .trim()
    .required("Vui lòng nhập tên quán"),
  area_id: yup
    .number("Vui lòng chọn khu vực")
    .required("Vui lòng chọn khu vực"),
  address: yup
    .string("Vui lòng nhập địa chỉ")
    .trim()
    .required("Vui lòng nhập địa chỉ"),
  // description: yup
  //   .string("Vui lòng nhập giới thiệu về quán")
  //   .trim()
  //   .required("Vui lòng nhập giới thiệu về quán"),
  startTime: yup
    .string("Vui lòng nhập giờ mở cửa")
    .trim()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Giờ không hợp lệ. Vui lòng nhập đúng định dạng HH:mm, ví dụ: 07:00"
    )
    .required("Vui lòng nhập giờ mở cửa"),
  endTime: yup
    .string("Vui lòng nhập giờ đóng cửa")
    .trim()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Giờ không hợp lệ. Vui lòng nhập đúng định dạng HH:mm, ví dụ: 22:00"
    )
    .required("Vui lòng nhập giờ đóng cửa"),
  priceMin: yup
    .number("Vui lòng nhập giá tối thiểu")
    .min(0, "Giá tối thiểu phải lớn hơn hoặc bằng 0")
    .max(1000000, "Giá tối thiểu không được vượt quá 1,000,000"),
  priceMax: yup
    .number("Vui lòng nhập giá tối đa")
    .min(yup.ref("priceMin"), "Giá tối đa phải lớn hơn hoặc bằng giá tối thiểu")
    .max(1000000, "Giá tối đa không được vượt quá 1,000,000"),
  kind_id: yup
    .number("Vui lòng chọn kiểu quán")
    .required("Vui lòng chọn kiểu quán"),
  convenience_id: yup
    .number("Vui lòng chọn tiện ích của quán")
    .required("Vui lòng chọn tiện ích của quán"),
  purpose_id: yup
    .number("Vui lòng chọn mục đích của quán")
    .required("Vui lòng chọn mục đích của quán"),
  latitude: yup
    .string("Vui lòng nhập vĩ độ")
    .matches(/^\-?\d+(\.\d+)?$/, "Vĩ độ phải là số thực, ví dụ: 21.0336724"),
  longitude: yup
    .string("Vui lòng nhập kinh độ")
    .matches(/^\-?\d+(\.\d+)?$/, "Kinh độ phải là số thực, ví dụ: 105.8109417"),
});
CreateBlog.propTypes = {};

function CreateBlog(props) {
  const [values, setValues] = useState();
  const [state, setState] = useState({});
  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    (async () => {
      const areas = await areasApi.getAll({ limit: 100 });
      const kinds = await kindsApi.getAll({ limit: 100 });
      const conveniences = await conveniencesApi.getAll({ limit: 100 });
      const purposes = await purposesApi.getAll({ limit: 100 });
      const data = { areas, kinds, conveniences, purposes };
      setState(data);
    })();
  }, []);
  const handleOnChange = (value) => {
    setValues((prev) => ({ ...prev, ...value }));
  };
  const handleOnSubmit = async (data) => {
    console.log({ ...values, ...data });
    try {
    } catch (error) {}
  };
  return (
    <LayoutUser>
      <div className="flex justify-center ">
        <div className=" shadow-[0_2px_8px_rgba(0,0,0,.15)] bg-white px-5 py-3 m-2 w-[928px] rounded-md mb-0 xs:mb-20">
          <p className="font-medium text-[28px]">Thêm địa điểm</p>
          <p className="text-[14px] mb-3">
            Những quán cafe yêu thích của bạn chưa có trên Toidicafe.vn? Chia sẻ
            với cộng đồng ngay!
          </p>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <BasicInfor
              control={control}
              onChange={handleOnChange}
              areas={state?.areas}
            />
            <OtherInfor
              control={control}
              onChange={handleOnChange}
              kinds={state?.kinds}
              conveniences={state?.conveniences}
              purposes={state?.purposes}
            />
            <ContactInfor control={control} />
            <ImageFrame onChange={handleOnChange} />
            <button
              type="submit"
              className="text-white text-xl w-full h-10 px-5 rounded-lg bg-primary font-semibold  lg:hover:bg-[#be0129] transition-all duration-300 "
            >
              + Thêm địa điểm
            </button>
          </form>
        </div>
      </div>
    </LayoutUser>
  );
}

export default CreateBlog;
