import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { provideAuth, getAuth} from '@angular/fire/auth';
import { provideStorage, getStorage} from '@angular/fire/storage';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(()=> getAuth()),
    provideStorage(() => getStorage()),
    ...appConfig.providers
  ]
})
  .catch((err) => console.error(err));
