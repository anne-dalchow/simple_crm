import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-2024","appId":"1:855478074286:web:49bf6908051aae5273e63f","storageBucket":"simple-crm-2024.firebasestorage.app","apiKey":"AIzaSyBeCc2rzKmlFQ51aUiAN-w2at_ARbEjxio","authDomain":"simple-crm-2024.firebaseapp.com","messagingSenderId":"855478074286"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
};
