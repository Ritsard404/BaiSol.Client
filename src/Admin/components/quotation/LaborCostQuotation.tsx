import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  getLaborCostQuote,
  LaborCost,
} from "../../../lib/API/Quote/QuotationAPI";
import { Button, Spinner } from "@nextui-org/react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { labor_columns } from "../../../lib/utils/QuotationTable";
import { formatNumber } from "../../../lib/utils/utils";

const LaborCostQuotation = () => {
  const { projId } = useParams<{ projId: string }>();
  const [description, setDescription] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [mtlQuantity, setMtlQuantity] = useState<number>(0);
  const [unitCost, setUnitCost] = useState<number>(0);
  const [unitNum, setUnitNum] = useState<number>(0);
  let itemNo = 1;

  const { data: laborCost, isLoading } = getLaborCostQuote(projId!);

  const totalLaborCost = [
    { label: "TOTAL", value: laborCost?.totalLaborCost.totalCost },
    { label: "Profit %", value: "30%" },
    { label: "PROFIT", value: laborCost?.totalLaborCost.profit },
    {
      label: "OVERALL PROJECT MGT COST",
      value: laborCost?.totalLaborCost.overallLaborProjectTotal,
    },
  ];

  const predefinedCategories = [
    "Manpower",
    "Project Manager - Electrical Engr.",
    "Mobilization/Demob",
    "Tools & Equipment",
  ];
  const lastCategory = "Other Incidental Costs";
  
  // Sort the items in one loop and find missing categories
  const sortedCosts = laborCost?.laborCost?.reduce(
    (acc, labor) => {
      const { description } = labor;
  
      // Check for the last category first
      if (description === lastCategory) {
        acc.last.push(labor);
      }
      // Then check for predefined categories
      else if (predefinedCategories.includes(description)) {
        acc.predefined.push(labor);
        acc.existingCategories.add(description);
      } 
      // Otherwise, categorize as new
      else {
        acc.new.push(labor);
      }
  
      return acc;
    },
    {
      predefined: [] as LaborCost[],
      new: [] as LaborCost[],
      last: [] as LaborCost[],
      existingCategories: new Set<string>(),
    }
  ) || { predefined: [], new: [], last: [], existingCategories: new Set<string>() };
  
  // Find missing predefined categories
  const missingCategories = [...predefinedCategories, lastCategory].filter(
    category => !sortedCosts.existingCategories.has(category)
  );

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4 bg-white h-full">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-orange-100">
          <div className="flex flex-row gap-10">
            <div className="w-full">
              <div className="flex w-full mb-4 justify-between items-end">
                <span className="tracking-wider font-semibold">Labor Cost</span>
                <Button
                  isLoading={isLoading}
                  className="bg-orange-500 text-background"
                  endContent={<FaPlus />}
                  size="sm"
                  // onClick={() => addOnOpen()}
                >
                  Add Labor Cost
                </Button>
              </div>
              <table className="w-full rounded-lg text-left text-gray-700">
                <thead className="text-sm text-gray-700 bg-gray-50">
                  <tr className="border-b border-gray-400">
                    {labor_columns.map((item) => (
                      <th scope="col" className="text-center px-4 py-3">
                        {item.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="text-center">
                        <div className="flex justify-center items-center h-64">
                          <Spinner color="warning" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {laborCost?.laborCost?.length ? (
                        sortedCosts.predefined
                          .concat(sortedCosts.new, sortedCosts.last)
                          .map((labor, index) => {
                            const currentItemNo = itemNo; // Store the current itemNo
                            itemNo++; // Increment itemNo

                            return (
                              <tr
                                key={labor.laborId}
                                className="border-b text-sm hover:bg-gray-100 px-4 py-1 font-medium text-gray-900 whitespace-nowrap"
                              >
                                <td className="border-b text-center hover:bg-gray-100 px-4 py-1 font-medium text-gray-900 whitespace-nowrap">
                                  {index + 1}
                                </td>
                                <td className="border-b hover:bg-gray-100 px-4 py-1 font-medium text-gray-900 whitespace-nowrap">
                                  {labor.description}
                                </td>
                                <td className="border-b text-center hover:bg-gray-100 px-4 py-1 font-medium text-gray-900 whitespace-nowrap">
                                  {labor.quantity}
                                </td>
                                <td className="border-b hover:bg-gray-100 px-4 py-1 font-medium text-gray-900 whitespace-nowrap">
                                  {labor.unit}
                                </td>
                                <td className="border-b hover:bg-gray-100 px-4 py-1 font-medium text-gray-900 whitespace-nowrap">
                                  ₱ {formatNumber(labor.unitCost)}
                                </td>
                                <td className="border-b text-center hover:bg-gray-100 px-4 py-1 font-medium text-gray-900 whitespace-nowrap">
                                  {labor.unitNum}
                                </td>
                                <td className="border-b hover:bg-gray-100 px-4 py-1 font-medium text-gray-900 whitespace-nowrap">
                                  ₱ {formatNumber(labor.totalCost)}
                                </td>
                                <td className="border-b hover:bg-gray-100 px-4 py-1 font-medium text-gray-900 whitespace-nowrap">
                                  <div className="flex flex-row justify-center">
                                    <Button
                                      variant="light"
                                      // onClick={() =>
                                      //   handleEditQuantityClick(
                                      //     material.quantity,
                                      //     material.mtlId,
                                      //     material.suppId,
                                      //     material.description
                                      //   )
                                      // }
                                    >
                                      <FaEdit
                                        size={20}
                                        className="text-primary-500"
                                      />
                                    </Button>

                                    <Button
                                      variant="light"
                                      // onClick={() =>
                                      //   handleDeleteItem(
                                      //     material.mtlId,
                                      //     material.suppId
                                      //   )
                                      // }
                                    >
                                      <FaTrashAlt
                                        size={20}
                                        className="text-danger-500"
                                      />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr>
                          <td
                            colSpan={labor_columns.length + 1}
                            className="text-center py-4 text-gray-500"
                          >
                            No data available
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                  {laborCost?.laborCost?.length
                    ? totalLaborCost.map((labor, index) => (
                        <tr className="bg-gray-200" key={index}>
                          <td
                            colSpan={6}
                            className="font-semibold text-sm text-end"
                          >
                            {labor.label}
                          </td>
                          <td
                            colSpan={1}
                            className="font-bold tracking-wide text-xs pl-3 text-start"
                          >
                            {typeof labor.value === "number"
                              ? `₱ ${formatNumber(labor.value)}`
                              : labor.value}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaborCostQuotation;
