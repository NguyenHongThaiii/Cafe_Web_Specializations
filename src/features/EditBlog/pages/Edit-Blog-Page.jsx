import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import areasApi from "../../../api/areasApi";
import blogsApi from "../../../api/blogsApi";
import conveniencesApi from "../../../api/conveniencesApi";
import kindsApi from "../../../api/kindsApi";
import purposesApi from "../../../api/purposesApi";
import LayoutUser from "../../../components/Layout/Layout-User";
import { convertToTimeString, timeToNumber } from "../../../utils";
import BasicInfor from "../components/Basic-Infor";
import ContactInfor from "../components/Contact-Infor";
import ImageFrame from "../components/Image-Frame";
import OtherInfor from "../components/Other-Infor";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

EditBlogPage.propTypes = {};

const schema = yup.object({
  name: yup
    .string("Vui lòng nhập tên quán.")
    .trim()
    .required("Vui lòng nhập tên quán"),
  area_id: yup
    .string("Vui lòng chọn khu vực")
    .trim()
    .required("Vui lòng chọn khu vực"),
  location: yup
    .string("Vui lòng nhập địa chỉ")
    .trim()
    .required("Vui lòng nhập địa chỉ"),
  startTime: yup
    .string("Vui lòng nhập giờ mở cửa")
    .trim()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Giờ mở cửa không hợp lệ. Ví dụ: 07:00"
    )
    .required("Vui lòng nhập giờ mở cửa"),
  endTime: yup
    .string("Vui lòng nhập giờ đóng cửa")
    .trim()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Giờ đóng cửa không hợp lệ. Ví dụ: 22:00"
    )
    .required("Vui lòng nhập giờ đóng cửa"),
  priceMin: yup
    .number()
    .typeError("priceMin must be a number")
    .required("Vui lòng nhập giá tối thiểu")
    .min(0, "Giá tối thiểu phải lớn hơn hoặc bằng 0")
    .max(1000000, "Giá tối thiểu không được vượt quá 1,000,000"),
  priceMax: yup
    .number()
    .typeError("priceMax must be a number")
    .required("Vui lòng nhập giá tối đa")
    .min(yup.ref("priceMin"), "Giá tối đa phải lớn hơn giá tối thiểu")
    .test(
      "is-greater",
      "Giá tối đa phải lớn hơn giá tối thiểu",
      function (value) {
        return value >= this.parent.priceMin;
      }
    )
    .max(1000000, "Giá tối đa không được vượt quá 1,000,000"),
  kind_id: yup
    .string("Vui lòng chọn kiểu quán")
    .trim()
    .required("Vui lòng chọn kiểu quán"),
  convenience_id: yup
    .string("Vui lòng chọn tiện ích của quán")
    .trim()
    .required("Vui lòng chọn tiện ích của quán"),
  purpose_id: yup
    .string("Vui lòng chọn mục đích của quán")
    .trim()
    .required("Vui lòng chọn mục đích của quán"),
  // latitude: yup
  //   .string("Vui lòng nhập vĩ độ")
  //   .matches(/^\-?\d+(\.\d+)?$/, "Vĩ độ phải là số thực, ví dụ: 21.0336724"),
  // longitude: yup
  //   .string("Vui lòng nhập kinh độ")
  //   .matches(/^\-?\d+(\.\d+)?$/, "Kinh độ phải là số thực, ví dụ: 105.8109417"),
});
function EditBlogPage(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.current);
  const slug = location.pathname.split("/")[2];
  const [values, setValues] = useState();
  const [error, setError] = useState({});
  const [state, setState] = useState({});
  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    (async () => {
      try {
        const blog = await blogsApi.getBySlug(slug || "");
        if (!blog?.id) {
          navigate("/not-found");
          return;
        }
        const areas = await areasApi.getAll({ limit: 100 });
        const kinds = await kindsApi.getAll({ limit: 100 });
        const conveniences = await conveniencesApi.getAll({ limit: 100 });
        const purposes = await purposesApi.getAll({ limit: 100 });
        const data = { areas, kinds, conveniences, purposes, blog };
        setState(data);
        setValue("name", blog?.name);
        setValue("location", blog?.location);
        setValue(
          "area_id",
          blog?.areas?.length > 0 ? blog?.areas[0]?.id : undefined
        );
        setValue(
          "kind_id",
          blog?.kinds?.length > 0 ? blog?.kinds[0]?.id : undefined
        );
        setValue(
          "purpose_id",
          blog?.purposes?.length > 0 ? blog?.purposes[0]?.id : undefined
        );
        setValue(
          "convenience_id",
          blog?.conveniences?.length > 0 ? blog?.conveniences[0]?.id : undefined
        );
        setValue(
          "startTime",
          blog?.schedules?.length > 0
            ? convertToTimeString(blog?.schedules[0].startTime)
            : "07:00"
        );
        setValue(
          "endTime",
          blog?.schedules?.length > 0
            ? convertToTimeString(blog?.schedules[0].endTime)
            : "22:00"
        );
        setValue("priceMin", blog?.priceMin);
        setValue("priceMax", blog?.priceMax);
        setValue("latitude", blog?.latitude || "");
        setValue("longitude", blog?.longitude || "");
        setValue("email", blog?.owner?.email);
        setValue("facebook", blog?.owner?.facebook);
        setValue("phone", blog?.owner?.phone);
      } catch (error) {
        navigate("/not-found");
      }
    })();
  }, [location, location.pathname]);
  const handleOnChange = (value) => {
    setValues((prev) => ({ ...prev, ...value }));
  };
  const handleOnSubmit = async (data) => {
    data = { ...data, ...values };
    if (!data?.description) data.description = state?.blog?.description;
    try {
      if (
        values?.listImageFile?.length > 0 &&
        values?.listImageFile?.length < 5
      ) {
        setError({ image: "Ít nhất 5 images" });
        return;
      }
      if (
        values?.listMenuFile?.length > 0 &&
        values?.listMenuFile?.length < 2
      ) {
        setError({ menu: "Ít nhất 2 menus" });
        return;
      }
      if (!data?.description && !state?.blog?.description) {
        setError({ description: "Vui lòng nhập trường giới thiệu" });
        return;
      }
      setError(null);

      data.listScheduleDto = JSON.stringify([
        {
          dayOfWeek: 1,
          startTime: timeToNumber(data?.startTime),
          endTime: timeToNumber(data?.endTime),
        },
      ]);
      // data.startTime = null;
      // data.endTime = null;
      data.area_id = +data.area_id;
      data.convenience_id = +data.convenience_id;
      data.kind_id = +data.kind_id;
      data.purpose_id = +data.purpose_id;

      data.status = 1;
      const formData = new FormData();
      if (data?.latitude || data?.longitude) {
        const regex = /^-?\d+(\.\d+)?$/;
        if (!regex.test(data?.latitude)) {
          setError({ latitude: "Vĩ độ phải là số thực, ví dụ: 21.0336724" });
          toast.error("Vĩ độ phải là số thực, ví dụ: 21.0336724");

          return;
        } else if (!regex.test(data?.longitude)) {
          setError({
            longitude: "Kinh độ phải là số thực, ví dụ: 105.8109417",
          });
          toast.error("Kinh độ phải là số thực, ví dụ: 21.0336724");

          return;
        }
        data.longitude = data?.longitude ? parseFloat(data.longitude) : null;
        data.latitude = data?.latitude ? parseFloat(data.latitude) : null;
        formData.append("latitude", data?.latitude);
        formData.append("longitude", data?.longitude);
      }
      values?.listImageFile?.forEach((file, index) => {
        formData.append(`listImageFile[${index}]`, file);
      });
      values?.listMenuFile?.forEach((file, index) => {
        formData.append(`listMenuFile[${index}]`, file);
      });
      formData.append("name", data?.name);
      formData.append("listScheduleDto", data?.listScheduleDto);
      formData.append("phone", data?.phone);
      formData.append("area_id", data?.area_id);
      formData.append("convenience_id", data?.convenience_id);
      formData.append("description", data?.description);
      formData.append("location", data?.location);
      formData.append("userId", user.id);
      formData.append("kind_id", data?.kind_id);
      formData.append("purpose_id", data?.purpose_id);

      formData.append("status", data?.status);
      formData.append("priceMin", data?.priceMin);
      formData.append("priceMax", data?.priceMax);
      await blogsApi.updateProduct(state?.blog?.id, formData);
      toast("Chỉnh sửa thành công");
      navigate(`/place/${state?.blog?.slug}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Có lỗi xảy ra xin hãy thử lại sau.");
    }
  };
  return (
    <LayoutUser>
      <div className="flex justify-center ">
        <div className=" shadow-[0_2px_8px_rgba(0,0,0,.15)] bg-white px-5 py-3  xs:px-2 m-2 w-[928px] rounded-md mb-0 xs:mb-20">
          <p className="font-medium text-[28px]">Chỉnh sửa địa điểm</p>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <BasicInfor
              control={control}
              onChange={handleOnChange}
              areas={state?.areas}
              formState={formState}
              errorMessage={error?.description}
              blog={state?.blog}
            />
            <OtherInfor
              control={control}
              onChange={handleOnChange}
              kinds={state?.kinds}
              conveniences={state?.conveniences}
              purposes={state?.purposes}
              formState={formState}
              blog={state?.blog}
              error={error}
            />
            <ContactInfor control={control} formState={formState} />
            <ImageFrame
              onChange={handleOnChange}
              error={error}
              blog={state?.blog}
            />
            <button
              type="submit"
              className={`text-white text-xl mt-5 w-full h-10 px-5 rounded-lg bg-primary font-semibold  lg:hover:bg-[#be0129] transition-all duration-300
            ${formState.isSubmitting ? "bg-gray-500" : "  "}                `}
              disabled={formState.isSubmitting}
            >
              + Chỉnh sửa địa điểm
            </button>
          </form>
        </div>
      </div>
    </LayoutUser>
  );
}

export default EditBlogPage;
