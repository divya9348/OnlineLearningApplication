import { CanActivateFn, Router } from '@angular/router';
import { NetLearnService } from '../services/net-learn.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const netLearn = inject(NetLearnService);
  const router = inject(Router);

  if (netLearn.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
