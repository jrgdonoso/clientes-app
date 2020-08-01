import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  //public  listaCliente:Cliente[]=[];
  listaClientes: Cliente[];

  constructor(private miClienteService: ClienteService) {

  }


  ngOnInit() {


    this.miClienteService.getClientes().subscribe(
      clientes => this.listaClientes = clientes
   );

   /* this.miClienteService.getClientes().subscribe(
      function(clientes){
        this.listaClientes = clientes;
        console.log("llega hasta aca "+clientes)
      }.bind(this)
    );*/





  }



}
