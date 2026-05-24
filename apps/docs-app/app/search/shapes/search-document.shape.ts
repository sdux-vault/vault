export interface SearchDocumentShape {
  id: string;
  title: string;
  kind: string;
  project: string;
  docLink: string;
  relativePath: string;
  symbols: string[];
  content: string;
  url: string;

  // Required by FlexSearch.Document<T>
  // eslint-disable-next-line
  [key: string]: any;
}
