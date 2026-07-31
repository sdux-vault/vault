import { StackBlitzExampleLanguageShape } from '../../stack-blitz/shapes/stackblitz-example.language.shape';
import { StackBlitzExampleShape } from '../../stack-blitz/shapes/stackblitz-example.shape';

export interface ChapterStackBlitzShape {
  example: StackBlitzExampleShape;
  language: StackBlitzExampleLanguageShape;
}
