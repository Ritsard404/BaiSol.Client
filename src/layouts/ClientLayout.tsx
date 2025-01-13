import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { validateToken } from "../lib/API/TokenValidation";
import Cookies from "js-cookie";
import { setUser } from "../state/authSlice";
import Sidebar from "./shared/Sidebar/Sidebar";
import Header from "./shared/Header/Header";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getClientSidebarLinks } from "../lib/constants/SidebarLinks";
import { getClientProjId } from "../lib/API/Client/ClientProjectAPI";
import Loader from "../main/components/Loader";
import { Button } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";

const ClientLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: clientProjId, isLoading } = getClientProjId();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [idLink, setIdLink] = useState<string>("");
  const [activeProjId, setActiveProjId] = useState<string>("");

  const sidebarLinks = getClientSidebarLinks(idLink);

  const handleSetLink = (id: string) => {
    setIdLink(id);
    setActiveProjId(id); // Set the clicked button as active
    navigate(`/${id}`);
  };

  useEffect(() => {
    if (clientProjId && clientProjId.length > 0) {
      const firstProjId = clientProjId[0].projId;
      setActiveProjId(firstProjId); // Set the first button as active
      setIdLink(firstProjId);
      navigate(`/${firstProjId}`); // Navigate to the first project ID's URL
    }
  }, [clientProjId]);

  useEffect(() => {
    const validateAndSetUser = async () => {
      const isValidToken = await validateToken();
      if (isValidToken) {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) return;

        const decoded: any = jwtDecode(accessToken);
        const user = {
          userId:
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
          email:
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
          userName:
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
          userRole:
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
        };
        dispatch(setUser(user));
      } else {
        navigate("/");
      }
    };
    validateAndSetUser();
  }, [dispatch, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        links={sidebarLinks}
        isOpen={isSidebarOpen}
        setOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex overflow-x-hidden scrollbar-hide scrollbar-track-white scrollbar-thumb-orange-100 flex-col mx-auto h-full">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 p-5">
          {clientProjId != null &&
            clientProjId.map((id, index) => (
              <Button
                key={id.projId}
                className={`w-28 font-semibold text-sm md:w-36 lg:w-48 text-white md:text-lg ${
                  activeProjId === id.projId ? "bg-orange-300" : "bg-orange-400"
                }`}
                onClick={() => handleSetLink(id.projId)}
              >
                Project {index}
              </Button>
            ))}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
