import React from "react";
import avatar from "../../assets/Johnny.jpg";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ProjectDetails, exampleProject } from "./clientinfo";

const ClientPage: React.FC<{ project: ProjectDetails }> = ({
  project = exampleProject,
}) => {
  const isOnline = true;
  const paymentProgress = 60; // Payment completion percentage
  const projectProgress = 60; // Project completion percentage

  return (
    <div className="flex flex-col items-center px-4 py-10 sm:px-12 sm:py-16">
      <div className="p-6 border border-gray-300 shadow-lg rounded-lg w-full max-w-3xl">
        {/* Profile and Project Details */}
        <div className="flex flex-col md:flex-row items-start md:space-x-8">
          {/* Left Section: Profile */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <img
              src={avatar}
              alt={`${project.clientFName} ${project.clientLName}`}
              className="w-32 h-32 rounded-full mb-4 border-4 border-gray-300"
            />
            <div className="text-gray-700 text-center md:text-left">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold">
                  {project.clientFName}
                  {project.clientLName}
                </h2>
                <span
                  className={`w-3 h-3 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                  title={isOnline ? "Online" : "Offline"}
                ></span>
              </div>
              <h5 className="text-md font-semibold">{`${project.clientFName}@gmail.com`}</h5>
            </div>
          </div>

          {/* Center Section: Project Details */}
          <div className="border-l-2 border-gray-300 hidden md:block h-32 mx-4"></div>
          <div className="flex flex-col items-center md:items-start space-y-3 text-center md:text-left">
            <h1 className="text-gray-700 font-extrabold">
              {project.projDescript}
            </h1>
            <h1 className="text-gray-700 font-bold">{project.clientAddress}</h1>
            <h1 className="text-gray-700">{project.systemType}</h1>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs font-medium text-gray-500">
                Last Active:
              </span>
              <span
                className={`text-sm font-semibold ${
                  isOnline ? "text-green-600" : "text-red-600"
                }`}
              >
                {isOnline ? "Online Now" : "Offline - 2 hours ago"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Progress Indicators */}
        <div className="flex flex-col sm:flex-row justify-around items-center mt-8">
          {/* Payment Progress */}
          <div className="flex flex-col items-center">
            <h1 className="text-gray-700 font-semibold text-lg">
              Payment Progress
            </h1>
            <div className="w-24 h-24 mt-4">
              <CircularProgressbar
                value={paymentProgress}
                text={`${paymentProgress}%`}
                styles={buildStyles({
                  textColor: "#333",
                  pathColor: "#38bdf8",
                  trailColor: "#e2e8f0",
                })}
              />
            </div>
          </div>

          {/* Project Progress */}
          <div className="flex flex-col items-center">
            <h1 className="text-gray-700 font-semibold text-lg">
              Project Progress
            </h1>
            <div className="w-24 h-24 mt-4">
              <CircularProgressbar
                value={projectProgress}
                text={`${projectProgress}%`}
                styles={buildStyles({
                  textColor: "#333",
                  pathColor: "#FFA500",
                  trailColor: "#e2e8f0",
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
