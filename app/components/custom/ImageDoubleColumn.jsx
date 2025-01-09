import {NavLink} from '@remix-run/react';
import React from 'react';

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
          alt="womens new in image"
          className="w-[100%] h-full bg-cover rounded-none"
        />
      </NavLink>
    </div>
  );
};

const ImageDoubleColumn = () => {
  return (
    <div className="container flex mx-[80px] mb-24 gap-1">
      <ImageColumn image="images/womens-new-in.jpg" link="Shop New In" />
      <ImageColumn image="images/bestsellers.jpg" link="Shop Bestsellers" />
    </div>
  );
};

export default ImageDoubleColumn;
