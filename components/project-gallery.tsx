import Image from "next/image";
import { Parallax } from "./parallax";
const photographs = [
  {
    src: "01",
    title: "Structure taking shape.",
    alt: "DKS archive: orange structural frame during construction",
  },
  {
    src: "03",
    title: "A different perspective.",
    alt: "DKS archive: concrete building and roof viewed from below",
  },
  {
    src: "04",
    title: "Spaces for everyday life.",
    alt: "DKS archive: finished two-storey building beside a lawn",
  },
  {
    src: "05",
    title: "Built for the community.",
    alt: "DKS archive: Panduwasnuwara bus stand facade",
  },
  {
    src: "06",
    title: "Details make the difference.",
    alt: "DKS archive: poolside terrace beneath a timber pergola",
  },
];
export function ProjectGallery() {
  return (
    <div className="project-gallery">
      {photographs.map((photo, i) => (
        <figure className="project-plate" key={photo.src} data-glare="">
          <Parallax
            className="project-photo"
            overlay={<span className="project-index">0{i + 1}</span>}
          >
            <Image
              src={`/assets/dks-project-${photo.src}.webp`}
              fill
              sizes={
                i < 2
                  ? "(max-width: 767px) 90vw, 45vw"
                  : "(max-width: 767px) 90vw, 30vw"
              }
              alt={photo.alt}
            />
          </Parallax>
          <figcaption className="project-caption">
            <h3>{photo.title}</h3>
            <span>DKS / 0{i + 1}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
