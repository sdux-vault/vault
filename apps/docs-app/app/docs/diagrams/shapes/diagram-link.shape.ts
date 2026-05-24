export interface DiagramLinkShape {
  fragment: string;
  display: string;
  sort: string;
  type: 'controller' | 'behavior' | 'flow' | 'testing';
}
