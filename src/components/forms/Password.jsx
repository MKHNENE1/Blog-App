import { Input, Typography } from "@material-tailwind/react";
// import { Axios } from "axios";
// import axios from "axios";
import { useForm } from "react-hook-form";
import SignUP_SingIn from "../components/SignUP_SingIn";
import { useState } from "react";

export default function SignUP() {
  const [registerData, setregisterData] = useState();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(registerData);
    console.log(data);
    // Axios.post("https://api.escuelajs.co/api/v1/users", {
    //   ...data,
    //   avatar: "https://picsum.photos/800",
    // });
  };
  return (
    <>
      <SignUP_SingIn
        nameInput={
          <>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              {...register("name", {
                required: "this name requierd",
                pattern: {
                  value: /^[a-zA-Z'. -]{5,}$/,
                  message:
                    "Name must contain characters only and be at least 5 characters long.",
                },
              })}
              size="lg"
              placeholder="your name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <p className="text-red-600">{errors.name?.message}</p>
          </>
        }
        nameVaidation={handleSubmit(onSubmit)}
        setregisterData={setregisterData}
      />
    </>
  );
}
