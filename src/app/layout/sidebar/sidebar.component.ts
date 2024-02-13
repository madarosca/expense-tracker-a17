import { Component, OnInit } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import { Router, RouterLink, RoutesRecognized } from '@angular/router';
import { DaysService } from '../../shared/days.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [UpperCasePipe, RouterLink, NgClass],
})
export class SidebarComponent implements OnInit {
  activeItem: string = '/home';
  constructor(
    private daysService: DaysService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activeItem = this.activeItem = this.router.url;
  }

  onMenuItemClick() {
    const index =
      this.router.url === '/home' ? 0 : this.router.url === '/summary' ? 8 : 1;
    this.activeItem = this.router.url;
    this.daysService.setSelectedDay(index);
  }

  onSignOut() {
    this.authService.logout();
  }
}
