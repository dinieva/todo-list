import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from "@angular/common/http";


export const appConfig: ApplicationConfig = {
  providers: [
        provideAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        importProvidersFrom(TuiRootModule),
        provideHttpClient(),
    ],
};
