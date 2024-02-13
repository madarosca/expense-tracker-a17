import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DaysService } from '../../shared/days.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [UpperCasePipe, RouterLink],
})
export class SidebarComponent {
  constructor(private daysService: DaysService, private router: Router) {}

  onMenuItemClick() {
    console.log(this.router.url);
    const index =
      this.router.url === '/home' ? 0 : this.router.url === '/summary' ? 8 : 1;
    this.daysService.setSelectedDay(index);
  }
}
