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
            { path: 'signin', component: SignInComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'ventas', component: VentasComponent },
            { path: 'compras', component: ComprasComponent },
            { path: 'inventario', component: InventarioComponent },
            { path: 'reportes', component: ReportesComponent },
            { path: 'mantenimiento', component: MantenimientoComponent, 
                children: [
                    { path: 'usuarios', component: UsuariosComponent },
                    { path: 'objetos', component: ObjetosComponent },
                    { path: 'productos', component: ProductosComponent },
                ]
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]
     }
];