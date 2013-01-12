define(['jquery', 'backbone', 'underscore', 'mustache', 'text!templates/hand.mustache'],
  function ($, Backbone, _, Mustache, Template) {

    var View = Backbone.View.extend({
      tagName: 'li',

      initialize: function () {
        this.model.bind('removedFromHand', this.remove, this);
      },

      events: {
        'click' : 'cast'
      },

      render: function () {
        this.$el.html(Mustache.render(Template, this.model.toJSON()));
        return this;
      },

      cast: function () {
        this.model.cast();
      }

    });

    var Collection = Backbone.View.extend({
      tagName: 'ul',
      className: 'hand',

      initialize: function () {
        this.collection.bind('add', this.add, this);
        this.collection.bind('remove', this.remove, this);
      },

      render: function () {
        var list = document.createDocumentFragment();
        _.each(this.collection.models, function (card){
          var view = new View({model: card});
          list.appendChild(view.render().el);
        });
        this.$el.append(list);
        return this;
      },

      add: function (card) {
        var view = new View({model: card});
        this.$el.append(view.render().el);
      },

      remove: function (card) {
        card.trigger('removedFromHand');
      }

    });

    return Collection;

  }
);

