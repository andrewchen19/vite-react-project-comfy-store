import { NavLink, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  // console.error(error);

  // page not found
  if (error.status === 404) {
    return (
      <main className="w-screen h-screen flex justify-center items-center px-8">
        <div className="text-center">
          <p className="text-7xl font-semibold text-error ">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            page not found
          </h1>
          <p className="mt-3 text-lg leading-8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10">
            <NavLink to="/" className="btn btn-sm btn-outline btn-error">
              back home
            </NavLink>
          </div>
        </div>
      </main>
    );
  }

  // other errors
  return (
    <main className="w-screen h-screen flex justify-center items-center px-8">
      <h4 className="text-center font-bold text-4xl">There was an error ...</h4>
    </main>
  );
};

export default Error;
