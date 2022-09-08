import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Params, Router, RouterStateSnapshot } from '@angular/router';
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

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authorize(state);
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authorize(state);
  }


  protected redirectToLogin(queryParams?: Params): void {
    this.router
      .navigate(['auth', 'login'], { queryParams })
      .finally();
  }

  private authorize(state: RouterStateSnapshot): boolean {
    const params: Params = { next: state.url };
    const authorize: boolean = (this.sessionSerivce.get('token') !== null);
    if (!authorize) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Kamu belum ada akses di halaman ini',
      });
      this.redirectToLogin(params);
    }
    const menus = [
      {
        id: 1,
        name: 'Todos',
        location: 'demo/todos'
      },
      {
        id: 2,
        name: 'Resume',
        location: 'demo/resume'
      },
      {
        id: 3,
        name: 'Anime',
        location: 'demo/anime'
      },
      {
        id: 4,
        name: 'Sample',
        location: 'demo/sample'
      }
    ]
    return menus.some(m => {
      return state.url.indexOf(m.location) > -1;
    });
  }
}
