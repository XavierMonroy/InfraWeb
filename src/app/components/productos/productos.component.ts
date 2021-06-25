import { PostService } from '../agregar-producto/post.service';
import { NgModule, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { PostI } from '../../shared/models/post.interface'
import { ProductosListComponent } from '../productos-list/productos-list.component';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public posts$!: Observable<PostI[]>;

  constructor(private postSvc: PostService) { }

  ngOnInit() {
    this.posts$ = this.postSvc.getAllPosts();
  }
}
