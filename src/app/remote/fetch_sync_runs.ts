import { API_HOST } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { getHeaders } from "../api/helper";
import { SyncRun } from "../types";

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
