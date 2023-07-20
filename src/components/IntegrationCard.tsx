import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function IntegrationCard({
  icon,
  name,
  category,
  description,
  link,
  cta = "Configure",
}: {
  icon: StaticImageData;
  name: string;
  category: string;
  description: string;
  link: string;
  cta?: string;
}) {
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <figure className="mt-8">
        <Image alt={`${name} icon`} src={icon} width={25} height={25}></Image>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name} <div className="badge badge-secondary">{category}</div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link href={link}>
            <button className="btn btn-primary btn-sm">{cta}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
