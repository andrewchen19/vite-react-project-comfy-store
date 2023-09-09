import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";

const Layout = () => {
  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <>
      <Header />
      <Navbar />
      {/* align-element 為 custom class */}
      <section className="align-element py-20">
        {isLoading ? <Loading /> : <Outlet />}
      </section>
    </>
  );
};

export default Layout;
