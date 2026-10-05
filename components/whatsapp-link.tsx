import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
export function WhatsAppLink() {
  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/94777552416?text=Hello%20DKS%20Builders%2C%20I%27d%20like%20to%20discuss%20a%20project."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Let's talk on WhatsApp (opens in a new tab)"
    >
      <span>Let’s talk</span>
      <WhatsappLogoIcon size={25} weight="regular" aria-hidden="true" />
    </a>
  );
}
