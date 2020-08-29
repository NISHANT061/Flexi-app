import PropTypes from "prop-types";
import React, { useLayoutEffect, useState, useRef } from "react";
import { IdGenerator } from "../../utils/generateId";
import "./Flexi.scss";

function getVlineHeight(ref, count) {
  const dom = ref.current;
  let height = 0;
  if (dom) {
    const domDimensions = dom.getBoundingClientRect();
    const lastChildDimensions = dom.lastChild.getBoundingClientRect();
    console.log(domDimensions.height, lastChildDimensions.height / 2);
    height = domDimensions.height - lastChildDimensions.height;
  }
  return height;
}

const Flexi = ({ config, onSubmitHandler, children, isNested }) => {
  const childrenRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ person_name: "", state: "" });
  const childrenArray = React.Children.toArray(children);
  const editDataHandler = (field, value) => {
    const tempData = { ...data };
    tempData[field] = value;
    setData(tempData);
  };
  useLayoutEffect(() => {
    setLoading(false);
  }, []);
  return (
    <ul>
      <li>
        <div className="flexi-card">
          {config.items.map((item) =>
            item.type === "TextField" ? (
              <div key={`hcc-${IdGenerator()}`}>
                <div className="label">{item.label}</div>
                <div>
                  <input
                    className="input"
                    name={item.name}
                    type="text"
                    value={data.person_name}
                    placeholder="Please enter name"
                    onChange={(event) => {
                      editDataHandler(item.name, event.target.value);
                    }}
                  />
                </div>
              </div>
            ) : item.type === "DropDown" ? (
              <div className="dropDown-container" key={`hcc-${IdGenerator()}`}>
                <div className="label">{item.label}</div>
                <div>
                  <select
                    name={item.name}
                    value={data.state}
                    onChange={(event) => {
                      editDataHandler("state", event.target.value);
                    }}
                  >
                    {item.values.map((eachOption) => (
                      <option key={`option-${IdGenerator()}`}>
                        {eachOption}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : null
          )}
          <div>
            <button onClick={() => onSubmitHandler(data)}>Submit</button>
          </div>
        </div>
        {childrenArray.length > 0 && !loading ? (
          <>
            <div className="self-dot"></div>
            <div
              className="self-dot-vline"
              style={{
                height: getVlineHeight(childrenRef, childrenArray.length),
              }}
            ></div>
          </>
        ) : null}
        {isNested ? <div className="child-dot"></div> : null}
      </li>
      {childrenArray.length > 0 ? (
        <li className="child-li" ref={childrenRef}>
          {childrenArray.map((item) =>
            React.cloneElement(item, { isNested: true })
          )}
        </li>
      ) : null}
    </ul>
  );
};

Flexi.propTypes = {
  config: PropTypes.object.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default Flexi;
