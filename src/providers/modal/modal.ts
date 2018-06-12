import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';
import { CsvmodalPage } from '../../pages/csvmodal/csvmodal';
import { DeleteconfirmationPage } from '../../pages/deleteconfirmation/deleteconfirmation';
import { CatalogProvider } from '../catalog/catalog';

/*
  Generated class for the ModalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ModalProvider {

  deleteModal:any;

  constructor(public modal: ModalController,public catalogProvider:CatalogProvider) {
    console.log('Hello ModalProvider Provider');
  }

  showFileUploadModal(shopId){
    let profileModal = this.modal.create(CsvmodalPage,{'shopId':shopId});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  deleteConfirmationModal(data){
    this.deleteModal = this.modal.create(DeleteconfirmationPage,{'data':data});
    this.deleteModal.onDidDismiss(data => {
      
    });
    this.deleteModal.present();

    

   
  }

  dismissDeleteModal(){
    this.deleteModal.dismiss();
  }
  

}