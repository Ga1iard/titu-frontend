import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private clientApiUrl = 'http://localhost:3000/api/clients/register';
  private operatorApiUrl = 'http://localhost:3000/api/operators/register';
  private adminApiUrl = 'http://localhost:3000/api/admins/register';
  private productsEndpoint = 'http://localhost:3000/api/products';
  private baseUrl = 'http://localhost:3000';
  private paypalApiUrl = 'http://localhost:3000/api/payments/create-payment';

  constructor(private http: HttpClient) {}

  // Método para registrar un cliente
  registerClient(clientData: any): Observable<any> {
    return this.http.post(this.clientApiUrl, clientData);
  }

  // Método para registrar un operador
  registerOperator(operatorData: any): Observable<any> {
    return this.http.post(this.operatorApiUrl, operatorData);
  }

  // Método para registrar un administrador
  registerAdmin(adminData: any): Observable<any> {
    return this.http.post(this.adminApiUrl, adminData);
  }
   // Método para obtener categorías
   getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/categories`);
  }

  // Método para agregar un producto
  addProduct(productData: FormData): Observable<any> {
    return this.http.post(this.productsEndpoint, productData); 
  }

  registerPayment(paymentData: any): Observable<any> {
    return this.http.post(this.paypalApiUrl, paymentData);
  }

  // Método para obtener los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/catalog/inventory/table`); // Asegúrate de que el endpoint coincide
  }
}
