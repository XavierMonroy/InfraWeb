import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../agregar-producto/post.service';
import { PostI } from '../../shared/models/post.interface';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {
  // public posts$: Observable<PostI[]>;
  @Input() post!: PostI;
  @Input() isLoggedAdmin!: boolean;

  constructor(private postSvc: PostService, private router: Router, private aRoute: ActivatedRoute) { }

  ngOnInit() {

  }

  showErrorEliminarProducto(){
    Swal.fire({
      icon: 'error',
      title: 'Ooops...',
      text: 'Ha ocurrido un error.',
      footer: '<p>Intentelo de nuevo.</p>'
    });
  }

  eliminarProducto(post: PostI){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No se podrán revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar producto!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postSvc.deletePostById(post).then(()=>{
          Swal.fire(
            'Eliminado!',
            'Tu producto ha sido eliminado.',
            'success'
          )
          this.router.navigate(['/productos']);
        }).catch(error =>{
          this.showErrorEliminarProducto();
          return;
        });
      }
    })
  }

  producto$!: PostI;

  actualizarProducto(post: PostI){
    this.producto$ = post;
    console.log(this.producto$);
    console.log(post);
    this.router.navigate(['/modificar-producto']);
  }
}
