Sherpa.Views.DiscussTodo = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, 'add remove reset', this.render)
	},
	attributes: {
		class: "modal fade"
	},
	template: JST['comments/todo_disc'],
	sub_template: JST['comments/sub'],
	events: {
		"click #reply":"reply"
	},
	render: function(){
		//comments add todo_item form to top of modal, but breaks modal on update
		var modal= this.template({doc: this.model})
		// var todoView = new Sherpa.Views.TodoForm({model: this.model}).render()
	// 	var $todoView = todoView.render().$el
		this.$el.html(modal)
		var that = this
		this.collection.each(function(comment) {
			that.$('#comments').append(that.sub_template({comment: comment}))
			// that.$('#todo_form').html(todoView.$el)
		})
		return this;
	},

	reply: function(event){
		event.preventDefault();
		var replyView = new Sherpa.Views.NewComment({
			parentOb: "todo_list_item",
			parentOb_id: this.model.id,
			collection: this.collection
		})
		$(event.currentTarget).remove();
		this.$el.find('.modal-body').append(replyView.render().$el)
	},
})

