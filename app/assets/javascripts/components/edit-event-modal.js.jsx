var EditEventModal = React.createClass({
  getInitialState: function() {
    return {
      description: null,
      id: null,
      title: null
    };
  },

  componentWillReceiveProps: function(newProps) {
    var event = newProps.event;
    if (event) {
      this.setState({
        description: event.description,
        id: event.id,
        title: event.title
      });
    }
  },

  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },

  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
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
    var {formattedMoment, hideModalHandler, showModal} = this.props;
    var {description, id, title} = this.state;

    return(
      <ReactBootstrap.Modal bsSize="medium" show={showModal} onHide={hideModalHandler}>
        <ReactBootstrap.Modal.Header>
          <button type="button" className="close" aria-hidden="true" onClick={hideModalHandler}>&times;</button>
          <div className="row text-center">
            <h3>Edit this event</h3>
          </div>
        </ReactBootstrap.Modal.Header>

        <ReactBootstrap.Modal.Body>
          <form className="edit-event-form">
            <input name="id" type="hidden" value={id} />
            <div className="row">
              <div className="form-group col-xs-6 col-xs-offset-3">
                <label>Event Title</label>
                <input className="form-control"
                  name="title"
                  onChange={this.handleTitleChange}
                  type="text"
                  value={title}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-xs-6 col-xs-offset-3">
                <label>Event Description</label>
                <input className="form-control"
                  name="description"
                  onChange={this.handleDescriptionChange}
                  type="text"
                  value={description}
                />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <button className="btn btn-primary update-btn"
                  onClick={this.saveClickHandler(formattedMoment)}
                  type="submit"
                  value="update"
                >Update</button>
              </div>
            </div>
          </form>
        </ReactBootstrap.Modal.Body>
      </ReactBootstrap.Modal>
    );
  }
});