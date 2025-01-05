import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'productos', component: ProductosComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];