import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/devtools.app.config';
import { DevToolsApp } from './app/devtools/devtools.app.component';

bootstrapApplication(DevToolsApp, appConfig)
  // eslint-disable-next-line
  .catch((err) => console.error(err));
