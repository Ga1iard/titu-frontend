import { Routes } from '@angular/router';
import { RegisterComponent } from './register/customer/register/register.component';
import { LoginComponent } from './login/login.component';
import { TwoFactorAuthComponent } from './login/two-factor-auth/two-factor-auth.component';
import { LoginWelcomeComponent } from './login/login-welcome/login-welcome.component'; 
import { Header1Component } from './register/homePage/header1/header1.component';
import { RegisterComponentOperator } from './register/homePage/operator/register/register.component';
import { RegisterComponentAdmin } from './register/homePage/admin/register/register.component';
import { ChangePasswordComponent } from './register/change-password/change-password.component';
import { PagoExitosoComponent } from './payment/pago-exitoso/pago-exitoso.component';
//import { PagoCanceladoComponent } from './payment/pago-cancelado/pago-cancelado.component';
import { AddProductComponent } from './operator/add-product/add-product.component';
import { PoliticasPrivacidadComponent } from './shared/ui/footer/politicas-privacidad/politicas-privacidad.component';
import { TerminosCondicionesComponent } from './shared/ui/footer/terminos-condiciones/terminos-condiciones.component';
import { TableProductsComponent } from './operator/table-products/table-products.component';
import { roleGuard } from './shared/guards/role.guard';
export const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./client/client.routes')
    },
    { path: 'register-customer', component: RegisterComponent},
    { path: 'register-operator', component: RegisterComponentOperator},
    { path: 'register-admin', component: RegisterComponentAdmin},
    { path: 'admin', component: Header1Component, canActivate: [roleGuard], data: { expectedRoles: ['administrador', 'operador'] }},
    { path: 'change-password', component: ChangePasswordComponent},
    { path: 'login', component: LoginComponent },            // Ruta para el login
    { path: 'twofactor', component: TwoFactorAuthComponent },// Ruta para twofactor
    { path: 'login-welcome', component: LoginWelcomeComponent }, // Ruta de bienvenida después del login
    {path: 'operator/add-product', component: AddProductComponent},
    {path: 'payment-success', component: PagoExitosoComponent}, // Ruta para el pago exitoso
    {path: 'politicas-privacidad', component: PoliticasPrivacidadComponent},
    {path: 'terminos-condiciones', component: TerminosCondicionesComponent},
    //{path: 'payment-cancel', component: PagoCanceladoComponent}, // Ruta para el pago cancelado
    {path: 'operator/table-products', component: TableProductsComponent},
    {
      path: '**',
      redirectTo: '',
    },
];
