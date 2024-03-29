import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { PostI } from '../../shared/models/post.interface';
import { PostService } from './post.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  @Input() nombreP?: string;
  @Input() descripcionP?: string;
  @Input() precioP?: string;
  @Input() tipoP?: string;
  @Input() imagenP?: any;

  @Input() guardar!: boolean;

  private image: any;

  constructor(private postSvc: PostService) { 

  }

  public formProducto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  });

  ngOnInit() {

  }

  agregarProducto(data: PostI) {
    console.log('New post', data);
    this.postSvc.preAddAndUpdatePost(data, this.image);
    alert("Datos ingresados correctamente.");
    this.formProducto.reset();
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }
}
