"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evita inconvenientes de hidratación.

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareUrl} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Copiado!",
            description: "Link copiado de forma satisfactoria!",
          });
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Compartir Link
      </Button>
    </div>
  );
};

export default FormLinkShare;
