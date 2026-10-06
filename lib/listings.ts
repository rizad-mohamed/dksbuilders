export type Listing = {
  id: string;
  title: string;
  category: string;
  area: string;
  copy: string;
  detail: string;
};

// Named register entries are separate from archive photography: no verified mapping exists.
export const projectRecords: Listing[] = [
  {
    id: "moratuwa",
    title: "Faculty of Engineering Multipurpose Building",
    category: "Institutional",
    area: "Moratuwa",
    copy: "Completion of balance work involving prefabricated steel, University of Moratuwa.",
    detail: "Prefabricated steel / Building works",
  },
  {
    id: "wariyapola",
    title: "Bank of Ceylon Branch Building",
    category: "Commercial",
    area: "Wariyapola",
    copy: "Construction of a new branch building at Wariyapola.",
    detail: "Branch building / New construction",
  },
  {
    id: "hatton",
    title: "Labour Office",
    category: "Government",
    area: "Hatton",
    copy: "Construction of the proposed Labour Office at Hatton.",
    detail: "Public buildings / Construction",
  },
];

// These are application interests, not advertised vacancies or promised positions.
export const careerInterests: Listing[] = [
  {
    id: "civil",
    title: "Civil engineering",
    category: "Civil",
    area: "Site & structure",
    copy: "Interested in planning, structural work or construction coordination? Tell us about your skills and the work you would like to contribute to.",
    detail: "Expression of interest",
  },
  {
    id: "interior",
    title: "Interior works",
    category: "Interior",
    area: "Fit-out & finishes",
    copy: "Share your experience in interior detailing, fit-out or finishing work, along with the kind of role you are looking for.",
    detail: "Expression of interest",
  },
  {
    id: "electrical",
    title: "Electrical engineering",
    category: "Electrical",
    area: "Building systems",
    copy: "Tell us about your electrical qualifications, installation experience or technical coordination skills.",
    detail: "Expression of interest",
  },
  {
    id: "mechanical",
    title: "Mechanical engineering",
    category: "Mechanical",
    area: "Building systems",
    copy: "Introduce your experience with mechanical systems, installation or maintenance and your preferred area of work.",
    detail: "Expression of interest",
  },
];
