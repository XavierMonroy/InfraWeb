import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  showError(){
    
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
    this.login = this.loginFormGroup();
  }

  ngOnInit(): void {

  }

  onResetForm(){
    this.createUser.reset();
    this.login.reset();
  }

  agregarUsuario(){
    if(this.createUser.invalid)
      return;
    else{
      const usuario: any ={
        usuario: this.createUser.value.usuario,
        password: this.createUser.value.password,
        email: this.createUser.value.email
      }

      this._userService.agregarUsuario(usuario).then(()=>{
        this.toastr.success('El usuario se ha registrado con exito!', 'Usuario Registrado');
        this.router.navigate(['/productos']);
        this.onResetForm();
      }).catch(error =>{
        alert(error);
      });
    }
  }
  
  ingresar(){
      if(this.login.invalid){
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
                    this.router.navigate(['/productos']);
                    this.toastr.info('HAS INGRESADO AL SISTEMA','BIENVENIDO');
                  }else{ this.toastr.error('EL PASSWORD NO ES CORRECTO','ERROR');}
                }
              )
            }
            console.log('PASA');
          }else{
            this.toastr.error('EL USUARIO NO ES CORRECTO','ERROR');
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
