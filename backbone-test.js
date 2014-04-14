var TestModel = Backbone.Model.extend();

var TestCollection = Backbone.Collection.extend({
    model: TestModel
});
var tests = new TestCollection;

var TestView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('Nome: <%= name %> <a href="#" class="destroy">Remover</a>'),

    events: {
        'click a.destroy': 'destroy'
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    destroy: function () {
        this.model.destroy();
    }
});

var TestAppView = Backbone.View.extend({
    el: '#testeapp',

    events: {
        'click #add': 'createModel'
    },

    initialize: function () {
        this.listenTo(tests, 'add', this.addOne);
        this.listenTo(tests, 'all', this.render);

        this.$list = this.$('#list');
        this.$count = this.$('#count');

        this.currentModel = 1;
    },

    createModel: function () {
        tests.create({ name: 'Novo Modelo #' + (this.currentModel++) });
    },

    addOne: function (teste) {
        var view = new TestView({ model: teste });
        this.$list.append(view.render().el);
    },

    render: function () {
        if (tests.length > 0) {
            this.$count.text(tests.length);
            this.$count.show();
        } else {
            this.$count.hide();
        }
    }
});

$(function() {
    var models = [
        new TestModel({ name: 'Nome #1' }),
        new TestModel({ name: 'Nome #2' }),
        new TestModel({ name: 'Nome #3' })
    ];

    var app = new TestAppView;
});
