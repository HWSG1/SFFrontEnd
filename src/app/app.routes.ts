import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProductosComponent } from './pages/productos/productos.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', loadComponent: () => import('./components/layout/layout.component'),
        children: [
            { path: 'signin', component: SignInComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'productos', component: ProductosComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]
     }
];