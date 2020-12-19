import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})

export class NewPostComponent implements OnInit {

  // Varibles for select dialog set data
  tipoCredito = "";
  plazo = "";
  periocidadCredito = "";


  public newPostForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  setData(propositoCredito, montoSolicitado, email, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento,
    rfc, ciudad, colonia, municipio, estado, codigoPostal, numeroTelefono) {
    const idCustom = this.db.createId();
    // Here we insert into the database
    this.db.collection('posts').doc(`${idCustom}`).set({
      id: idCustom,
      tipoCredito: this.tipoCredito,
      propositoCredito: propositoCredito,
      montoSolicitado: montoSolicitado,
      plazo: this.plazo,
      periocidadCredito: this.periocidadCredito,
      email: email,
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      fechaNacimiento: fechaNacimiento,
      rfc: rfc,
      ciudad: ciudad,
      colonia: colonia,
      municipio: municipio,
      estado: estado,
      codigoPostal: codigoPostal,
      numeroTelefono: numeroTelefono
    })
  }

  constructor(private authSvc: AuthService, private db: AngularFirestore) { }

  ngOnInit(): void {
    // Get the user email
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);
    });

    // Event listener for submit button
    const form = document.querySelector("#form")
    form.addEventListener('submit', e => {
      // Clling the all elements with selector
      let propositoCredito = (<HTMLInputElement>document.querySelector('#propositoCredito')).value;
      let montoSolicitado = (<HTMLInputElement>document.querySelector('#montoSolicitado')).value;
      let email = (<HTMLInputElement>document.querySelector('#email')).value;
      let nombre = (<HTMLInputElement>document.querySelector('#nombre')).value;
      let apellidoPaterno = (<HTMLInputElement>document.querySelector('#apellidoPaterno')).value;
      let apellidoMaterno = (<HTMLInputElement>document.querySelector('#apellidoMaterno')).value;
      let fechaNacimiento = (<HTMLInputElement>document.querySelector('#fechaNacimiento')).value;
      let rfc = (<HTMLInputElement>document.querySelector('#rfc')).value;
      let ciudad = (<HTMLInputElement>document.querySelector('#ciudad')).value;
      let colonia = (<HTMLInputElement>document.querySelector('#colonia')).value;
      let municipio = (<HTMLInputElement>document.querySelector('#municipio')).value;
      let estado = (<HTMLInputElement>document.querySelector('#estado')).value;
      let codigoPostal = (<HTMLInputElement>document.querySelector('#codigoPostal')).value;
      let numeroTelefono = (<HTMLInputElement>document.querySelector('#numeroTelefono')).value;

      // Lets call the function and add the parameters to arrive into collection firebase 
      //this.setData(propositoCredito, montoSolicitado, email, nombre);
      this.setData(propositoCredito, montoSolicitado, email, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento,
        rfc, ciudad, colonia, municipio, estado, codigoPostal, numeroTelefono)
    })
  }

  private initValuesForm(user): void {
    this.newPostForm.patchValue({
      // Set the email
      email: user.email,
    });
  }
}
