import { FormInput, SubmitBtn } from "../components";
import { Form, NavLink, redirect } from "react-router-dom";

import { customFetch } from "../utilize";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData);
  // console.log(formObject);

  try {
    const response = await customFetch.post("/auth/local/register", formObject);
    // console.log(response);
    toast.success("Account created successfully");
    // 記得最後一定要 return
    return redirect("/login");
  } catch (error) {
    // console.log(error);
    const errorMessage =
      error?.response?.data?.error?.message ||
      "Please double check your identification";
    toast.error(errorMessage, {
      icon: "😵",
    });
    // 記得最後一定要 return
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-xl flex flex-col gap-y-4"
      >
        <h4 className="text-center text-4xl font-bold capitalize">register</h4>
        <FormInput label="username" type="text" name="username" />
        <FormInput label="email" type="email" name="email" />
        <FormInput label="password" type="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center">
          Already a member?
          <NavLink to="/login" className="ml-2 link link-error capitalize">
            login
          </NavLink>
        </p>
      </Form>
    </section>
  );
};

export default Register;
