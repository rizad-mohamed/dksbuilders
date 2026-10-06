import { ArrowUpRightIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "./motion";
import { officeMapUrl, officeMapEmbedUrl } from "@/lib/location";

export function Location() {
  return (
    <section
      id="location"
      className="section wrap location-section"
      aria-labelledby="location-title"
    >
      <Reveal className="location-copy">
        <MapPinIcon size={28} weight="light" aria-hidden="true" />
        <h2 id="location-title">
          Find us.
          <br />
          Let’s talk in person.
        </h2>
        <p>
          Visit DKS Builders in Elpitiya to discuss your next project with our
          team.
        </p>
        <a
          className="text-link"
          href={officeMapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps <ArrowUpRightIcon size={17} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Reveal>
      <div className="location-map">
        <iframe
          title="DKS Builders office location on Google Maps"
          src={officeMapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
