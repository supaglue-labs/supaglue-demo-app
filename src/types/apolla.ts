export type ApollaContact = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  phoneNumber: string | null;
  address: string | null;
  lifecycleStage: string | null;
};

export type ApollaAccount = {
  id: string;
  name: string | null;
  domain: string;
  lifecycleStage: string | null;
  industry: string | null;
};

export type PersonProspect = {
  name: string;
  title: string;
  location: string;
  email: string;
};

export type CompanyProspect = {
  name: string;
  industry: string;
  website: string;
  numOfEmployees: number;
  phone: string;
};
