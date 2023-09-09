import React from "react";

const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4 items-center justify-center sm:gap-x-6">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          We love
        </h1>
        <div className="stats shadow bg-secondary-focus">
          <div className="stat">
            <div className="stat-title text-4xl text-neutral tracking-wider">
              Comfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-3xl mx-auto">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
        repellendus iusto nesciunt cupiditate, repudiandae quia quos quaerat
        assumenda minus facilis consequuntur mollitia culpa, odio placeat ex
        iure. Eius debitis tempora possimus nulla, harum consequuntur? Dolorem,
        commodi. Dignissimos natus iure eligendi.
      </p>
    </>
  );
};

export default About;
