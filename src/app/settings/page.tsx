import HubspotIcon from "@/assets/connector_icons/hubspot.png";
import MsDynamics365Sales from "@/assets/connector_icons/ms_dynamics_365_sales.png";
import OutreachIcon from "@/assets/connector_icons/outreach.png";
import PipedriveIcon from "@/assets/connector_icons/pipedrive.png";
import SalesforceIcon from "@/assets/connector_icons/salesforce.png";
import { Content } from "@/components/Content";
import IntegrationCard from "@/components/IntegrationCard";
import { Nav } from "@/components/Nav";
import { API_HOST, CUSTOMER_ID } from "@/lib/constants";

export default async function Settings() {
  const response = await fetch(
    `${API_HOST}/mgmt/v2/customers/${CUSTOMER_ID}/connections`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
      },
    }
  );

  const connections = await response.json();

  return (
    <>
      <Nav title="Settings" />
      <Content>
        <div className="grid grid-cols-3 gap-4">
          <IntegrationCard
            name="Salesforce"
            category="CRM"
            description="Find ideal prospects, enrich your records, clean up stale contacts, and bi-directionally sync all activities."
            icon={SalesforceIcon}
            link="/settings/salesforce"
          ></IntegrationCard>
          <IntegrationCard
            name="Hubspot"
            category="CRM"
            description="Our bi-directional sync and database of 200M+ business contacts makes Hubspot great at outbound & inbound."
            icon={HubspotIcon}
            link="/settings/hubspot"
          ></IntegrationCard>
          <IntegrationCard
            name="Pipedrive"
            category="CRM"
            description="...."
            icon={PipedriveIcon}
            link="/settings/pipedrive"
          ></IntegrationCard>
          <IntegrationCard
            name="MS Dynamics 365 Sales"
            category="CRM"
            description="...."
            icon={MsDynamics365Sales}
            link="/settings/ms_dynamics_365_sales"
          ></IntegrationCard>
          <IntegrationCard
            name="Outreach"
            category="Sales"
            description="Deploy Apollo prospects directly to an Outreach sequence."
            icon={OutreachIcon}
            link="/settings/outreach"
          ></IntegrationCard>
        </div>
      </Content>
    </>
  );
}
