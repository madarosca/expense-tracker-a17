import { Component, OnInit } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RoutesRecognized,
} from '@angular/router';
import { DaysService } from '../../shared/days.service';

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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeItem = this.router.url;
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.activeItem = data.state.root.firstChild.url[0].path;
      }
    });
  }

  onMenuItemClick() {
    const index =
      this.router.url === '/home' ? 0 : this.router.url === '/summary' ? 8 : 1;
    this.activeItem = this.router.url;
    this.daysService.setSelectedDay(index);
  }
}
