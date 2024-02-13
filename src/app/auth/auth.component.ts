import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const userName = form.value.userName;
      const password = form.value.password;

      this.authService.login({ userName, password });

      form.reset();
    }
  }
}
