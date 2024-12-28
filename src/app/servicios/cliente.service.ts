import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.modelo';
import {
  collection,
  collectionData,
  docData,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  clientes: Observable<Cliente[]>;
  private clientesRef: any;

  constructor(private firestore: Firestore) {
    // Realizamos una consulta para obtener el listado de clientes
    this.clientesRef = collection(this.firestore, 'clientes');
    const consulta = query(this.clientesRef, orderBy('nombres', 'asc'));
    this.clientes = collectionData(consulta, {idField: 'id'}) as Observable<Cliente[]>;
  }

  getClientes(): Observable<Cliente[]> {

    console.log("Observable=>" , this.clientes);
    return this.clientes;
  }

  agregarCliente(cliente: Cliente){
    console.log(cliente);
    return addDoc(this.clientesRef, cliente);
  }

  getCliente(id: string): Observable<Cliente | null>{
    const clienteRef = doc(this.firestore, `clientes/${id}`);
    return docData(clienteRef, {idField: 'id'}) as Observable<Cliente>;
  }

  modificarCliente(cliente: Cliente){
    const clienteDoc = doc(this.firestore, `clientes/${cliente.id}`);
    return updateDoc(clienteDoc, {...cliente});
  }

  eliminarCliente(cliente: Cliente){
    const clienteDoc = doc(this.firestore, `clientes/${cliente.id}`);
    return deleteDoc(clienteDoc);
  }
}
