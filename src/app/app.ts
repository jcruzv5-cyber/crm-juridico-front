import { Component } from '@angular/core';
import { Clientes } from './pages/clientes/clientes';

@Component({
  selector: 'app-root',
  imports: [Clientes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'crm-juridico-front';
}
