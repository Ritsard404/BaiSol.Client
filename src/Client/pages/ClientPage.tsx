import React from "react";
import { RiArrowRightWideFill } from "react-icons/ri";
import ClientTable from "../../Admin/components/tables/ClientTable";

const ClientPage = () => {
  return (
    <div>
      <h1 className="flex items-center mb-4">
        Client
        <span className="mx-2 text-gray-400">
          <RiArrowRightWideFill />
        </span>
        Information
      </h1>
      <div className="container mx-auto mt-20 p-4 bg-white shadow-lg rounded-lg">
        {/* <ClientTable /> */}
        Dashboard
      </div>
    </div>
  );
};

export default ClientPage;
