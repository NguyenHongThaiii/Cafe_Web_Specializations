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
import blogsApi from "../../../api/blogsApi";
import { timeToNumber } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const schema = yup.object({
  name: yup
    .string("Vui lòng nhập tên quán.")
    .trim()
    .max(50, "Tên quán không được vượt quá 50 ký tự")
    .required("Vui lòng nhập tên quán"),
  area_id: yup
    .string("Vui lòng chọn khu vực")
    .trim()
    .required("Vui lòng chọn khu vực"),
  location: yup
    .string("Vui lòng nhập địa chỉ")
    .trim()
    .max(255, "Địa chỉ quán không được vượt quá 255 ký tự")
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
        return value > this.parent.priceMin;
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
});
CreateBlog.propTypes = {};

function CreateBlog(props) {
  const user = useSelector((state) => state.auth.current);
  const navigate = useNavigate();
  const [values, setValues] = useState();
  const [error, setError] = useState({});
  const [state, setState] = useState({});
  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      priceMin: 0,
      priceMax: 0,
      startTime: "07:00",
      endTime: "22:00",
    },
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
    data = { ...data, ...values };
    try {
      if (!values?.listImageFile || values?.listImageFile?.length < 5) {
        setError({ image: "Ít nhất 5 images" });
        return;
      }
      if (!values?.listMenuFile || values?.listMenuFile?.length < 2) {
        setError({ menu: "Ít nhất 2 menus" });
        return;
      }
      if (!values?.description) {
        setError({ description: "Vui lòng nhập trường giới thiệu" });
        return;
      }
      if (values?.description?.length > 500) {
        setError({ description: "Tối đa 500 kí tự cho phần giới thiệu" });
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
      data.startTime = null;
      data.endTime = null;
      data.area_id = +data.area_id;
      data.convenience_id = +data.convenience_id;
      data.kind_id = +data.kind_id;
      data.purpose_id = +data.purpose_id;
      data.longitude = data?.longitude ? parseFloat(data.longitude) : null;
      data.latitude = data?.latitude ? parseFloat(data.latitude) : null;
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
      }
      values?.listImageFile?.forEach((file, index) => {
        formData.append(`listImageFile[${index}]`, file);
      });
      values?.listMenuFile?.forEach((file, index) => {
        formData.append(`listMenuFile[${index}]`, file);
      });
      formData.append("name", data?.name);
      formData.append("listScheduleDto", data?.listScheduleDto);
      formData.append("area_id", data?.area_id);
      formData.append("purpose_id", data?.purpose_id);
      formData.append("convenience_id", data?.convenience_id);
      formData.append("description", data?.description);
      formData.append("location", data?.location);
      formData.append("userId", user.id);
      formData.append("kind_id", data?.kind_id);
      formData.append("status", 0);
      formData.append("priceMin", data?.priceMin);
      formData.append("priceMax", data?.priceMax);
      if (data?.email?.length > 0) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data?.email))
          formData.append("email", data?.email);
        else {
          toast.error("Vui lòng nhập đúng định dạng email.");
          return;
        }
      }
      if (data?.facebook?.length > 0) {
        if (
          /^(?:http(s)?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/.test(
            data?.facebook
          )
        )
          formData.append("facebook", data?.facebook);
        else {
          toast.error("Vui lòng nhập đúng định dạng link facebook.");
          return;
        }
      }
      if (data?.phone?.length > 0) {
        if (/^\+?[0-9]+$/.test(data?.phone))
          formData.append("phone", data?.phone);
        else {
          toast.error("Vui lòng nhập đúng định dạng số điện thoại.");
          return;
        }
      }
      await blogsApi.createProduct(formData);
      toast("Tạo thành công");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Có lỗi xảy ra xin hãy thử lại sau.");
    }
    navigate("/");
  };

  return (
    <LayoutUser>
      <div className="flex justify-center ">
        <div className=" shadow-[0_2px_8px_rgba(0,0,0,.15)] bg-white px-5 py-3  xs:px-2 m-2 w-[928px] rounded-md mb-0 xs:mb-20">
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
              formState={formState}
              errorMessage={error?.description}
            />
            <OtherInfor
              control={control}
              onChange={handleOnChange}
              kinds={state?.kinds}
              conveniences={state?.conveniences}
              purposes={state?.purposes}
              formState={formState}
            />
            <ContactInfor control={control} formState={formState} />
            <ImageFrame onChange={handleOnChange} error={error} />
            <button
              type="submit"
              className={`text-white text-xl mt-5 w-full h-10 px-5 rounded-lg bg-primary font-semibold   transition-all duration-300
                ${
                  formState.isSubmitting
                    ? "bg-gray-500 hover:bg-gray-500"
                    : "  "
                }                `}
              disabled={formState.isSubmitting}
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
