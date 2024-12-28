import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string | null = null;
  password: string | null = null;
  mensaje: string | null = null;

  constructor(private router: Router, private loginService: LoginService) {}

    ngOnInit(){
      this.loginService.getAuthState().subscribe(usuario => {
        if(usuario){
          this.router.navigate(['/'])
        }
      });
    }


  login() {
    if(this.email && this.password){
      this.loginService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.mensaje = 'Error al realizar el login: ' + error
      });
    }else{
      this.mensaje = 'Por favor ingresa un email y password validos.'
    }
  }
}
