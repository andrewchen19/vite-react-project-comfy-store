import { Hero, FeaturedProducts } from "../components";
// custom axios
import { customFetch } from "../utilize";

const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  // console.log(response);
  const products = response.data.data;

  // 記得最後一定要 return
  return { products };
};

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Home;
