import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import React from "react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";
import { StatsCard } from "../../page";

const FormDetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("Formulario no Encontrado");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="py-10 border-t border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate select-none">
            {form.name}
          </h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:gird-cols-4 container">
        <StatsCard
          title="Total de Visitas"
          icon={<LuView className="text-blue-600" />}
          helperText="Visitas del Formulario"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="Total de Aportes"
          icon={<FaWpforms className="text-yellow-600" />}
          helperText="Aportes del Formulario"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />
        <StatsCard
          title="Ratio de Aportes"
          icon={<HiCursorClick className="text-green-600" />}
          helperText="Visitas que resultan en Aportes del Formulario"
          value={visits.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />
        <StatsCard
          title="Ratio de Rebotes"
          icon={<TbArrowBounce className="text-red-600" />}
          helperText="Visitas que no interactuaron."
          value={visits.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>
      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
};

export default FormDetailPage;

function SubmissionsTable({ id }: { id: number }) {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Aportes</h1>
    </>
  );
}
