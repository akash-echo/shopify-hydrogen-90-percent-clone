import {NavLink, useLoaderData} from '@remix-run/react';
import CustomLoader from './CustomLoader';

const HeroBanner = () => {
  const {bannerImage} = useLoaderData();

  if (!bannerImage) {
    return <CustomLoader />;
  }

  return (
    <div className="hero-banner">
      <NavLink prefetch="intent" to="/collections/women-styles-all">
        {bannerImage ? (
          <img src={bannerImage?.url} alt="Homepage Banner" />
        ) : (
          <p>Banner image not found.</p>
        )}
      </NavLink>
    </div>
  );
};

export default HeroBanner;
