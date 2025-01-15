import React from 'react';
import {NavLink, useLoaderData} from '@remix-run/react';
import CustomLoader from './CustomLoader';

const ImageColumn = ({image, linkText, linkUrl}) => {
  return (
    <div className="relative w-[50%] h-[80vh] transition-all hover:opacity-[0.8]">
      <NavLink
        className={`w-full h-full text-[15px] py-2 block text-white uppercase underline font-mono`}
        prefetch="intent"
        to={linkUrl}
      >
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 underline tracking-wider underline-offset-8">
          {linkText}
        </span>
        <img
          src={image}
          alt="womens collection image"
          className="w-[100%] h-full rounded-none object-cover"
        />
      </NavLink>
    </div>
  );
};

const ImageDoubleColumn = () => {
  const {womensNewInImage, shopBestsellers} = useLoaderData();

  if (!womensNewInImage || !shopBestsellers) {
    return <CustomLoader />;
  }

  return (
    <div className="container flex mx-[80px] mb-24 gap-1">
      <ImageColumn
        image={womensNewInImage?.url}
        linkText="Shop New In"
        linkUrl="/collections/womens-new-in"
      />
      <ImageColumn
        image={shopBestsellers?.url}
        linkText="Shop Bestsellers"
        linkUrl="/collections/bestsellers"
      />
    </div>
  );
};

export default ImageDoubleColumn;
