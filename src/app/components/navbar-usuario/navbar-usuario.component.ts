import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-usuario',
  templateUrl: './navbar-usuario.component.html',
  styleUrls: ['./navbar-usuario.component.css']
})
export class NavbarUsuarioComponent implements OnInit {

  @Input() isLoggedAdmin!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
