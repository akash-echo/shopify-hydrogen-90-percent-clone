// import {useShopQuery, gql} from '@shopify/hydrogen';

import {NavLink} from '@remix-run/react';

const HeroBanner = () => {
  // const {data} = useShopQuery({
  //   query: gql`
  //     query HeroBanner {
  //       collection(handle: "example-collection-handle") {
  //         image {
  //           url
  //           altText
  //         }
  //       }
  //     }
  //   `,
  // });

  // const heroImage = data.collection.image;

  return (
    <div className="hero-banner">
      <NavLink>
        <img
          // src={heroImage?.url}
          src="images/hero-banner-img.jpg"
          alt="Hero banner"
          className="w-full h-auto object-cover"
        />
      </NavLink>
    </div>
  );
};

export default HeroBanner;
