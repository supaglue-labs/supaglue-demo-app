"use client";

import { useCustomerContext } from "@/hooks/useCustomerContext";
import { getEmbeddedLink } from "@/lib/embedded_link";
import { STAGING_MS_DYNAMICS_365_SALES_SCOPE } from "@/lib/env";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { Connection } from "@/types/supaglue";
import { ReactNode, useState } from "react";
import useSWRMutation from "swr/mutation";

function OauthButton({
  className = "btn-primary",
  embeddedLink,
  children,
}: {
  className?: string;
  embeddedLink: string;
  children: ReactNode;
}) {
  return (
    <a href={embeddedLink} target="_blank" rel="noopener noreferrer">
      <button className={`btn ${className}`}>{children}</button>
    </a>
  );
}

function DisconnectButton({
  providerName,
  connectionId,
  children,
}: {
  providerName: string;
  connectionId: string;
  children: ReactNode;
}) {
  const activeCustomer = useCustomerContext();

  const { trigger, error, data } = useSWRMutation(
    `/api/disconnect-provider`,
    async (url, { arg }: { arg: any }) => {
      return await fetch(url, {
        method: "POST",
        headers: getHeadersWithCustomerProvider(
          activeCustomer.id,
          providerName
        ),
        body: JSON.stringify(arg),
      });
    }
  );

  return (
    <button
      className="btn btn-error"
      onClick={() => {
        trigger({
          connectionId,
          customerId: activeCustomer.id,
        });
      }}
    >
      {children}
    </button>
  );
}

function MsDynamics365SalesButton() {}

export function ConnectPanel({
  customerId,
  activeConnection,
  providerName,
}: {
  customerId: string;
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
  const embeddedLink = getEmbeddedLink(customerId, providerName, scope);

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
            <OauthButton embeddedLink={embeddedLink} className="btn-neutral">
              Reconnect
            </OauthButton>
          ) : (
            <OauthButton embeddedLink={embeddedLink}>Connect</OauthButton>
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
    <div className="flex gap-4">
      <OauthButton embeddedLink={embeddedLink} className="btn-neutral">
        Reconnect
      </OauthButton>
      <DisconnectButton
        providerName={providerName}
        connectionId={activeConnection.id}
      >
        Disconnect
      </DisconnectButton>
    </div>
  ) : (
    <OauthButton embeddedLink={embeddedLink}>Connect</OauthButton>
  );
}
