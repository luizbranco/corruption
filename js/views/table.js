define(['jquery', 'backbone', 'underscore', 'mustache', 'text!templates/hand.mustache'],
  function ($, Backbone, _, Mustache, Template) {

    var View = Backbone.View.extend({
      tagName: 'li',

      render: function () {
        $(this.el).html(Mustache.render(Template, this.model.toJSON()));
        return this;
      }

    });

    var Collection = Backbone.View.extend({
      tagName: 'ul',
      className: 'table',

      initialize: function () {
        this.collection.bind('add', this.add, this);
      },

      render: function () {
        var list = document.createDocumentFragment();
        _.each(this.collection.models, function (card){
          var view = new View({model: card});
          list.appendChild(view.render().el);
        });
        $(this.el).append(list);
        return this;
      },

      add: function (card) {
        var view = new View({model: card});
        $(this.el).append(view.render().el);
      }

    });

    return Collection;

  }
);