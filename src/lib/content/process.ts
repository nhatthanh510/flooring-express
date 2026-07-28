export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: readonly ProcessStep[] = [
  {
    number: "01",
    title: "On-Site Consultation",
    description:
      "We visit your property for a precision laser measurement and provide samples that match your lighting conditions.",
  },
  {
    number: "02",
    title: "Floor Preparation",
    description:
      "Essential for Hobart's older homes. We level subfloors and check moisture content to ensure a lifetime guarantee on stability.",
  },
  {
    number: "03",
    title: "Expert Installation",
    description:
      "Our certified installers lay your floor with seamless transitions and professional scotia or skirting finishes.",
  },
  {
    number: "04",
    title: "Final Inspection",
    description:
      "A walk-through inspection with you to ensure every plank is perfect. We provide a full maintenance kit to keep your floors looking new.",
  },
];
