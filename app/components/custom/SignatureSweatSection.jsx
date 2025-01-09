import {NavLink} from '@remix-run/react';
import React from 'react';

const SignatureSweatSection = () => {
  return (
    <div className="w-full flex justify-center mb-20">
      <div className="w-[465px]">
        <img
          src="images/half-zip.jpg"
          alt="womens new in image"
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
