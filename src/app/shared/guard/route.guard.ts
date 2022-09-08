import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly sessionSerivce: SessionService,
    private readonly router: Router
  ) { }
  canActivate(): boolean {
    return this.authorize();
  }
  canActivateChild(): boolean {
    return this.authorize();
  }

  private authorize(): boolean {
    const authorize: boolean = (this.sessionSerivce.get('token') !== null);

    if (!authorize) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Kamu belum ada akses di halaman ini',
      });
      this.router.navigateByUrl('/auth/login');
    }
    return authorize;
  }
}
