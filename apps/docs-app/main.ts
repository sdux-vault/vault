import { bootstrapApplication } from '@angular/platform-browser';
import 'prismjs';
import 'prismjs/components/prism-typescript';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  // eslint-disable-next-line
  console.error(err)
);
