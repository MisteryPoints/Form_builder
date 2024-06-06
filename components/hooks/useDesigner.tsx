import React, { useContext } from "react";
import { DesignerContext } from "../context/DesignerContext";

const useDesigner = () => {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("'useDesigner' debe ser usado con un 'DesignerContext'");
  }
  return context;
};

export default useDesigner;
