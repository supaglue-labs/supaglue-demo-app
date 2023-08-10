export type Property = {
  id: string;
  label: string;
};

export type FieldMapping = {
  name: string;
  is_added_by_customer: string;
  schema_mapped_name?: string;
  customer_mapped_name?: string;
};

export type ObjectFieldMapping = {
  object_name: string;
  object_type: string;
  allow_additional_field_mappings: boolean;
  schema_id: string;
  fields: FieldMapping[];
};

export type EntityMappingFieldMapping = {
  entity_field: string;
  mapped_field: string;
  from: "developer" | "customer";
  is_additional: boolean;
};

export type EntityMapping = {
  entity_id: string;
  entity_name: string;
  object?: {
    name: string;
  };
  allow_additional_field_mappings: boolean;
  field_mappings: EntityMappingFieldMapping[];
};

export type Connection = {
  id: string;
  provider_name: string;
};

export type SyncRun = {
  error_message: string;
  start_timestamp: string;
  end_timestamp: string;
  status: string;
  num_records_synced: number;
  object_type: string;
  object: string;
};
