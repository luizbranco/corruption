define(['jquery', 'underscore', 'backbone', 'mustache', 'text!templates/turn_manager.mustache'],
function ($, _, Backbone, Mustache, Template) {

  var View = Backbone.View.extend({

    initialize: function () {
      this.model.bind('change', this.render, this);
    },

    events: {
      'click .next-phase' : 'nextPhase',
      'click .end-turn' : 'endTurn',
      'click .combat-phase' : 'attack'
    },

    render: function () {
      var template = Mustache.render(Template, this.attr());
      this.$el.html(template);
      return this;
    },

    nextPhase: function () {
      this.model.nextPhase();
    },

    endTurn: function () {
      this.model.endTurn();
    },

    attack: function () {
      this.model.attack();
    },

    attr: function () {
      var phase = this.model.get('phase');
      return {
        phase: phase,
        nextPhase: phase === 'main-1' || phase === 'combat',
        combatPhase: this.model.attackQueue.length,
        endTurn: phase === 'main-2'
      }
    }

  });

  return View;
});
