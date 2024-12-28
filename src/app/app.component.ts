import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceroComponent } from "./componentes/cabecero/cabecero.component";
import { PiePaginaComponent } from "./componentes/pie-pagina/pie-pagina.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceroComponent, PiePaginaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titulo = 'Control de Clientes';
}
