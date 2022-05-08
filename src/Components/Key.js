import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
const Key = ({ keyVal, bigKey,disabled }) => {
  const {
    onEnter,
    onDelete,
    onSelectLetter,
  } = useContext(AppContext);
  const selectKey = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <div className="key" id={bigKey ? "big": disabled&&"disabled"} onClick={selectKey}>
      {keyVal}
    </div>
  );
};

export default Key;
