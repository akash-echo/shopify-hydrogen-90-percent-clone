import React from 'react';
import {NavLink, useLoaderData} from '@remix-run/react';
import CustomLoader from './CustomLoader';

const SignatureSweatSection = () => {
  const {signatureSweat} = useLoaderData();

  if (!signatureSweat) {
    return <CustomLoader />;
  }

  return (
    <div className="w-full flex justify-center mb-20">
      <div className="w-[465px]">
        <img
          src={signatureSweat?.url}
          alt="womens signature sweat image"
          className="w-[100%] h-[580px] rounded-none object-cover"
        />

        <NavLink
          className={`text-[12px] py-2 block text-gray-500 uppercase font-mono underline tracking-wider`}
          end
          prefetch="intent"
          to="/products/signature-half-zip-sweat-in-grey-marl-essential24"
        >
          SIGNATURE HALF ZIP SWEAT IN GREY
        </NavLink>
      </div>
    </div>
  );
};

export default SignatureSweatSection;
