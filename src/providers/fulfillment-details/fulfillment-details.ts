import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import * as Constants from '../../config'
import * as moment from 'moment';



/*
  Generated class for the FulfillmentDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FulfillmentDetailsProvider {
  ordersTableData:any;
  disableFulfillment:boolean=false;

  constructor(public http:HttpServiceProvider, public _http : HttpClient) {
    console.log('Hello FulfillmentDetailsProvider Provider');
    this.ordersTableData = []; 
  }




  getFulfillmentDetails(object){
  
   return this.http.post("v2/dashboard/subscription/fetchFulfillments",object)
    
  }

  generateFulfillmentTableData(fulfilmentList){
   
    this.ordersTableData = [];
    let now = moment();
    fulfilmentList.forEach(data => {
      let amount = 0;
      let obj:any = {};
      obj.shopId = data.fulfillment.shopId;
      obj.customerId = data.fulfillment.customerId;
      obj.customerName = data.customerName;
      obj.mobileNumber = data.mobileNumber;
      obj.status = data.fulfillment.status;
      obj.deliveryDate = data.fulfillment.deliveryDate;
      obj.slot = data.fulfillment.slotFrom +" to "+data.fulfillment.slotTo;
      obj.city = data.address.city;
      obj.subscriptionId = data.fulfillment.subscriptionId;
      obj.address = data.address;
      obj.subscriptionOrderItems = data.subscriptionOrderItems;
      obj.fulfillmentId = data.fulfillment.id;
      obj.actualOrderId = data.fulfillment.actualOrderId;
      obj.paymentMethod = data.paymentMethod;
      obj.subscriptionOrderId = data.subscriptionOrderId;
      obj.originalStoreCode = data.fulfillment.originalStoreCode;
      obj.confirmationLink = data.confirmationLink;
      obj.confirmed = data.fulfillment.confirmed;
      obj.subscriptionOrderItems.forEach(element => {
        amount += element.amount*element.quantity
      });
      obj.totalOrderAmount = amount;
      obj.paymentDone = data.fulfillment.paymentDone;
      obj.reason = data.fulfillment.reason;

      if(moment(data.fulfillment.deliveryDate).isAfter(now)){
        obj.disable = true;
       }else{
         obj.disable=false;
       }
       obj.orderSentToMerchant = data.fulfillment.orderSentToMerchant;
      this.ordersTableData.push(obj);

    });

    return this.ordersTableData;
  }

  updateFulfillmentStatus(order){
    return this.http.post("v2/dashboard/subscription/fulfillment/update/"+order.fulfillmentId+"/subscription/"+order.subscriptionId+"/"+order.status,{})
  }

  downloadFullfillmentReport(data){
    return this._http.post(Constants.URL+"/v2/dashboard/subscription/fetchFulfillments/download",data,{responseType: 'text'})
  }
  
  printBill(orderId,bags){
    return this.http.get("v1/bill/generateSalesBillV2/"+orderId+"?printed=false&getBill=true&billSize=BIG&billType=HOME_DELIVERY_CHALLEN&deliveryBags="+bags);
  }

}
