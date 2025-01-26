import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewItemsComponent } from "../review-items/review-items.component";
import { CartStateService } from '../../shared/data-access/cart-state.service';
import { ProductItemCart } from '../../shared/interfaces/product.interface';
import { ValidationService } from '../../register/shared/validation.service';
import { NotificationService } from '../../notificationService/notification.service';
import { generarFactura } from '../lib/pdf';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, FormsModule, ReviewItemsComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export default class MainPageComponent {
  form = {
    address: '',
    postalCode: '',
  };

  constructor(
    private validationService: ValidationService,
    private notificationService: NotificationService,
  ) { }
  amount: number = 1;


  state = inject(CartStateService).state;

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

  validateAddress(): boolean {
    if (!this.form.address) {
      this.showError('address', 'La dirección es obligatoria.');
      return false;
    } else if (!this.validationService.validarDireccion(this.form.address)) {
      this.showError('address', 'La dirección debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.');
      return false;
    } else {
      this.clearError('address');
      return true;
    }
  }

  validatePostalCode(): boolean {
    if (!this.form.postalCode) {
      this.showError('postalCode', 'El código postal es obligatorio.');
      return false;
    } else if (!this.validationService.validarPostalCode(this.form.postalCode)) {
      this.showError('postalCode', 'El código postal debe tener exactamente 6 dígitos.');
      return false;
    } else {
      this.clearError('postalCode');
      return true;
    }
  }

  ngOnInit() {
    // Aquí asignamos el valor total de la compra a amount al inicializar el componente
    this.amount = this.state.price();
    this.updateDateTime();
  }

  async createPayment() {
    // Primero, validamos la dirección
    if (!this.validateAddress() && !this.validatePostalCode()) {
      console.log('Dirección no válida.');
      return;
    }
    // Obtenemos el monto y lo redondeamos a 2 decimales
    const totalAmount = parseFloat(this.amount.toFixed(2));

    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      alert('Por favor, ingrese un monto válido.');
      return;
    }

    // **Validar stock antes de crear el pago**
    const cartItems = this.state.products(); // Obtenemos los productos del carrito
    for (const item of cartItems) {
      if (item.product.stock <= 0) {
        // Si algún producto tiene stock 0, mostramos un mensaje y bloqueamos el pago
        alert(`El producto ${item.product.name} está agotado. No puede realizarse el pago.`);
        return; // Detenemos el proceso
      } else if (item.quantity > item.product.stock) {
        // Si la cantidad es mayor que el stock, mostramos un mensaje y bloqueamos el pago
        alert(`El producto ${item.product.name} tiene solo ${item.product.stock} unidades disponibles. No puede realizarse el pago.`);
        return; // Detenemos el proceso
      }
    }

    try {
      const response = await fetch('http://localhost:3000/api/payments/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalAmount }),
      });

      const data = await response.json();
      if (data.id) {
        // Redirigimos a PayPal con el token recibido
        const approvalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${data.id}`;
        window.location.href = approvalUrl; // Redirige a la ventana de PayPal
      } else {
        alert('Error al crear el pago: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema al conectar con el servidor.');
    }
  }
  updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    const update = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      if (datetimeElement) {
        datetimeElement.textContent = `Fecha: ${formattedDate} Hora: ${formattedTime}`;
      }
    };
    update();
    setInterval(update, 1000);
  }

  onRemove(id: string) {
    this.state.remove(id);
  }

  onIncrease(product: ProductItemCart) {
    this.state.udpate({
      product: product.product,
      quantity: product.quantity + 1,
    });
  }

  onDecrease(product: ProductItemCart) {
    this.state.udpate({
      ...product,
      quantity: product.quantity - 1,
    });
  }


  get totalPrice(): number {
    return this.state.products().reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  showInfoMessage(): void {
    this.notificationService.showMessage('¡!');
  }

  // Método para mostrar un mensaje de error
  showErrorMessage(): void {
    this.notificationService.showMessage('¡Debe llenar todos los campos!');
  }

  // Método para generar el PDF
  generarPDF() {
    const productos = this.state.products().map((item: ProductItemCart) => ({
      descripcion: item.product.name,
      cantidad: item.quantity,
      precio: item.product.price
    }));

    const factura = {
      numero: 'F001',
      fecha: new Date().toLocaleDateString(),
      cliente: 'Juan Pérez', // Aquí deberías usar el nombre del cliente real si está disponible
      direccion: this.form.address,
      codigoPostal: this.form.postalCode,
      productos: productos
    };

    generarFactura(factura);  // Llamamos la función pasando los datos de la factura
  }


  /*submitForm(): void {
    this.clearError('address');
    // Validamos cada campo
    this.validateAddress();

    const errorMessages = document.querySelectorAll('.error-message[style="display: block;"]');
    const hasErrors = errorMessages.length > 0;

    if (hasErrors) {
      this.showErrorMessage();
      console.log('Formulario inválido.');
    } else {
      // Si no hay errores, procedemos a crear el pago
      this.createPayment();
    }
  }*/
}

