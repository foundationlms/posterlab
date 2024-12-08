export interface HeaderStyles {
  fontFamily: string;
  titleColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface Author {
  id: string;
  name: string;
  affiliations: number[];
  isCorresponding?: boolean;
  email?: string;
  orcid?: string;
}

export interface Affiliation {
  id: number;
  institution: string;
  department?: string;
  city?: string;
  country?: string;
}