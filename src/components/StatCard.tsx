import { SyncRun } from "@/types/supaglue";
import { DateTime } from "luxon";

const emptySyncRun = {
  results: [
    {
      status: "ERROR",
      num_records_synced: 0,
      end_timestamp: new Date().toISOString(),
      start_timestamp: new Date().toISOString(),
      error_message: "",
      object_type: "",
      object: "",
    },
  ],
};

export default function StatCard({
  objectName,
  syncRun = emptySyncRun,
}: {
  objectName: string;
  syncRun?: { results: SyncRun[] };
}) {
  return (
    <div className="stat">
      <div className="stat-title">Last synced ({objectName})</div>
      <div className="stat-value">
        {syncRun.results[0].num_records_synced !== undefined
          ? syncRun.results[0].num_records_synced
          : syncRun.results[0].status}
      </div>
      <div className="stat-desc">
        records on{" "}
        {DateTime.fromISO(syncRun.results[0].end_timestamp).toLocaleString(
          DateTime.DATETIME_FULL
        )}
      </div>
    </div>
  );
}
