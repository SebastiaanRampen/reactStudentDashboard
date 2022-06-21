import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { modifyNameArray } from "../../Redux/EvaluationDataset";

export default function AddNameLegend() {
  const getNameArray = useSelector(
    (state) => state.evaluationDataset.nameArray
  );
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(modifyNameArray(id));
  };

  function addItem(itemName) {
    let buttonLabel;
    itemName.selected ? (buttonLabel = "X") : (buttonLabel = "");

    return (
      <div className="col s6 m4 l3" key={itemName.id}>
        <label>
          <input
            type="checkbox"
            checked={itemName.selected}
            onChange={() => handleClick(itemName.id)}
          />
          <span className="nameSpan">{itemName.name}</span>
        </label>
        <span
          href="#"
          className={`btn ${itemName.indexColor.description}`}
          style={{
            height: "20px",
            width: "20px",
          }}
          onClick={() => handleClick(itemName.id)}
          btn-value={buttonLabel}
        />
      </div>
    );
  }

  return (
    <div className="row" id="names">
      {getNameArray.map((name) => addItem(name))}
    </div>
  );
}
