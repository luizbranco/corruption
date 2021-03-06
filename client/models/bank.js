define(['backbone', 'config'], function (Backbone, config) {

  var Bank = Backbone.Model.extend({

    initialize: function (croupier) {
      this.set('funds', config.startingFunds);
    },

    payCost: function (amount) {
      if (this.get('funds') - amount <= 0) { return false; }
      this.removeFunds(amount);
      return true;
    },

    addFunds: function (amount) {
      var funds = this.get('funds') + amount;
      this.set('funds', funds);
      return this.get('funds');
    },

    removeFunds: function (amount) {
      var funds = this.get('funds') - amount;
      this.set('funds', funds);
      if (funds <= 0) { throw 'DEAD!' }
      return this.get('funds');
    }

  });

  return Bank;

});
