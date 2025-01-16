import React from 'react';
import {useLoaderData} from '@remix-run/react';
import CustomLoader from './CustomLoader';

const ManufactureVideoSection = () => {
  const {manufactureSection} = useLoaderData();
  const {url, mimeType} = manufactureSection?.sources[2]; // Resolution - 720px - 2nd index

  if (!manufactureSection) {
    return <CustomLoader />;
  }

  return (
    <video autoPlay loop muted className="w-full">
      <source src={url} type={mimeType} />
    </video>
  );
};

export default ManufactureVideoSection;
