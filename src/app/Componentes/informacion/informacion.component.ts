import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/Modelos/usuario.model';
import { UsersServicio } from 'src/app/Servicios/users.service';
import { Dineros } from 'src/app/Modelos/dinero.model';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})

export class InformacionComponent implements OnInit {

  users:Usuario[];
  
  ingresos:Dineros[] = [];
  gastosFijos:Dineros[] = [];
  gastosVariables:Dineros[] = [];

  ingresoMensual:number = 0;
  egresoMensual:number = 0;
  totalGastosFijos:number = 0;
  totalGastosVariables:number = 0;
  capacidadAhorro:number = 0;
  
  selector:Event;
  tipo:string;
  descripcion:string;
  valor:number;

  constructor(
    private userServicio:UsersServicio
  ) { }
  ngOnInit(): void {
    //console.log('ngOnInit de informacion.component.ts corriendo');
    this.userServicio.getUsers().subscribe(items => {
      console.log(items);
      this.users = items;
    });
      
    this.ingresos = this.userServicio.ingresos;
    this.gastosFijos = this.userServicio.gastosFijos;
    this.gastosVariables = this.userServicio.gastosVariables;

    this.userServicio.getAuth().subscribe(auth => {
      if(auth){
      }
    });

  }

  tipoOperacion(selector:any){
    this.tipo = selector.target.value;
    //console.log(this.tipo);
  }

  agregarValor(){
    if(this.tipo === 'ingreso'){
      this.userServicio.ingresos.push(new Dineros(this.descripcion, this.valor));
      this.descripcion = '';
      this.valor = 0;
      this.ingresoMensual = this.userServicio.getIngresosMensuales();
      this.capacidadAhorro = this.userServicio.getCapacidadAhorro();
    }else if(this.tipo === 'gastoFijo'){
      this.userServicio.gastosFijos.push(new Dineros(this.descripcion, this.valor));
      this.descripcion = '';
      this.valor = 0;
      this.totalGastosFijos = this.userServicio.getTotalGastosFijos();
      this.egresoMensual = (this.userServicio.getTotalGastosFijos() + this.userServicio.getTotalGastosVariables() );
      this.capacidadAhorro = this.userServicio.getCapacidadAhorro();
    }else if(this.tipo === 'gastoVariable'){
      this.userServicio.gastosVariables.push(new Dineros(this.descripcion, this.valor));
      this.descripcion = '';
      this.valor = 0;
      this.totalGastosVariables = this.userServicio.getTotalGastosVariables();
      this.egresoMensual = (this.userServicio.getTotalGastosFijos() + this.userServicio.getTotalGastosVariables() );
      this.capacidadAhorro = this.userServicio.getCapacidadAhorro();
    }else{
      alert('Selecciona alguna opción');
    }
  }

  eliminarIngreso(ingreso:Dineros){
    const indice:number = this.ingresos.indexOf(ingreso);
    this.ingresos.splice(indice, 1);
    this.ingresoMensual = this.userServicio.getIngresosMensuales();
    this.capacidadAhorro = this.userServicio.getCapacidadAhorro();
  }

  eliminargf(gastof:Dineros){
    const indice:number = this.gastosFijos.indexOf(gastof);
    this.gastosFijos.splice(indice, 1);
    this.totalGastosFijos = this.userServicio.getTotalGastosFijos();
    this.egresoMensual = (this.userServicio.getTotalGastosFijos() + this.userServicio.getTotalGastosVariables() );
    this.capacidadAhorro = this.userServicio.getCapacidadAhorro();
  }

  eliminargv(gastov:Dineros){
    const indice:number = this.gastosVariables.indexOf(gastov);
    this.gastosVariables.splice(indice, 1);
    this.totalGastosVariables = this.userServicio.getTotalGastosVariables();
    this.egresoMensual = (this.userServicio.getTotalGastosFijos() + this.userServicio.getTotalGastosVariables() );
    this.capacidadAhorro = this.userServicio.getCapacidadAhorro();
  }



}
