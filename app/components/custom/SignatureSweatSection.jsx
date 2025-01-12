import React from 'react';
import {NavLink, useLoaderData} from '@remix-run/react';

const SignatureSweatSection = () => {
  const {signatureSweat} = useLoaderData();

  return (
    <div className="w-full flex justify-center mb-20">
      <div className="w-[465px]">
        <img
          src={signatureSweat?.url}
          alt="womens signature sweat image"
          className="w-[100%] bg-cover"
        />

        <NavLink
          className={`text-[12px] py-2 block text-gray-500 uppercase font-mono underline tracking-wider`}
          end
          prefetch="intent"
          to="/"
        >
          SIGNATURE HALF ZIP SWEAT IN GREY
        </NavLink>
      </div>
    </div>
  );
};

export default SignatureSweatSection;
