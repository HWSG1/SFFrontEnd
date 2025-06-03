import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AuthGuard } from '../app/guards/AuthGuard';
import { ObjetosComponent } from './pages/objetos/objetos.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { MantenimientoComponent } from './pages/mantenimiento/mantenimiento.component';
import { InventarioComponent } from './pages/inventario/inventario.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', loadComponent: () => import('./components/layout/layout.component'),
        canActivate: [AuthGuard], // Usa AuthGuard aquí
        children: [
            { path: 'signin', component: SignInComponent, data: { breadcrumb: 'Sign In' }},
            { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
            { path: 'ventas', component: VentasComponent, data: { breadcrumb: 'Ventas' } },
            { path: 'compras', component: ComprasComponent, data: { breadcrumb: 'Compras' } },
            { path: 'inventario', component: InventarioComponent , data: { breadcrumb: 'Inventario' }},
            { path: 'reportes', component: ReportesComponent , data: { breadcrumb: 'Reportes' }},
            { path: 'mantenimiento', component: MantenimientoComponent, data: { breadcrumb: 'Mantenimiento' }, 
                children: [
                    { path: 'usuarios', component: UsuariosComponent, data: { breadcrumb: 'Usuarios' } },
                    { path: 'objetos', component: ObjetosComponent, data: { breadcrumb: 'Objetos' } },
                    { path: 'productos', component: ProductosComponent , data: { breadcrumb: 'Productos' }},
                ]
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]
     }
];