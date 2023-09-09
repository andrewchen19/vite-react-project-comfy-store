import { NavLink } from "react-router-dom";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <div className="grid gap-24 items-center lg:grid-cols-2 ">
      {/* info */}
      <div>
        <h1 className="max-w-2xl text-4xl uppercase font-bold tracking-normal sm:text-5xl lg:text-6xl">
          we are changing the way people shop
        </h1>
        <p className="max-w-xl mt-6 leading-6 text-sm sm:text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius vitae
          quis laudantium! Ut officia odit, tempora ad non illo nemo atque
          ratione consequuntur!
        </p>
        <div className=" mt-10">
          <NavLink to="/products" className="btn btn-primary">
            Our Products
          </NavLink>
        </div>
      </div>
      {/* carousel */}
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {carouselImages.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="rounded-box h-full w-80 object-cover object-center"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
