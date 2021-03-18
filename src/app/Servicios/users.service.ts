import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../Modelos/usuario.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dineros } from '../Modelos/dinero.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class UsersServicio{
    //Coleccion y documentos de DB Firestore
    //Se marcan como error hasta que se inician en el constructor
    usersColeccion:AngularFirestoreCollection<Usuario>;
    userDocumento:AngularFirestoreDocument<Usuario>;

    //Variables Observables que interactuan con la DB
    users:Observable<Usuario[]>;
    user: Observable<Usuario>;

    ingresos:Dineros[] = [];
    gastosFijos:Dineros[] = [];
    gastosVariables:Dineros[] = [];

    ingresoMensual:number = 0;
    egresoMensual:number = 0;
    totalGastosFijos:number = 0;
    totalGastosVariables:number = 0;
    capacidadAhorro:number = 0;

    //Iniciamos contructor que guarda la DB de firebase
    constructor(private db:AngularFirestore, private authService:AngularFireAuth){
        //Orden en que obtiene los valores y se le asigna los valores de la db
        this.usersColeccion = this.db.collection('users', ref => ref.orderBy('nombre', 'desc'));


        //Obtener usuarios en Users
        this.users = this.usersColeccion.snapshotChanges().pipe(map(items => {
            return items.map(accion =>{
                const datos = accion.payload.doc.data() as Usuario;
                datos.id = accion.payload.doc.id;
                return datos;
            })
        }));

    }
    getUsers(){
        return this.users;
    }

    getAuth(){
        return this.authService.authState.pipe(
            map(
                auth => auth
            )
        )
    }

    getIngresosMensuales(){
        this.ingresoMensual = 0;
        this.ingresos.forEach(ingreso => {
            this.ingresoMensual += ingreso.valor;
        });
        return this.ingresoMensual;
    }

    getTotalGastosFijos(){
        this.totalGastosFijos = 0;
        this.gastosFijos.forEach(gf => {
            this.totalGastosFijos += gf.valor;
        });
        return this.totalGastosFijos;
    }

    getTotalGastosVariables(){
        this.totalGastosVariables = 0;
        this.gastosVariables.forEach(gv => {
            this.totalGastosVariables += gv.valor;
        });
        return this.totalGastosVariables;
    }

    getEgresoMensual(){
        return this.egresoMensual = this.getTotalGastosFijos() + this.getTotalGastosVariables();
    }

    getCapacidadAhorro(){
        return this.capacidadAhorro = (this.getIngresosMensuales() - this.getEgresoMensual())/this.getIngresosMensuales();
    }


}