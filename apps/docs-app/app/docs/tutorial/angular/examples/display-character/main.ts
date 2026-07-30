import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { ExampleComponent } from './example.component';

bootstrapApplication(ExampleComponent, appConfig).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});
