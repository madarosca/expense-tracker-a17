import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    provideClientHydration(),
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'ro-RO', // navigator.language
    // },
  ],
};
