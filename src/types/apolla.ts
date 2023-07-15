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

export type LibraryPerson = {
  name: string;
  title: string;
  location: string;
  email: string;
};
