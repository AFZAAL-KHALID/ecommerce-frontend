import React from "react";

const Footer = () => {
  return (
    <div className="border-t-2 border-[#8080801e]">
      <div className=" flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="imageDIV">
          <img
            src="/Assests/Images/LOGO.png"
            className="mb-5 w-32"
            alt="logo"
          />
          <p className="w-full md:2/3 text-gray-600">
            amet dolores non voluptates quod necessitatibus ullam nobis nemo
            fuga optio commodi pariatur? Assumenda earum tempore nihil sapiente
            enim laborum officiis?
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Prevacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul>
            <li>+92 3475447877</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
