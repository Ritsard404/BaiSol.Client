import { useQuery } from "@tanstack/react-query";
import { api } from "../AuthAPI";

export interface IProjectDateInto {
  startDate: string;
  estimatedStartDate: string;
  estimatedEndDate: string;
  assignedFacilitator: string;
}

export const getProjectDateInto = (projId: string) => {
  return useQuery<IProjectDateInto, Error>({
    queryKey: ["ProjectDateInto", projId],
    queryFn: async () => {
      const response = await api.get("api/Gantt/ProjectDateInfo", {
        params: {
          projId: projId,
        },
      });
      return response.data;
    },
  });
};

interface IProjectProgress {
  progress: number;
}

export const getProjectProgress = (projId: string) => {
  return useQuery<IProjectProgress, Error>({
    queryKey: ["ProjectProgress", projId],
    queryFn: async () => {
      const response = await api.get("api/Gantt/ProjectProgress", {
        params: {
          projId: projId,
        },
      });
      return response.data;
    },
  });
};
