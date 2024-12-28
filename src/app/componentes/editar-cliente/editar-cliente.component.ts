import { Component } from '@angular/core';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css',
})
export class EditarClienteComponent {
  cliente: Cliente = {
    nombres: '',
    apellidos: '',
    email: '',
    saldo: undefined,
  };

  id: string | null = null;

  constructor(
    private clienteServicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //recuperamos el id del cliente a editar
    this.id = this.route.snapshot.paramMap.get('id');

    console.log(this.id);

    if (this.id) {
      this.clienteServicio
        .getCliente(this.id)
        .subscribe((cliente: Cliente | null) => {
          if (cliente) {
            this.cliente = cliente;
          } else {
            console.log('Cliente no encontrado ' + this.id);
            this.router.navigate(['/']);
          }
        });
    } else {
      console.log('ID no proporcionado');
      this.router.navigate(['/']);
    }
  }

  guardar(clienteForm: NgForm) {
    const {value, valid}  = clienteForm;

    if(valid){
      value.id = this.id;
      this.clienteServicio.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if(confirm('Seguro deseas eliminar el cliente?')){
      this.clienteServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
}
