pragma solidity ^0.4.0;


contract DebtManager {

    //Company address | name, by company address we will have a name and can chack that company exist
    mapping(address => string) public companies;

    struct Order{
        uint id;
        string details;
        address moneyHolderAccount; // TODO:Name ??
        bool finalize;
        address owner;

    }

    struct Debt{

        uint id;
        uint orderId;

        address companyAccount;
        uint amount;
        bool isAgree;
    }

    uint debtId; // auto increment unique id
    uint orderId; // auto increment unique id


    Order[] orderArr; // array of orders
    Debt[] debtArr;



    //---------------------------------------------------
    // Functions

    //Constructor
    function DebtManager() {

        //TODO: predefine data
    }



    //Create
    function createOrder(string details, address moneyHolderAccount) returns(uint) {
        orderArr.push(Order(orderId, details, moneyHolderAccount, false,msg.sender));

        orderId++;
        return --orderId;
    }

    function createDebt(uint orderId, address companyAccountress, uint amount) returns(uint){
        //TODO: check if company in a company list

        //TODO: check if order id in the order list, probably with order index or just with index if we do not delete orders

        debtArr.push(Debt(debtId, orderId, companyAccountress, amount, false));

        debtId++;
        return --debtId;
    }


    //Update

    function isAgreeDebt(uint debtId){

        var debt = debtArr[debtId];

        if(debt.companyAccount == msg.sender){
            debt.isAgree = true;
        }
    }

    //Get constant

    function getOrderLength() constant returns(uint){
        return orderId;
    }

    function getDebtLength() constant returns(uint){
        return debtId;
    }

    function getOrderById(uint orderId) constant returns( uint id,
                                                          string details,
                                                          address moneyHolderAccount,
                                                          bool finalize,
                                                          address owner){

        Order order = orderArr[orderId];

        return(order.id, order.details, order.moneyHolderAccount, order.finalize, order.owner);

    }

    function getDebtById(uint debtId) constant returns(
                                                        uint id,
                                                        uint orderId,
                                                        address companyAccount,
                                                        uint amount,
                                                        bool isAgree){

        Debt debt = debtArr[debtId];

        return (debt.id, debt.orderId, debt.companyAccount, debt.amount, debt.isAgree);
    }

}