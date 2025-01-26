import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ValidationService } from '../shared/validation.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../notificationService/notification.service';
import { NotificationComponent } from "../../notification/notification.component";  // Asegúrate de importar el servicio


@Component({
  selector: 'app-change-password',
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ChangePasswordComponent {

  form = { 
    password: '',
    confirmPassword: '',
  };

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  // Inyectamos el Router en el constructor
    constructor(
      private validationService: ValidationService,
      private router: Router, // Inyectamos el Router
      //private apiService: ApiService // Inyectamos el servicio
      private notificationService: NotificationService,
    ) {}

    clearError(fieldName: string): void {
      const errorElement = document.getElementById(`${fieldName}-error`);
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    }
  
    showError(fieldName: string, message: string): void {
      const errorElement = document.getElementById(`${fieldName}-error`);
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
      }
    }

  validatePassword(): void {
    if (!this.form.password) {
      this.showError('password', 'La contraseña es obligatoria.');
    } else if (!this.validationService.validarContrasena(this.form.password)) {
      this.showError(
        'password',
        'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.'
      );
    } else {
      this.clearError('password');
    }
  }

  validateConfirmPassword(): void {
    if (!this.form.confirmPassword) {
      this.showError('confirmPassword', 'La confirmación de contraseña es obligatoria.');
    } else if (this.form.password !== this.form.confirmPassword) {
      this.showError('confirmPassword', 'Las contraseñas no coinciden.');
    } else {
      this.clearError('confirmPassword');
    }
  }

  togglePasswordVisibility(inputName: string): void {
    if (inputName === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (inputName === 'confirm-password') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  showInfoMessage(): void {
    this.notificationService.showMessage('¡Cambio de contraseña exitoso!');
  }

  // Método para mostrar un mensaje de error
  showErrorMessage(): void {
    this.notificationService.showMessage('¡Hubo un error al procesar tu solicitud!');
  }

  submitForm(): void {
    this.clearError('password');
    this.clearError('confirmPassword');

    this.validatePassword();
    this.validateConfirmPassword();
  
    const hasErrors = document.querySelectorAll('.error-message[style="display: block;"]').length > 0;
  
    if (!hasErrors) {
      this.showInfoMessage();
    } else {
      this.showErrorMessage();
      console.log('Formulario inválido.');
    }

    if (this.form.password === this.form.confirmPassword && !hasErrors) {
      // Lógica para restablecer la contraseña
      console.log('Contraseña restablecida exitosamente');
    } else {
      console.error('Las contraseñas no coinciden');
    }
  }

}


