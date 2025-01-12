import {NavLink, useLoaderData} from '@remix-run/react';

const HeroBanner = () => {
  const {bannerImage} = useLoaderData();

  if (!bannerImage) {
    return <div>Loading banner...</div>;
  }

  return (
    <div className="hero-banner">
      <NavLink>
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
