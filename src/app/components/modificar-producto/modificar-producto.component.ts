import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { PostI } from '../../shared/models/post.interface';
import { PostService } from '../agregar-producto/post.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {
  private image: any;

  @Input() producto$!: PostI;

  constructor(private postSvc: PostService, private router: Router) { 

  }

  public formEditProducto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  });

  ngOnInit() {
    console.log(this.producto$);
  }

  ngOnChanges(){
    console.log(this.producto$);
  }

  actualizarProducto(post: PostI) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No se podrán revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar producto!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postSvc.deletePostById(this.producto$).then(()=>{
          console.log('Update post', post);
          this.postSvc.preAddAndUpdatePost(post, this.image);
          this.formEditProducto.reset();
          Swal.fire(
            'Actualizado!',
            'Tu producto ha sido actualizado.',
            'success'
          )
          this.router.navigate(['/productos']);
        }).catch(error =>{
          this.showErrorActualizarProducto();
          return;
        });
      }
    })
  }

  showErrorActualizarProducto(){
    Swal.fire({
      icon: 'error',
      title: 'Ooops...',
      text: 'Ha ocurrido un error.',
      footer: '<p>Intentelo de nuevo.</p>'
    });
  }


  handleImage(event: any): void {
    this.image = event.target.files[0];
  }
}
