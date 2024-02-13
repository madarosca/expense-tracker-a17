import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DaysService } from '../../shared/days.service';
import { Day } from '../../shared/day.model';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [TitleCasePipe, RouterLink],
})
export class FooterComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  selectedIndex!: number;
  previous: string = '<< ';
  next: string = ' >>';
  selectedDay!: string;

  constructor(
    private daysService: DaysService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const days = this.daysService.getDays();

    this.subscription = this.daysService.dayChanged.subscribe(
      (index: number) => {
        this.selectedIndex = index;
        this.getButtonsContent(index, days);
        this.selectedDay = this.daysService.getSelectedDayId(index);
      }
    );

    this.selectedIndex = this.daysService.getSelectedDayIndex();
    this.selectedDay = this.daysService.getSelectedDayId(this.selectedIndex);
    this.getButtonsContent(this.selectedIndex, days);
  }

  getButtonsContent(index: number, days: Day[]) {
    this.previous =
      index === 0
        ? `${'<< ' + days[days.length - 1].id}`
        : `${'<< ' + days[index - 1].id}`;
    this.next =
      index === 8 ? `${days[0].id + ' >>'}` : `${days[index + 1].id + ' >>'}`;
  }

  onNext() {
    const indexToSelect = this.selectedIndex === 8 ? 0 : this.selectedIndex + 1;

    this.getNavigation(indexToSelect);
  }

  onPrevious() {
    const indexToSelect = this.selectedIndex === 0 ? 8 : this.selectedIndex - 1;

    this.getNavigation(indexToSelect);
  }

  getNavigation(indexToSelect: number) {
    this.daysService.setSelectedDay(indexToSelect);

    const route =
      this.selectedDay === 'budget'
        ? ['']
        : this.selectedDay === 'summary'
        ? ['summary']
        : ['expenses'];

    this.router.navigate(route);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
