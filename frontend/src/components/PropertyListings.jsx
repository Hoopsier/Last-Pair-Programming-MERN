import PropertyListing from "./PropertyListing";

const PropertyListings = () => {
  return (
    <div className="rental-list">
      <PropertyListing
        property={{
          title: "Sample Property",
          type: "Apartment",
          price: 250000,
          location: { address: "123 Main St", city: "Helsinki", state: "Uusimaa" },
          squareFeet: 1200,
          yearBuilt: 2015,
          bedrooms: 3,
        }}
      />
    </div>
  );
};

export default PropertyListings;
