import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  showErrorUsuario(){
    Swal.fire({
      icon: 'error',
      title: 'Ooops...',
      text: 'Usuario y contraseña incorrectos.',
      footer: '<p>¿No tienes una cuenta? Regístrate</p>'
    });
  }

  showErrorCrearUsuario(){
    Swal.fire({
      icon: 'error',
      title: 'Ooops...',
      text: 'Ha ocurrido un error.',
      footer: '<p>Intentelo de nuevo.</p>'
    });
  }

  showErrorFormUsuario(){
    Swal.fire({
      icon: 'error',
      title: 'Ooops...',
      text: 'Sin datos que procesar.',
      footer: '<p>Asegurese de capturar todos los campos.</p>'
    });
  }

  showErrorPass(){
    Swal.fire({
      icon: 'error',
      title: 'Ooops...',
      text: 'Contraseña incorrecta.',
    });
  }

  showLoginCorrecto(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡HAS INGRESADO AL SISTEMA!',
      text: 'BIENVENIDO.',
      showConfirmButton: false,
      timer: 2000
    })
  }

  showCuentaCorrecta(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡El usuario se ha registrado con exito!',
      text: 'BIENVENIDO.',
      showConfirmButton: false,
      timer: 2000
    })
  }

  createFormGroup(){
    return new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
    });
  }

  loginFormGroup(){
    return new FormGroup({
      pausuario: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
  }

  createUser: FormGroup;
  login: FormGroup;

  constructor(private fb: FormBuilder, 
              private _userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute){
    this.createUser = this.createFormGroup();
    this.login = this.loginFormGroup()
  }

  ngOnInit(): void {

  }

  public isLoggedAdmin: boolean = false;

  onResetForm(){
    this.createUser.reset();
    this.login.reset();
  }

  agregarUsuario(){
    if(this.createUser.invalid){
      this.showErrorFormUsuario();
      return;
    }else{
      const usuario: any ={
        usuario: this.createUser.value.usuario,
        password: this.createUser.value.password,
        email: this.createUser.value.email
      }

      this._userService.agregarUsuario(usuario).then(()=>{
        this.showCuentaCorrecta();
        this.onResetForm();
        this.router.navigate(['/productos']);
      }).catch(error =>{
        this.showErrorCrearUsuario();
      });
    }
  }
  
  ingresar(){
      if(this.login.invalid){
        this.showErrorFormUsuario();
        return;
      }

      this.getUsuariosByNombre();
  }

  getUsuariosByNombre(){
    if(this.login.value.pausuario){
      this._userService.getUser(this.login.value.pausuario).subscribe(
        (prod:any[])=>{
          console.log(prod)
          if(prod.length > 0){
            if(this.login.value.pass){
              this._userService.getPassword(this.login.value.pass).subscribe(
                (prod:any[])=>{ console.log(prod)
                  if(prod.length > 0){
                    if ((this.login.value.pausuario = "Admin") && (this.login.value.pass = "54321")){
                      this.isLoggedAdmin = true;
                    }
                    this.isLoggedAdmin = false;
                    this.showLoginCorrecto();
                    this.onResetForm();
                    this.router.navigate(['/productos']);
                  }else{ this.showErrorPass();}
                }
              )
            }
          }else{
            this.showErrorUsuario();
          }
        }
      )
    }
  }

  get pausuario(): any { return this.login.get('pausuario'); }
  get pass(): any { return this.login.get('pass'); }

  get usuario(): any { return this.createUser.get('usuario'); }
  get password(): any { return this.createUser.get('password'); }
  get email(): any { return this.createUser.get('email'); }
}
