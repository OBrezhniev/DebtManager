var express = require('express');
var router = express.Router();
var config = require('../config.json')

var debtsFunc = require('./debt_funcs.js');
var orderFunc = require('./order_funcs.js');


var companyAccount = config.companyAccount;

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log("Init index");

  //Get all company debts
  debtsFunc.getAllDebts(function(debts){
      //filter only company debts

      console.log("Orders");
      console.log(debts);

      var orderList = [];

      debts.forEach(function (item, index, object) {

          if(item.companyaccount !== companyAccount){
              object.splice(index, 1);
          }
      });

      //Get all orders

      orderFunc.getAllOrdersByCompanyId(function (orders) {

          console.log("Orders");
          console.log(orders);


         // Filter orders
          orders.forEach(function (item, index, object){

              var removeFromTheList = true;

              for(let item of debts){
                  if(item.orderId === item.id){
                      removeFromTheList = false;
                      break;
                  }
              };

              if(removeFromTheList){
                  object.splice(index, 1);
              }
          });

          orderList = orders;

          console.log(orderList);
          var debtList = [[ 2, 3, "0xbbb", 10, true],[4, 5, "0xbbb1111", 20, true]];

          res.render('index', { currentDebt: 1000, orderList: orderList, debtList: debtList});


      });


  });










  //var oList = [[1,"Det","0xtest", true, "0xtet" ],["1", "test","0xed9d02e382b34818e88b88a309c7fe71e65f419d", false, "0xed9d02e382b34818e88b88a309c7fe71e65f419d"]];



});

module.exports = router;
