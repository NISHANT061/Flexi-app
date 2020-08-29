import React, { useState } from "react";
import "./Flexi.scss";
import PropTypes from "prop-types";
import {IdGenerator} from "../../utils/generateId"

const Flexi = ({ config, onSubmitHandler, children }) => {
  const [data, setData] = useState({ person_name: "", state: "" });
  const childrenArray = React.Children.toArray(children);
  const editDataHandler = (field, value) => {
    const tempData = { ...data };
    tempData[field] = value;
    setData(tempData);
  };
  return (
    <ul>
      <li>
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
                    <option key={`option-${IdGenerator()}`}>{eachOption}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : null
        )}
        <div>
          <button onClick={() => onSubmitHandler(data)}>Submit</button>
        </div>
      </li>
      <li className="child-li">
      {childrenArray.length > 0 && childrenArray.map((item) => item)}
      </li>
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
