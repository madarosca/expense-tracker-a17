import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import localeRoExtra from '@angular/common/locales/extra/ro';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

registerLocaleData(localeRo, 'ro-RO', localeRoExtra);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
