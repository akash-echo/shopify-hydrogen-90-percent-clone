import React from 'react';
import HeroBanner from './HeroBanner';
import ImageDoubleColumn from './ImageDoubleColumn';
import SignatureSweatSection from './SignatureSweatSection';
import ManufactureVideoSection from './ManufactureVideoSection';
import TextWithLinkSection from './TextWithLinkSection';

const MainContent = () => {
  return (
    <div className="main-content" id="mainContent">
      {/* Hero banner */}
      <HeroBanner />

      {/* <ShopAllSection */}
      <TextWithLinkSection
        text="Everyday pieces with a twist. Made with care for people and the planet."
        linkName="Shop All"
        linkUrl="/"
      />

      <ImageDoubleColumn />

      <SignatureSweatSection />

      {/* <ShopTheEssential */}
      <TextWithLinkSection
        text="Our Essentials form a well-curated dress code of layering foundations. Trans-seasonal, considered and carefully crafted pieces in elevated, responsible materials."
        linkName="Shop The Essentials"
        linkUrl="/"
      />

      <ManufactureVideoSection />

      {/* <OurWaySection */}
      <TextWithLinkSection
        text="Each purchase you make helps us share 90% of our profits between our people and the causes we believe in. We’re cultivating a positive culture beyond our clothing, pioneering a new business ethos rooted in consciousness."
        linkName="Our Way"
        linkUrl="/"
      />
    </div>
  );
};

export default MainContent;
