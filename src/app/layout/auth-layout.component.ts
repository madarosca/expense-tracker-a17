import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AuthLayoutComponent {}
