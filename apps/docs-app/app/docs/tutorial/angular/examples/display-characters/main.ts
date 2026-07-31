import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ExampleComponent } from './app/example.component';

bootstrapApplication(ExampleComponent, appConfig).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});
