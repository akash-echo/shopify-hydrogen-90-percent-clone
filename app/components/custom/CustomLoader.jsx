import React from 'react';
import {Loader} from 'lucide-react';

const CustomLoader = () => {
  return (
    <div className="flex items-center justify-center my-10">
      <Loader />
      <h1 className="text-center text-2xl ml-2">Loading...</h1>
    </div>
  );
};

export default CustomLoader;
