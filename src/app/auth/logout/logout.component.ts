import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.sessionService.remove('token');
    this.router.navigateByUrl('/auth/login');
  }
}
