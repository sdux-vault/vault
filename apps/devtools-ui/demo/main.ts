import { bootstrapApplication } from '@angular/platform-browser';
import { DemoAppComponent } from './app/demo-app.component';
import { demoConfig } from './app/demo.config';

bootstrapApplication(DemoAppComponent, demoConfig).catch((err) =>
  //eslint-disable-next-line no-console
  console.error(err)
);
