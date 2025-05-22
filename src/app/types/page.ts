export type SearchResult = {
  name: string;
  city: string;
  state: string;
  description: string;
  details_url: string;
  type: string;
  address: string;
  addressZ: string;
  zipcode: string;
  full_address: string;
  county: string;
  website: string;
  emial: string;
  business_hours: string;
  state_abbreviation: string;
  id: number;
};

export type ProfileProps = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dataOfBirth: string;
  hasDonated: string;
  address: string;
};

export type Image = {
  url: string;
};

export type donateCartProps = {
  name: string;
  images: Image[];
  shortDescription: string;
  image?: string;
  hits: string[];
};
