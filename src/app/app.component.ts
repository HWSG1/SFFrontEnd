import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { CommonModule } from '@angular/common'; // Importa CommonModule


@Component({
  selector: 'app-root',
  imports: [LoginComponent, CommonModule], //RouterOutlet
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
