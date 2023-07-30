import HubspotIcon from "@/assets/connector_icons/hubspot.png";
import SalesforceIcon from "@/assets/connector_icons/salesforce.png";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function MapperLabel({
  providerName,
}: {
  providerName: string;
}) {
  return (
    <>
      <label className="label">
        <div className="label-text">
          <span className="text-accent font-semibold">Apolla.io</span>{" "}
        </div>
        <div className="relative left-[35px]">
          <ArrowsRightLeftIcon width={25} height={25} />
        </div>
      </label>
      <label className="gap-2 flex items-center justify-end">
        {providerName === "hubspot" && (
          <Image
            alt={`${providerName} icon`}
            src={HubspotIcon}
            width={25}
            height={25}
          ></Image>
        )}
        {providerName === "salesforce" && (
          <Image
            alt={`${providerName} icon`}
            src={SalesforceIcon}
            width={25}
            height={25}
          ></Image>
        )}
        <span className="label-text font-semibold">
          {capitalize(providerName)}
        </span>
      </label>
    </>
  );
}
