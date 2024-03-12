import React from "react";
import LayoutUser from "../../../components/Layout/Layout-User";
import NearArea from "../components/Near-Area";
import ProminentPlace from "../components/Promient-Place";
import Purpose from "../components/Purpose";
import Slider from "../components/Slider";
import SuggestArea from "../components/Sugget-Area";

HomePage.propTypes = {};

function HomePage(props) {
  return (
    <LayoutUser>
      <Slider />
      <Purpose />
      <NearArea />
      <ProminentPlace />
      <SuggestArea />
    </LayoutUser>
  );
}

export default HomePage;
