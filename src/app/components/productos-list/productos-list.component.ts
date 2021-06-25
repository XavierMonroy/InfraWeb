import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../agregar-producto/post.service';
import { PostI } from '../../shared/models/post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {
  // public posts$: Observable<PostI[]>;
  @Input() post!: PostI;

  constructor(private postSvc: PostService) { }

  ngOnInit() {
    // this.posts$ = this.postSvc.getAllPosts();
  }
}
