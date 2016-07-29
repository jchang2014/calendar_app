var EventsList = React.createClass({
  getDefaultProps: function() {
    return{
      events: [],
      formattedMoment: ""
    };
  },

  renderEvents: function() {
    var {events, formattedMoment} = this.props;
    var listEvents = [];

    // ajax request db for events matching given date
    // parse json into array
    // return li for each event in array
    events.map(function(event,i) {
      var title = event.title;
      var description = event.description;
      var key = "event_" + i;

      listEvents.push(
        <li className="list-group-item col-xs-9" key={key}>
          <div className="row">
            <div className="col-xs-9">
              <b>{title}</b>
              <p>{description}</p>
            </div>
            <div className="col-xs-2 col-xs-offset-1">
              <button className="btn btn-primary edit-btn">Edit</button>
            </div>
          </div>
        </li>
      );
    });

    return listEvents;
  },

  render: function() {
    var formattedMoment = this.props.formattedMoment;
    var events = this.renderEvents();

    return(
      <div className="events row">
        <div className ="col-xs-7">
          <h3>Here are the events for {formattedMoment}</h3>
          <ul className="list-group">
            {events}
          </ul>
        </div>
      </div>
    );
  }
});