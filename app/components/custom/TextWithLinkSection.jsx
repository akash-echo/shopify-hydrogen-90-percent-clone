import {NavLink} from '@remix-run/react';
import React from 'react';

const TextWithLinkSection = ({text, linkName, linkUrl}) => {
  const baseClassName =
    'text-[#2b2725] font-medium tracking-[0.52px] transition-all duration-200 relative after:content-[""] after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-[#2b2725] after:transition-all after:duration-300 after:w-full';

  return (
    <div className="w-full flex flex-col items-center justify-center my-20">
      <h1 className="text-[26px] w-[48%] text-center mb-14">{text}</h1>

      <NavLink
        className={`${baseClassName} text-[15px] py-2 block text-[#2b2725] uppercase font-mono`}
        prefetch="intent"
        to={linkUrl}
      >
        {linkName}
      </NavLink>
    </div>
  );
};

export default TextWithLinkSection;
