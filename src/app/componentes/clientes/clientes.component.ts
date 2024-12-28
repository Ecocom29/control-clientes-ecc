import { Component, ElementRef, ViewChild } from '@angular/core';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule, FormStyle } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  clientes: Cliente[] | null = null;

  cliente: Cliente = {
    nombres: '',
    apellidos: '',
    email: '',
    saldo: undefined,
  };

  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  constructor(private clienteServicio: ClienteService) {}

  ngOnInit() {
    this.clienteServicio.getClientes().subscribe((clientes) => {
      this.clientes = clientes;

      console.log(clientes);
    });
  }

  // getSaldoTotal(): number {
  //   let saldoTotal: number = 0;
  //   if(this.clientes){
  //     this.clientes.forEach(cliente=> {
  //       if(cliente.saldo !== undefined){
  //         saldoTotal += cliente.saldo;
  //       }
  //     });
  //   }

  //   return saldoTotal;
  // }

  getSaldoTotal(): number {
    return (
      this.clientes?.reduce(
        (total, cliente) => total + (cliente.saldo ?? 0),
        0
      ) ?? 0
    );
  }

  agregarCliente(clienteForm: NgForm) {
    const {value, valid} = clienteForm;
    if(valid){
      // Agregamos la logica para guardar el cliente
      this.clienteServicio.agregarCliente(value);
      // Limpiamos el formulario
      clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
}
