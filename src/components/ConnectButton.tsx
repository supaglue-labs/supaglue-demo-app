"use client";

import {
  STAGING_MS_DYNAMICS_365_SALES_SCOPE,
  getEmbeddLink,
} from "@/lib/constants";
import { Connection } from "@/types/supaglue";
import { ReactNode, useState } from "react";

function ConnectButton({
  embeddedLink,
  children,
}: {
  embeddedLink: string;
  children: ReactNode;
}) {
  return (
    <a href={embeddedLink} target="_blank" rel="noopener noreferrer">
      <button className="btn btn-primary">{children}</button>
    </a>
  );
}

function MsDynamics365SalesButton() {}

export function ConnectPane({
  activeConnection,
  providerName,
}: {
  activeConnection?: Connection;
  providerName: string;
}) {
  const isMsDynamics365Sales = providerName === "ms_dynamics_365_sales";
  const [scope, setScope] = useState(
    isMsDynamics365Sales ? STAGING_MS_DYNAMICS_365_SALES_SCOPE : undefined
  );

  /**
   * Generate embedded link for customer to trigger OAuth flow
   */
  const embeddedLink = getEmbeddLink(providerName, scope);

  if (isMsDynamics365Sales) {
    {
      /* Ms Dynamics 365 Sales requires a `scope` param in its OAuth requests. 
      Ask for users to provide it before triggering its OAuth flow. */
    }
    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold">
            Dynamics 365 for Sales URL:
          </span>
        </label>
        <div className="w-full flex">
          <input
            type="text"
            value={scope}
            onChange={(event) => setScope(event.target.value)}
            className="input input-bordered w-full"
          />
          {activeConnection ? (
            <ConnectButton embeddedLink={embeddedLink}>Reconnect</ConnectButton>
          ) : (
            <ConnectButton embeddedLink={embeddedLink}>Connect</ConnectButton>
          )}
        </div>
        <label className="label">
          <span className="label-text-alt">
            (
            <a
              className="text-accent underline"
              href="https://learn.microsoft.com/en-us/dynamics-nav/how-to-set-up-a-dynamics-crm-connection"
            >
              Need help finding the URL?
            </a>
            )
          </span>
        </label>
      </div>
    );
  }

  return activeConnection ? (
    <ConnectButton embeddedLink={embeddedLink}>Reconnect</ConnectButton>
  ) : (
    <ConnectButton embeddedLink={embeddedLink}>Connect</ConnectButton>
  );
}
