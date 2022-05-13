/* exported Bank */
function Bank() {
  this.accounts = [];
  this.nextAccountNumber = 1;
}

Bank.prototype.openAccount = function (holder, balance) {
  if (typeof balance === 'number' && balance > 0 && Number.isInteger(balance)) {

    var gg = new Account(this.nextAccountNumber, holder);

    gg.deposit(balance);

    this.accounts.push(gg);
    this.nextAccountNumber++;
    return gg.number;
  } else {
    return null;
  }
};

Bank.prototype.getAccount = function (number) {

  if (this.accounts.length === 0) {
    return null;
  }

  for (var i = 0; i < this.accounts.length; i++) {

    if (this.accounts[i].number === number) {

      return this.accounts[i];

    }
  }
  return null;
};

Bank.prototype.getTotalAssets = function () {
  if (this.accounts.length === 0) {
    return 0;
  }

  var answer = 0;
  for (var i = 0; i < this.accounts.length; i++) {

    answer += this.accounts[i].getBalance();

  }
  return answer;

};
