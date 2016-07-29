var EditEventModal = React.createClass({
  getDefaultProps: function() {
    return {
      formattedMoment: "",
      showModal: false
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
    var {formattedMoment, hideModalHandler, showModal} = this.props;

    return(
      <ReactBootstrap.Modal bsSize="medium" show={showModal} onHide={hideModalHandler}>
        <ReactBootstrap.Modal.Header>
          <button type="button" className="close" aria-hidden="true" onClick={hideModalHandler}>&times;</button>
          <div className="row text-center">
            <h3>Edit this event</h3>
          </div>
        </ReactBootstrap.Modal.Header>

        <ReactBootstrap.Modal.Body>
          <form className="">
            <div className="row">
              <div className="form-group col-xs-6 col-xs-offset-3">
                <label>Event Title</label>
                <input className="form-control" name="title" type="text"/>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-xs-6 col-xs-offset-3">
                <label>Event Description</label>
                <input className="form-control" name="description" type="text"/>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-offset-3">
                <button className="btn btn-primary save-btn"
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