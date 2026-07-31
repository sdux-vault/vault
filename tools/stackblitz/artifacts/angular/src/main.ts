import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ExampleComponent } from './app/example.component';

bootstrapApplication(ExampleComponent, appConfig).catch((error) => {
  console.error(error);
});
