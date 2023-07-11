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

export type Connection = {
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
