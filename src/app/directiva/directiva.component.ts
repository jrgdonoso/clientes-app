import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})




export class DirectivaComponent implements OnInit {


  listaCurso: String[]= ['php','Java', 'Pyton']
  bHabilitar: boolean= true;
 



  constructor() {

   
   }

  ngOnInit() {
  }


  

}
