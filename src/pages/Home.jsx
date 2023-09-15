import { Hero, FeaturedProducts } from "../components";
// custom axios
import { customFetch } from "../utilize";

const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  // 有 <SingleError> 來處理錯誤
  // 這邊不用加上 try catch statement
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
