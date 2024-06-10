import React, { startTransition, useTransition } from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { FaIcons } from "react-icons/fa";
import { toast } from "./ui/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

const PublishFormBtn = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Satisfactorio",
        description: "Tu formulario ahora está disponible al público!",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Algo malo ha ocurrido",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-4 w-4" />
          Publicar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser deshecha, luego de ser publicado, no podrás
            editar este formulario.
            <br /> <br />
            <span className="font-medium">
              Publicando este formulario, hará que esté disponible para los
              demás y podrás recolectar visitas o aportes.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceder {loading && <FaIcons className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;
