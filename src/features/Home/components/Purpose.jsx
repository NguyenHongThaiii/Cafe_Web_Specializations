import React, { useEffect, useState } from "react";
import purposesApi from "../../../api/purposesApi";
import SliderTemplate from "../../../components/ChildrenComponent/Slider-Template";
import { handleInnerHeightSlides } from "../../../utils";
import PurposeItem from "./Purpose-Item";

function Purpose() {
  const [state, setState] = useState([]);
  const [numberSlides, setNumberSlides] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await purposesApi.getAll();
        setState(data);
        // setState(data.data[0].topic);
        window.addEventListener("resize", handleResize);
      } catch (error) {
        console.log("Error 💥", error.message);
      }
    })();
    const handleResize = () => {
      setNumberSlides(handleInnerHeightSlides(window.innerWidth));
    };
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <SliderTemplate
      state={state}
      slidesPerView={numberSlides || handleInnerHeightSlides(window.innerWidth)}
      title="Mục đích của bạn ?"
    >
      {(item, index) => <PurposeItem item={item} index={index} />}
    </SliderTemplate>
  );
}

export default Purpose;
