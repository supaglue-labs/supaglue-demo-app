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
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image alt={`${name} icon`} src={icon} width={50} height={50}></Image>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name} <div className="badge badge-secondary">{category}</div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link href={link}>
            <button className="btn btn-primary">{cta}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
