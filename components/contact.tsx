import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "./motion";
export function Contact() {
  return (
    <section
      itemScope
      itemType="https://schema.org/GeneralContractor"
      id="contact"
      className="section contact wrap"
      aria-labelledby="contact-title"
    >
      <meta itemProp="name" content="DKS Builders" />
      <div className="contact-heading">
        <Reveal>
          <div className="eyebrow">
            <span>09 /</span> LET'S TALK
          </div>
          <h2 id="contact-title">
            Your vision.
            <br />
            Our next conversation.
          </h2>
        </Reveal>
        <div>
          <p>
            Tell us what you're planning, where it's located and what you need.
            Let's discuss the way forward.
          </p>
          <a
            className="button"
            href="mailto:dksbuilders@gmail.com?subject=Project%20enquiry%20for%20DKS%20Builders"
          >
            Discuss a project
            <ArrowRightIcon size={17} />
          </a>
        </div>
      </div>
      <div className="contact-grid">
        <div>
          <h3>Call us</h3>
          <a itemProp="telephone" href="tel:+94912290737">
            +94 91 22 90 737
          </a>
          <a href="tel:+94777552416">+94 77 75 52 416</a>
        </div>
        <div>
          <h3>Email us</h3>
          <a itemProp="email" href="mailto:dksbuilders@gmail.com">
            dksbuilders@gmail.com
          </a>
          <a href="mailto:info@dksbuilders.com">info@dksbuilders.com</a>
        </div>
        <div>
          <h3>Visit our office</h3>
          <address
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <span itemProp="streetAddress">No. 22, Ambalangoda Road</span>
            <br />
            <span itemProp="addressLocality">Elpitiya</span>,{" "}
            <span itemProp="addressCountry">Sri Lanka</span>
          </address>
          <a
            className="text-link"
            href="https://maps.app.goo.gl/6tN63iBsDXEMGAsf9"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions
            <ArrowUpRightIcon size={16} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
