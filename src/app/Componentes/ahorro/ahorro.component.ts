import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ahorro',
  templateUrl: './ahorro.component.html',
  styleUrls: ['./ahorro.component.css']
})
export class AhorroComponent implements OnInit {
  
  sueldoAhorro:number;
  capacidadAhorro:number;
  deseo:string;
  precio:number;
  pago:number;
  resultado:string;
  totalMeses:number;
  totalA:number;

  bandera:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.bandera = false;
  }

  manda(){
    this.bandera = true;
    this.pago = (this.capacidadAhorro * this.sueldoAhorro)/100;
    //console.log(this.pago);
    this.totalMeses = this.precio/this.pago;
    //console.log(totalMeses);
    this.totalA = this.totalMeses/12;
    //console.log(totalA);
    //return this.resultado = `Para comprar mi ${this.deseo}, el cual cuesta ${this.precio}, puedo dar un pago mensual de ${this.pago}, con lo que lo podre comorar en ${totalMeses} meses, lo que equivale a ${totalA} años`;
  }

}
