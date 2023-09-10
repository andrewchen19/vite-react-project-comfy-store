import { useRouteError } from "react-router-dom";

const SingleError = () => {
  const error = useRouteError();
  console.log(error);

  return <h4 className="font-bold text-4xl">There war an error...</h4>;
};

export default SingleError;
