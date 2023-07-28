export type CrmContact = {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumbers: any[];
  addresses: any[];
  lastActivityAt: Date | null;
  lifecycleStage: string | null;
  rawData?: any;
};

export type CrmAccount = {
  id: string;
  name: string;
  website: string;
  industry: string;
  phoneNumbers: any[];
  rawData?: any;
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
