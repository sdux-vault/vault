export const MAIN_TS_FILE = `
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ExampleComponent } from './app/example.component';

bootstrapApplication(ExampleComponent, appConfig).catch((err) => console.error(err));
`.trim();
