import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tokenGetter } from '../shared/shared.service';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Injecte le service Router

  // Vérifie si un token est présent
  if (tokenGetter().length > 0) {
    return true; // Autorise l'accès à la route
  }

  // Redirige vers la page de login si aucun token n'est trouvé
  return router.createUrlTree(['/account/login']);
};
