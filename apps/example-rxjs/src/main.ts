import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { configureArk } from '@playground/ark';
import reactivity from '@playground/ark-rxjs';

if (environment.production) {
  enableProdMode();
}

configureArk({
  reactivity,
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
