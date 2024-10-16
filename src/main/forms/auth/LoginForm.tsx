import { useMemo, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../lib/API/AuthAPI";
import { ProjectDescriptionSystemType } from "../../../lib/constants/ProjectCostEstimations";
import { Check } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();
  const [validUser, setValidUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;
    return !validateEmail(email);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { email, password };

    loginMutation.mutateAsync(formData, {
      onSuccess: (res) => {
        if (res.flag && res.isDefaultAdmin) {
          setIsAdmin(true);
        } else {
          setValidUser(true);
        }
      },
    });
  };

  if (validUser) {
    navigate("/verify-2FA", { state: { email } });
  }

  if (isAdmin) {
    navigate("/");
  }

  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      <div className="max-w-md p-12 m-8 bg-gray-200 rounded-md text-black w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-3 text-[#1e0e4b] text-center">
          Welcome back to <span className="text-orange-500">BaiSol</span>
        </h2>
        <p className="text-sm font-normal mb-6 text-center text-[#1e0e4b]">
          Log in to your account
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            endContent={
              <div className="flex items-center h-full">
                <MdEmail color="#666666" size={20} />
              </div>
            }
            isRequired
            value={email}
            type="email"
            label="Email"
            variant="flat"
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "default"}
            errorMessage={isInvalid ? "Please enter a valid email" : "Email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type={showPassword ? "text" : "password"}
            variant="flat"
            endContent={
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center h-full cursor-pointer"
              >
                {showPassword ? (
                  <FaEye color="#666666" size={20} />
                ) : (
                  <FaEyeSlash color="#666666" size={20} />
                )}
              </div>
            }
            isRequired
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            errorMessage={"Your password entered is incorrect"}
          />
          <div className="flex flex-col gap-2 pb-4">
            <NavLink
              className="text-sm text-orange-300 hover:text-orange-500"
              to="/forgot-password"
            >
              Forgot your password?
            </NavLink>
            <span className="text-sm text-[#1e0e4b]">
              Don't have an account?
              <NavLink
                className="text-sm text-orange-300 hover:text-orange-500"
                to="/register-client"
              >
                {" "}
                Register now
              </NavLink>
            </span>
          </div>
          <Button
            isDisabled={email === "" || password === ""}
            isLoading={loginMutation.isPending}
            type="submit"
            className="bg-orange-400 m-auto text-white rounded-lg py-2 px-3 hover:bg-gray-200 hover:text-orange-500 transition duration-300 ease-in"
          >
            {loginMutation.isPending ? "Loading..." : "Sign in"}
          </Button>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 mx-auto">
        <h4 className="font-semibold text-orange-500 tracking-wide mb-2">
          Choose the Right Plan for You
        </h4>
        <h1 className="text-lg lg:text-2xl text-center font-bold mb-6 tracking-wider">
          Project Cost Estimations
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full px-2 gap-3">
          {ProjectDescriptionSystemType.map((system, index) => (
            <div
              key={index}
              className="bg-white p-6 border rounded-lg shadow-md hover:scale-105 transition-transform duration-300 max-w-lg"
            >
              <p className="text-xl lg:text-lg font-bold text-orange-500 mb-2 text-center">
                {system.type}
              </p>
              {system.options.map((option, i) => (
                <div key={i} className="py-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center space-x-1">
                      <Check className="text-green-600" />
                      <p className="text-lg lg:text-md font-bold tracking-wider">
                        {option.kWCapacity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-500 text-right">
                      ₱{option.cost}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
