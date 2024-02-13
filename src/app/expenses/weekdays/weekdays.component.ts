import { Component } from '@angular/core';
import { DatePipe, NgClass, NgFor, UpperCasePipe } from '@angular/common';
import { DaysService } from '../../shared/days.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weekdays',
  standalone: true,
  imports: [NgFor, DatePipe, NgClass, UpperCasePipe],
  templateUrl: './weekdays.component.html',
  styleUrl: './weekdays.component.css',
})
export class WeekdaysComponent {
  private subscription: Subscription = new Subscription();
  selectedDayIndex!: number;
  currentWeek: Date[] = [];
  startOfTheWeek!: number;

  constructor(private daysService: DaysService) {}

  ngOnInit(): void {
    this.subscription = this.daysService.dayChanged.subscribe(
      (index: number) => {
        this.selectedDayIndex = index;
      }
    );

    this.selectedDayIndex = this.daysService.getSelectedDayIndex();
    this.daysService.setSelectedDay(1);
    this.getStartOfTheWeek();
    this.currentWeek = this.getWeekDays(this.startOfTheWeek);
  }

  public getWeekDays(startOfTheWeek: number): Date[] {
    const dateList: Date[] = [];

    for (let i = 0; i <= 6; i++) {
      const newDate = new Date(startOfTheWeek);
      newDate.setDate(newDate.getDate() + i);
      dateList.push(newDate);
    }

    return dateList;
  }

  getStartOfTheWeek(date?: number) {
    const withDate = new Date(date);

    this.startOfTheWeek = date
      ? withDate.setDate(withDate.getDate() - (withDate.getDay() || 7) + 1)
      : new Date().setDate(
          new Date().getDate() - (new Date().getDay() || 7) + 1
        );
  }

  onPrevious() {
    const date = new Date(this.currentWeek[0]).setDate(
      new Date(this.currentWeek[0]).getDate() - 6
    );
    this.getStartOfTheWeek(date);
    this.currentWeek = this.getWeekDays(this.startOfTheWeek);
  }

  onNext() {
    const date = new Date(this.currentWeek[6]).setDate(
      new Date(this.currentWeek[6]).getDate() + 6
    );
    this.getStartOfTheWeek(date);
    this.currentWeek = this.getWeekDays(this.startOfTheWeek);
  }

  onDayClick(index: number) {
    this.daysService.setSelectedDay(index + 1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
