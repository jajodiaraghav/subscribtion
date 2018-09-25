import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  errors: any[] = [];
  catalogError:any;
  productList:any[]=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams ,public viewCtrl:ViewController) {

  
      this.errors = navParams.get('errors');
      console.log(this.errors)
    if(navParams.get('catalogErr')){
      this.catalogError = JSON.parse(navParams.get('catalogErr'));
      if(this.catalogError.subscriptionProducts){
        this.productList = this.catalogError.subscriptionProducts;
      }
      
    }else{
      this.catalogError = this.errors;
    }

    console.log('Catalog Error',this.catalogError)
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ErrorPage');
  }
  close(){
    this.viewCtrl.dismiss();
  }

}
