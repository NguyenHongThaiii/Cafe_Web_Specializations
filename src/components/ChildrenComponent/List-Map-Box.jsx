import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

mapboxgl.accessToken = `${import.meta.env.VITE_MAPBOX}`;

ListMapBox.propTypes = {
  data: PropTypes.array,
  hideMap: PropTypes.func,
};

function ListMapBox({ data = [], hideMap = null }) {
  console.log(data);
  const mapContainer = useRef(null);
  const map = useRef(null);
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [106, 21], // Center map around the first data item
      zoom: 10, // Adjust zoom level as needed
    });

    // Clear existing markers
    map.current?.markers?.forEach((marker) => marker.remove());
    map.current.markers = [];

    // Add markers for each data item
    data.forEach((item) => {
      console.log(item.latitude);

      const el = document.createElement("div");
      el.className = "marker";

      const popupHTML = `
          <div style="display:flex; align-items:start;">
            <div style="border-radius:6px; margin-right:8px; width:100%; height:60px;">
              <img src=${
                item.listImage && item.listImage[0]?.url
              } style="border-radius:6px; object-fit:cover; width:100%; height:100%;" alt=${
        item.name
      }/>
            </div>
            <div style="overflow:hidden;width: 200px; text-align:center;">
              <p style="font-size:14px; font-weight:600; margin-bottom:2px; overflow:hidden; text-overflow:ellipsis; line-clamp:1; -webkit-box-orient:vertical; display:-webkit-box ; -webkit-line-clamp:1;">${
                item.name
              }</p>
              <p style="font-size:12px; overflow:hidden; text-overflow:ellipsis; line-clamp:2; -webkit-box-orient:vertical; display:-webkit-box ; -webkit-line-clamp:2; line-height:1.3;">${
                item.location
              }</p>
            </div>
          </div>`;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML);
      if (!map.current) return; // wait for map to initialize
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: "center",
      })
        .setLngLat([item.longitude, item.latitude])
        .setPopup(popup)
        .addTo(map.current);

      map.current.markers.push(marker);
    });
    console.log(map.current);

    // Add controls if needed
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "top-left"
    );

    map.current.addControl(new mapboxgl.NavigationControl(), "top-left");
    map.current.addControl(new mapboxgl.FullscreenControl());

    return () => {
      map.current?.remove();
    };
  }, [data]);
  return createPortal(
    <div className="bg-[rgba(0,0,0,.8)] fixed inset-0 flex items-center justify-center z-[1000]">
      <div className="bg-[#eee] rounded-[6px] w-[90%] h-[90%] overflow-hidden relative">
        <div className="relative flex items-center justify-center h-[60px] border-b-[1px] border-b-[#111] text-center pl-1 pr-[6px] py-5">
          <h1 className="text-[24px] font-bold mb-[2px] text-center flex items-center gap-x-2">
            <FaMapMarkerAlt />
            Map
          </h1>

          <div
            onClick={hideMap}
            className="absolute top-[7px] right-3 cursor-pointer  w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgb(0,0,0,0.15)] flex items-center justify-center transition-all hover:shadow-[0_2px_8px_rgb(0,0,0,0.15),0_2px_8px_rgb(0,0,0,0.2)]"
          >
            <FaTimes className="m-0 text-[22px]" />
          </div>
        </div>
        <div
          className="relative overflow-hidden flex-1 rounded-[10px] mb-[6px] h-full "
          ref={mapContainer}
        />
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default ListMapBox;
