"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement } from "./FormElements";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Campo de Texto",
      helperText: "Texto de Apoyo",
      required: false,
      placeHolder: "Agregar algo aquí..",
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Campo de Texto",
  },
  designerComponent: () => <div>Designer component</div>,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>,
};
