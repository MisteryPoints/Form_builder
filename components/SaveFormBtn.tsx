import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "./hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { Description } from "@radix-ui/react-toast";
import { toast } from "./ui/use-toast";
import { FaSpinner } from "react-icons/fa";

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Satisfactorio",
        description: "Tu formulario ha sido guardado",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Algo malo ha ocurrido",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSaveAs className="h-4 w-5" />
      Guardar
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
