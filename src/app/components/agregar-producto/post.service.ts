import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { PostI } from '../../shared/models/post.interface';
import { FileI } from '../../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private postsCollection: AngularFirestoreCollection<PostI>;
  private filePath: any;
  private downloadURL!: Observable<string>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.postsCollection = afs.collection<PostI>('Productos');
  }

  public preAddAndUpdatePost(post: PostI, image: FileI): void {
    this.uploadImage(post, image);
  }

  public getAllPosts(): Observable<PostI[]> {
    return this.postsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PostI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  private savePost(post: PostI) {
    const postObj = {
      nombre: post.nombre,
      descripcion: post.descripcion,
      precio: post.precio,
      tipo: post.tipo,
      imagePost: this.downloadURL,
      fileRef: this.filePath
    };

    if (post.id) {
      return this.postsCollection.doc(post.id).update(postObj);
    } else {
      return this.postsCollection.add(postObj);
    }
  }

  public editPostById(post: PostI, newImage?: FileI): void{
    if (newImage) {
      this.uploadImage(post, newImage);
    } 
  }

  public deletePostById(post: PostI) {
    return this.postsCollection.doc(post.id).delete();
  }

  private uploadImage(post: PostI, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.savePost(post);
          });
        })
      ).subscribe();
  }
}