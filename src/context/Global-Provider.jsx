import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const GlobalContext = createContext();

GlobalProvider.propTypes = {};

function GlobalProvider(props) {
  const [hide, setHide] = useState(false);

  return (
    <GlobalContext.Provider
      {...props}
      value={[hide, setHide]}
    ></GlobalContext.Provider>
  );
}

function useHide(props) {
  const context = useContext(GlobalContext);
  if (typeof context === "undefined")
    throw new Error("useHide must be within a GlobalProvider");

  return context;
}
export { useHide, GlobalProvider };
