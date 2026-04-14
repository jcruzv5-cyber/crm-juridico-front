import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-clientes.html',
  styleUrl: './consulta-clientes.css'
})
export class ConsultaClientes implements OnInit {
  private clienteService = inject(ClienteService);

  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;

  cargando = false;
  mensajeError = '';
  filtro = '';

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.clienteService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.clientesFiltrados = data;
        this.cargando = false;
      },
      error: () => {
        this.mensajeError = 'Ocurrió un error al consultar los clientes.';
        this.cargando = false;
      }
    });
  }

  filtrarClientes(): void {
    const texto = this.filtro.trim().toLowerCase();

    if (!texto) {
      this.clientesFiltrados = this.clientes;
      return;
    }

    this.clientesFiltrados = this.clientes.filter(cliente =>
      (cliente.numeroDocumento || '').toLowerCase().includes(texto) ||
      (cliente.nombres || '').toLowerCase().includes(texto) ||
      (cliente.apellidos || '').toLowerCase().includes(texto) ||
      (cliente.correoElectronico || '').toLowerCase().includes(texto)
    );
  }

  verDetalle(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
  }

  cerrarDetalle(): void {
    this.clienteSeleccionado = null;
  }
}
