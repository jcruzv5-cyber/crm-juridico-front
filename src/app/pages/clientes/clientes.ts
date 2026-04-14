import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {
  private clienteService = inject(ClienteService);

  clientes: Cliente[] = [];

  mensajeExito = '';
  mensajeError = '';

  documentoBusqueda = '';
  clienteEncontrado: Cliente | null = null;

  cliente: Cliente = this.obtenerClienteVacio();

  ngOnInit(): void {
    this.cargarClientes();
  }

  obtenerClienteVacio(): Cliente {
    return {
      tipoDocumento: '',
      numeroDocumento: '',
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      genero: '',
      estadoCivil: '',
      direccionResidencia: '',
      ciudadMunicipio: '',
      barrio: '',
      telefonoPrincipal: '',
      telefonoSecundario: '',
      correoElectronico: '',
      estratoSocioeconomico: '',
      ingresosMensuales: '',
      ocupacion: '',
      esPoblacionVulnerable: false,
      tipoPoblacionVulnerable: '',
      aceptaHabeasData: false,
      estadoUsuario: 'Activo'
    };
  }

  cargarClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: () => {
        this.mensajeError = 'No fue posible cargar la lista de clientes.';
      }
    });
  }

  guardarCliente(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

    this.clienteService.crearCliente(this.cliente).subscribe({
      next: () => {
        this.mensajeExito = 'Cliente registrado correctamente.';
        this.cliente = this.obtenerClienteVacio();
        this.cargarClientes();
      },
      error: (error) => {
        if (error?.error?.mensaje) {
          this.mensajeError = error.error.mensaje;
        } else {
          this.mensajeError = 'Ocurrió un error al registrar el cliente.';
        }
      }
    });
  }

  buscarPorDocumento(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
    this.clienteEncontrado = null;

    if (!this.documentoBusqueda.trim()) {
      this.mensajeError = 'Debe ingresar un número de documento para consultar.';
      return;
    }

    this.clienteService.obtenerClientePorDocumento(this.documentoBusqueda).subscribe({
      next: (data) => {
        this.clienteEncontrado = data;
        this.mensajeExito = 'Cliente encontrado correctamente.';
      },
      error: (error) => {
        if (error?.error?.mensaje) {
          this.mensajeError = error.error.mensaje;
        } else {
          this.mensajeError = 'No fue posible consultar el cliente.';
        }
      }
    });
  }

  limpiarBusqueda(): void {
    this.documentoBusqueda = '';
    this.clienteEncontrado = null;
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  limpiarFormulario(): void {
    this.cliente = this.obtenerClienteVacio();
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
