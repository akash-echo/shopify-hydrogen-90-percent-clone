import React from 'react';
import {NavLink, useLoaderData} from '@remix-run/react';

const ImageColumn = ({image, link}) => {
  return (
    <div className="relative w-[50%] h-[80vh] transition-all hover:opacity-[0.8]">
      <NavLink
        className={`w-full h-full text-[15px] py-2 block text-white uppercase underline font-mono`}
        end
        prefetch="intent"
        to="/"
      >
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 underline tracking-wider underline-offset-8">
          {link}
        </span>
        <img
          src={image}
          alt="womens collection image"
          className="w-[100%] h-full bg-cover rounded-none"
        />
      </NavLink>
    </div>
  );
};

const ImageDoubleColumn = () => {
  const {womensNewInImage, shopBestsellers} = useLoaderData();

  return (
    <div className="container flex mx-[80px] mb-24 gap-1">
      <ImageColumn image={womensNewInImage?.url} link="Shop New In" />
      <ImageColumn image={shopBestsellers?.url} link="Shop Bestsellers" />
    </div>
  );
};

export default ImageDoubleColumn;
