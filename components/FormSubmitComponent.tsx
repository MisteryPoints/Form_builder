"use client";

import React, { useCallback, useRef, useState } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "./ui/use-toast";

const FormSubmitComponent = ({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const validateForm = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Favor validar, Formulario posee errores.",
        variant: "destructive",
      });
      return;
    }
    console.log("FORM VALUES", formValues.current);
  };

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            submitForm();
          }}
        >
          <HiCursorClick className="mr-2" /> Enviar{" "}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
