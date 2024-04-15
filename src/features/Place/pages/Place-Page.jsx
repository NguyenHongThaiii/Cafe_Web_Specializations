import React, { useEffect, useRef, useState } from "react";
import { FaHandPointRight, FaStreetView, FaUserCheck } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import blogsApi from "../../../../src/api/blogsApi";
import LayoutUser from "../../../components/Layout/Layout-User";
import { GlobalProvider, useHide } from "../../../context/Global-Provider";
import { showLoginPage } from "../../Auth/authSlice";
import ComponentIsSaved from "../components/Component-Is-Saved";
import ConcernSlide from "../components/Concern-Slide";
import ConvenientSlider from "../components/Convenient-Slider";
import Judge from "../components/Judge";
import JudgePublic from "../components/Judge-Public";
import MapBox from "../components/MapBox";
import ModalImage from "../components/Modal-Image";
import ModalMenu from "../components/Modal-Menu";
import ParticularLocation from "../components/Particular-Location";
import SlideImage from "../components/Slide-Image";
import SwiperImage from "../components/Swiper-Image";
import Details from "./../components/Details";
PlacePage.propTypes = {};

function PlacePage(props) {
  const location = useLocation();
  const user = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slug = location.pathname.split("/")[2];
  const [show, setShow] = useState(false);
  const [isMap, setIsMap] = useState(false);
  const scrollRef = useRef(null);
  const [state, setState] = useState({});
  const [concern, setConcern] = useState([]);
  const [hide, setHide] = useHide();
  const [showModalImage, setShowModalImage] = useState({
    show: false,
    index: 0,
  });
  const [isShowModalMenu, setIsShowModalMenu] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const blog = await blogsApi.getBySlug(slug);
        if (!blog?.id) {
          navigate("/not-found");
          return;
        }
        const concernBlog = await blogsApi.getAll({
          limit: 4,
          page: 1,
          slugArea: blog?.areas?.length > 0 ? blog.areas[0]?.slug : null,
        });
        setState(blog);
        setConcern(concernBlog);
        if (typeof document !== "undefined") {
          document.getElementById("root").style.overflow = "unset";
        }
        if (scrollRef && scrollRef.current) {
          scrollRef.current.scrollIntoView({
            behavior: "smooth",
          });
        }
      } catch (error) {
        console.log("Error", error);
      }
    })();

    return () => {
      if (typeof document !== "undefined") {
        document.getElementById("root").style.overflow = "auto";
      }
    };
  }, [location, location.pathname]);

  const handleShowModalImage = (index) => {
    setShowModalImage((prev) => ({ ...prev, index, show: true }));
  };

  const handleShowModalMenu = () => {
    setIsShowModalMenu(true);
    setHide(true);
  };
  const handleHideModalMenu = () => {
    setIsShowModalMenu(false);
    setHide(false);
  };
  return (
    <GlobalProvider>
      <LayoutUser>
        <div
          className="lg:max-w-[1200px] lg:mx-auto pt-[10px] px-[2px]  pb-[70px] lg:pb-0"
          ref={scrollRef}
        >
          <div className="p-2 mb-[6px] lg:mb-5 shadow-[0_1px_4px_rgb(0,0,0,0.3)] rounded-[10px] ">
            <div className="flex items-center justify-between pl-2">
              <h1 className="lg:text-[28px] text-[22px] font-semibold ">
                {state.name}
              </h1>
              <ComponentIsSaved data={state} user={user} />
            </div>
            <div className="pl-2 text-sm lg:flex items-center gap-x-1 flex-wrap">
              {state?.description}
            </div>
            <div className="pl-2 text-sm lg:flex items-center gap-x-1 flex-wrap">
              <div className="flex items-center gap-x-1 mb-[2px] lg:text-[16px]">
                <MdLocationPin className="ml-[-3px] " />
                {state?.location}
              </div>
              <div className="flex items-center gap-x-1 ">
                <span className="lg:text-[16px]">
                  <FaStreetView className="ml-[-3px] lg:hidden" />
                  <span className="hidden lg:inline-block">{" —"}</span>
                </span>
                <span
                  onClick={() => setIsMap(true)}
                  className="lg:text-[16px] text-primary hover:underline cursor-pointer font-medium"
                >
                  Hiển thị bản đồ
                </span>
                {" —"}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${state?.latitude},${state?.longitude}`}
                  target="_blank"
                  className="lg:text-[16px] text-primary hover:underline cursor-pointer font-medium"
                >
                  Xem đường đi
                </a>
                {" —"}
                <span
                  onClick={handleShowModalMenu}
                  className="lg:text-[16px] text-primary hover:underline cursor-pointer font-medium"
                >
                  Xem menu
                </span>
              </div>
            </div>

            <SlideImage
              data={state}
              handleShowModalImage={(index) => handleShowModalImage(index)}
            />

            <SwiperImage data={state} />
          </div>
          <div
            className={`flex flex-col lg:flex-row  justify-between gap-x-4 lg:mt-2 lg:mb-5  `}
          >
            <Judge
              item={state}
              show={show}
              onShow={() => {
                if (!user?.id) {
                  dispatch(showLoginPage());
                  return;
                }
                setShow(true);
              }}
            />

            <Details item={state} />
            <ParticularLocation data={state} />
          </div>

          <div>
            <ConvenientSlider item={state} />
          </div>

          <div className=" lg:flex block justify-between gap-x-4  lg:mt-5  ">
            <JudgePublic
              item={state}
              show={show}
              onShow={() => {
                if (!user?.id) {
                  dispatch(showLoginPage());
                  return;
                }
                setShow(true);
              }}
              hideShow={() => setShow(false)}
            />

            <div className="w-[calc(33.33%_-_20px)] lg:block hidden sticky top-[20px]  position-[-webkit-sticky] h-fit mb-[6px]   ">
              <Judge
                item={state}
                show={show}
                onShow={() => {
                  console.log(user?.id);
                  if (!user?.id) {
                    dispatch(showLoginPage());
                    return;
                  }
                  setShow(true);
                }}
              />

              <div className="p-4 shadow-[0_2px_8px_rgb(0,0,0,0.15)] bg-white rounded-[10px] ">
                <img
                  src="/img/deploy.png"
                  alt="deploy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:mt-3 shadow-[0_1px_4px_rgb(0,0,0,0.15)] py-2 px-4 bg-white rounded-[10px]">
            <h2 className="lg:text-[28px] text-[20px] font-semibold flex items-center justify-between">
              Địa điểm lân cận
              <Link
                to={`/search?areas=${
                  state?.areas?.length > 0 && state.areas[0]?.slug
                }`}
                className="font-normal text-sm text-primary curosr-pointer hover:underline transition-all lg:text-base"
              >
                Xem thêm
              </Link>
            </h2>
            <div className="lg:block hidden">
              <img
                onClick={() => setIsMap(true)}
                src={`${import.meta.env.VITE_BANNER_MAPBOX}${
                  import.meta.env.VITE_MAPBOX
                }`}
                alt="mapbox"
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <ConcernSlide data={concern} />
          </div>

          <div className="lg:mt-5 lg:mb-10 mt-2 flex items-center justify-between lg:p-4 p-[14px] mb-3 shadow-[0_1px_4px_rgb(0,0,0,0.15)] rounded-[10px] bg-[linear-gradient(-4deg,#fbf4f4,#ffa8a8)] ">
            <div className="pr-12">
              <h3 className="text-lg font-semibold mb-1">
                Đây có phải là quán cafe của bạn không?
              </h3>
              <p className="text-sm">
                Bạn sở hữu hoặc quản lý quán cafe này? Xác nhận hồ sơ của bạn
                miễn phí để cập nhật thông tin quán, nhận tick xanh, phản hồi
                đánh giá và hơn thế nữa.
              </p>
              <Link
                to="/"
                className=" flex items-center gap-x-2 text-sm text-primary font-normal mt-1"
              >
                <FaHandPointRight className="animate-move" />
                Xác nhận chủ sỡ hữu ngay
              </Link>
            </div>
            <div>
              <FaUserCheck className="text-[54px] text-primary opacity-80" />
            </div>
          </div>
          {state?.latitude != null && state?.longitude !== null && isMap && (
            <MapBox data={state} hideMap={() => setIsMap(false)} />
          )}

          {showModalImage.show && (
            <ModalImage
              data={state || {}}
              index={showModalImage?.index || 0}
              imageList={state?.imgPreview}
              length={state?.imgPreview?.length}
              hideModalImage={() =>
                setShowModalImage((prev) => ({ ...prev, show: false }))
              }
            />
          )}
          {isShowModalMenu && (
            <ModalMenu data={state} hideModalMenu={handleHideModalMenu} />
          )}
        </div>
      </LayoutUser>
    </GlobalProvider>
  );
}

export default PlacePage;
