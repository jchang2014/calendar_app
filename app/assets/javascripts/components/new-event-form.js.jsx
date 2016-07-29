var NewEventForm = React.createClass({
  getDefaultProps: function() {
    return {
      formattedMoment: ""
    };
  },

  saveClickHandler: function() {
    var formattedMoment = this.props.formattedMoment;
    var onSaveClick = this.props.onSaveClick;

    return function(e) {
      e.preventDefault();
      onSaveClick(formattedMoment);
    };
  },

  render: function() {
    var formattedMoment = this.props.formattedMoment;

    return(
      <div className="event-form row">
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
            <button className="btn btn-primary save-btn" type="submit" onClick={this.saveClickHandler(formattedMoment)}>Save</button>
          </form>
        </div>
      </div>
    );
  }
});