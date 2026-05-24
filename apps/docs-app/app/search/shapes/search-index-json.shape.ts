import { SearchDocumentShape } from './search-document.shape';

export interface SearchIndexJsonShape {
  documents: SearchDocumentShape[];
}
