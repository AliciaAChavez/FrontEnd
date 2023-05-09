import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';

import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  persona: persona = new persona("","","","");
  
  constructor(public personaS: PersonaService,
    private router: Router,
    private activatedRouter : ActivatedRoute, 
    private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.personaS.getPersona().subscribe(data => {this.persona = data})

    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

  }

  onUpdate(): void{
    
    this.personaS.update(this.persona).subscribe(
      /*data => {this.persona = data})*/
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar la informacion");
        this.router.navigate(['']);
      }
    )
    
  }

}
