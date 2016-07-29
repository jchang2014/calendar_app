var NewEventForm = React.createClass({
  getDefaultProps: function() {
    return {
      formattedMoment: ""
    };
  },

  saveClickHandler: function(formattedMoment) {
    var onSaveClick = this.props.onSaveClick;

    return function(e) {
      e.preventDefault();
      var action = e.target.value;
      onSaveClick(formattedMoment, action);
    };
  },

  render: function() {
    var formattedMoment = this.props.formattedMoment;

    return(
      <div className="new-event-form row">
        <div className="col-xs-7">
          <h3>Create a new event</h3>
          <form>
            <div className="form-group col-xs-4">
              <label>Event Title</label>
              <input className="form-control" name="title" type="text"/>
            </div>
            <div className="form-group col-xs-6">
              <label>Event Description</label>
              <input className="form-control" name="description" type="text"/>
            </div>
            <button className="btn btn-primary save-btn"
              onClick={this.saveClickHandler(formattedMoment)}
              type="submit"
              value="create"
            >Save</button>
          </form>
        </div>
      </div>
    );
  }
});