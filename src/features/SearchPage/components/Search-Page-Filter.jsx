import React, { useEffect, useState } from "react";
import CustomLayoutFilter from "./CustomLayoutFilter";
import PropTypes from "prop-types";
import CustomFilterMobile from "./Custom-Filter-Mobile";
import areasApi from "../../../api/areasApi";
import kindsApi from "../../../api/kindsApi";
import conveniencesApi from "../../../api/conveniencesApi";
import purposesApi from "../../../api/purposesApi";
SearchPageFilter.propTypes = {
  onChange: PropTypes.func,
  show: PropTypes.bool,
  onShow: PropTypes.func,
  filters: PropTypes.object,
  listBlogs: PropTypes.array,
};
const LIMIT = 30;
function SearchPageFilter({
  onChange = null,
  show = false,
  onShow = null,
  filters = {},
  listBlogs = [],
}) {
  const [state, setState] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const areas = await areasApi.getAll({ limit: LIMIT });
        const purposes = await purposesApi.getAll({ limit: LIMIT });
        const kinds = await kindsApi.getAll({ limit: LIMIT });
        const conveniences = await conveniencesApi.getAll({ limit: LIMIT });
        const data = {
          areas,
          purposes,
          kinds,
          conveniences,
        };
        setState(data);
      } catch (error) {
        console.log("Error 💥", error.message);
      }
    })();
  }, []);

  const handleOnChange = (value) => {
    if (!onChange) return null;
    onChange(value);
  };

  return (
    <>
      <CustomLayoutFilter
        data={state}
        onChange={handleOnChange}
        filters={filters}
        listBlogs={listBlogs}
      />
      <CustomFilterMobile
        parentFilters={filters}
        data={state}
        onChange={handleOnChange}
        show={show}
        onShow={onShow}
      />
    </>
  );
}

export default SearchPageFilter;
