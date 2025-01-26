import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { LoginFormComponent } from './login-form/login-form.component'; 

@Component({
  selector: 'app-login',
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {}

