import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToasterService } from '@/shared/service/toaster.service';

export const pilgrimGuard: CanActivateFn = (route, state) => {
  // remove it when login pushed
  return true;
  const tokenObj = localStorage.getItem('token');
  const router = inject(Router);
  const toaster = inject(ToasterService);
  if (!tokenObj) router.navigate(['/', 'r', 'pilgrim']);
  const token: { access: string; role: 'pilgrim' } = JSON.parse(
    tokenObj as string
  );
  if (token.access && token.role === 'pilgrim') return true;
  toaster.error('You are not authorized to access this page');
  router.navigate(['/', 'r', 'pilgrim']);
  return false;
};
