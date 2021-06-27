import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-usuario',
  templateUrl: './navbar-usuario.component.html',
  styleUrls: ['./navbar-usuario.component.css']
})
export class NavbarUsuarioComponent implements OnInit {

  @Input() isLoggedAdmin!: boolean;

  constructor(private afAuth: AngularFireAuth) { 
    
  }

  ngOnInit(): void {

  }

  cerrarSesion(): Promise<void>{
    this.isLoggedAdmin = false;
    return this.afAuth.signOut();
  }

}
