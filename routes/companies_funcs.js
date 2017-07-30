'use strict';

var config = require('../config.json')
var helper = require('../helpers/helper');
var contractArtifact = require('../build/contracts/DebtManager.json');
var Web3 = require('web3');
var web3 = new Web3();

var account = config.account;

var contract = require("truffle-contract");
var DebtManager = contract(contractArtifact);

var provider = new Web3.providers.HttpProvider(config.peerurl);
web3 = new Web3(provider);
DebtManager.setProvider(provider);
var deployed;


/**
 * Get all companies
 */
function getAllCompanies(callback) {
    var p = [];

    for (var i = 0; i < 3; i++) {
        var a = new Promise((resolve, reject) => {
            getCompanyById(i, function (response) {
                resolve(response);
            });
        });
        p.push(a);
    }
    Promise.all(p).then(values => {
        callback(values);
    });

    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.getOrderById.call(id);
            // Do something with the result or continue with more transactions.
        })

}


function getCompanyById(id, callback) {
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.companies.call(id);
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            callback(response);
        });
}

module.exports = {
    getAllCompanies: getAllCompanies
};