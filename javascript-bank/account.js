/* exported Account */
function Account(number, holder) {
  this.number = number;
  this.holder = holder;
  this.transactions = [];
}

Account.prototype.deposit = function (amount) {
  if (typeof amount === 'number' && amount > 0 && Number.isInteger(amount)) {
    this.transactions.push(new Transaction('deposit', amount));
    return true;
  } else {

    return false;
  }
};

Account.prototype.withdraw = function (amount) {
  if (typeof amount === 'number' && amount > 0 && Number.isInteger(amount)) {
    this.transactions.push(new Transaction('withdrawal', amount));
    return true;
  } else {

    return false;
  }
};

Account.prototype.getBalance = function () {
  if (this.transactions.length === 0) {
    return 0;
  }
  var total = 0;
  for (var i = 0; i < this.transactions.length; i++) {
    if (this.transactions[i].type === 'deposit') {
      total += this.transactions[i].amount;
    } else {
      total -= this.transactions[i].amount;
    }
  }
  return total;
};
