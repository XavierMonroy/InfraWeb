import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private firestore: AngularFirestore) { 

  }
  
  agregarUsuario(usuario:any): Promise<any>{
    return this.firestore.collection('Usuarios').add(usuario);
  }

  getUser(usuario:string):Observable<any>{
    return this.firestore.collection('Usuarios', ref => ref.where('usuario','==', usuario)).valueChanges();
  }

  getPassword(iPassword:string): Observable<any>{
    return this.firestore.collection('Usuarios', ref => ref.where('password','==', iPassword)).valueChanges();
  }

  elimminarUsuario(id:string): Promise<any>{
    return this.firestore.collection('Usuarios').doc(id).delete();
  }

  actualizarUser(id:string, data:any):Promise<any>{
    return this.firestore.collection('Usuarios').doc(id).update(data);
  }

  getEmail(iEmail:string): Observable<any>{
    return this.firestore.collection('Usuarios', ref => ref.where('email','==', iEmail)).valueChanges();
  }

  agregarProducto(producto:any): Promise<any>{
    return this.firestore.collection('Productos').add(producto);
  }
}
