import ActiveCampaignIcon from "@/assets/connector_icons/activecampaign.png";
import ApolloIcon from "@/assets/connector_icons/apollo.webp";
import CloseIcon from "@/assets/connector_icons/close.png";
import CopperIcon from "@/assets/connector_icons/copper.png";
import GongIcon from "@/assets/connector_icons/gong.webp";
import HubspotIcon from "@/assets/connector_icons/hubspot.png";
import InsightlyIcon from "@/assets/connector_icons/insightly.png";
import KeapIcon from "@/assets/connector_icons/keap.png";
import MsDynamics365Sales from "@/assets/connector_icons/ms_dynamics_365_sales.png";
import NutshellIcon from "@/assets/connector_icons/nutshell.webp";
import OutreachIcon from "@/assets/connector_icons/outreach.png";
import PipedriveIcon from "@/assets/connector_icons/pipedrive.png";
import PipelinerIcon from "@/assets/connector_icons/pipeliner.png";
import SalesflareIcon from "@/assets/connector_icons/salesflare.png";
import SalesforceIcon from "@/assets/connector_icons/salesforce.png";
import SugarCrmIcon from "@/assets/connector_icons/sugarcrm.png";
import TeamleaderIcon from "@/assets/connector_icons/teamleader.jpeg";
import ZendeskSellIcon from "@/assets/connector_icons/zendesk_sell.png";
import ZohoCrmIcon from "@/assets/connector_icons/zoho_crm.png";
import { Content } from "@/components/Content";
import IntegrationCard from "@/components/integrations/IntegrationCard";
import { Nav } from "@/components/Nav";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { API_HOST } from "@/lib/env";

export default async function Integrations() {
  const activeCustomer = useCustomerContext();
  const response = await fetch(
    `${API_HOST}/mgmt/v2/customers/${activeCustomer.id}/connections`,
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
      <Nav title="Integrations" />
      <Content>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <IntegrationCard
            name="Salesforce"
            category="CRM"
            description="Find ideal prospects, enrich your records, clean up stale contacts, and bi-directionally sync all activities."
            icon={SalesforceIcon}
            link="/integrations/salesforce"
          ></IntegrationCard>
          <IntegrationCard
            name="Hubspot"
            category="CRM"
            description="Our bi-directional sync and database of 200M+ business contacts makes Hubspot great at outbound & inbound."
            icon={HubspotIcon}
            link="/integrations/hubspot"
          ></IntegrationCard>
          <IntegrationCard
            name="Pipedrive"
            category="CRM"
            description="Bi-directionally sync all activities and enrich your records with Apolla's database of 200M+ business contacts."
            icon={PipedriveIcon}
            link="/integrations/pipedrive"
          ></IntegrationCard>
          <IntegrationCard
            name="MS Dynamics 365 Sales"
            category="CRM"
            description="Push and pull data between Apolla and MS Dynamics 365 Sales."
            icon={MsDynamics365Sales}
            link="/integrations/ms_dynamics_365_sales"
          ></IntegrationCard>
          <IntegrationCard
            name="Outreach"
            category="Engagement"
            description="Deploy Apolla prospects directly to an Outreach sequence."
            icon={OutreachIcon}
            link="/integrations/outreach"
          ></IntegrationCard>
          <IntegrationCard
            name="Gong"
            category="Engagement"
            description="Gong!"
            icon={GongIcon}
            link="/integrations/gong"
          ></IntegrationCard>
          <IntegrationCard
            name="Apollo"
            category="Engagement"
            description="Sales Prospecting"
            icon={ApolloIcon}
            link="/integrations/apollo"
          ></IntegrationCard>
          <IntegrationCard
            name="ActiveCampaign"
            category="..."
            description="..."
            icon={ActiveCampaignIcon}
            link="/integrations/activecampaign"
          ></IntegrationCard>
          <IntegrationCard
            name="Close"
            category="..."
            description="..."
            icon={CloseIcon}
            link="/integrations/close"
          ></IntegrationCard>
          <IntegrationCard
            name="Copper"
            category="..."
            description="..."
            icon={CopperIcon}
            link="/integrations/copper"
          ></IntegrationCard>
          <IntegrationCard
            name="Insightly"
            category="..."
            description="..."
            icon={ActiveCampaignIcon}
            link="/integrations/insightly"
          ></IntegrationCard>
          <IntegrationCard
            name="Keap"
            category="..."
            description="..."
            icon={KeapIcon}
            link="/integrations/keap"
          ></IntegrationCard>
          <IntegrationCard
            name="Nutshell"
            category="..."
            description="..."
            icon={NutshellIcon}
            link="/integrations/nutshell"
          ></IntegrationCard>
          <IntegrationCard
            name="SugarCRM"
            category="..."
            description="..."
            icon={SugarCrmIcon}
            link="/integrations/sugarcrm"
          ></IntegrationCard>
          <IntegrationCard
            name="ZohoCRM"
            category="..."
            description="..."
            icon={ZohoCrmIcon}
            link="/integrations/zoho_crm"
          ></IntegrationCard>
          <IntegrationCard
            name="ZendeskSell"
            category="..."
            description="..."
            icon={ZendeskSellIcon}
            link="/integrations/zendesk_sell"
          ></IntegrationCard>
          <IntegrationCard
            name="Teamleader"
            category="..."
            description="..."
            icon={TeamleaderIcon}
            link="/integrations/teamleader"
          ></IntegrationCard>
          <IntegrationCard
            name="Pipeliner"
            category="..."
            description="..."
            icon={PipelinerIcon}
            link="/integrations/pipelinder"
          ></IntegrationCard>
          <IntegrationCard
            name="Salesflare"
            category="..."
            description="..."
            icon={SalesflareIcon}
            link="/integrations/salesflare"
          ></IntegrationCard>
          <IntegrationCard
            name="Insightly"
            category="..."
            description="..."
            icon={InsightlyIcon}
            link="/integrations/insightly"
          ></IntegrationCard>
          <IntegrationCard
            name="Nutshell"
            category="..."
            description="..."
            icon={NutshellIcon}
            link="/integrations/nutshell"
          ></IntegrationCard>
        </div>
      </Content>
    </>
  );
}
