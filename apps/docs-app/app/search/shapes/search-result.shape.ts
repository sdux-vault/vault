export interface SearchResultShape {
  id: string;
  title: string;
  kind: string;
  project: string;
  docLink: string;
  url: string;
  // optional: you can add score, snippet, etc. later
}
