import { API_HOST } from "@/lib/env";
import { fetcher } from "@/lib/fetcher";
import { getHeaders } from "@/lib/headers";
import { SyncRun } from "@/types/supaglue";

/**
 * Use Supaglue's Management API to fetch information about sync runs from your customer's third-party provider to your Postgres.
 * This can be used to show when the last sync was run, if there were any errors, and the number of records synced.
 * https://docs.supaglue.com/api/v2/mgmt/sync-runs
 */
export async function fetchSyncRuns(objectType: string, objectNames: string[]) {
  const syncRuns = await Promise.all(
    objectNames.map(
      async (objectName: string) =>
        await fetcher<{
          results: SyncRun[];
        }>(
          `${API_HOST}/mgmt/v2/sync-runs?object=${objectName}&object_type=${objectType}&page_size=1`,
          {
            headers: getHeaders(),
          }
        )
    )
  );

  return syncRuns;
}
