var Calendar = React.createClass({
  getDefaultProps: function() {
    var months = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    return {months: months};
  },

  getInitialState: function() {
    var today = moment();
    var thisDate = today.date();
    var thisDay = today.day();
    var thisMonth = today.month();
    var thisYear = today.year();
    var events = this.refreshEvents();

    return {
      events: events,
      selectedDate: thisDate,
      selectedDay: thisDay,
      selectedMoment: today,
      selectedMonth: thisMonth,
      selectedYear: thisYear,
      showModal: false
    };
  },

  editHandler: function(id) {
    console.log(id);
  },

  getEvents: function(moment, callback) {
    $.ajax({
      url: "/events",
      method: "GET",
      dataType: "json",
      data: {moment: moment}
    }).done(function(data) {
      callback(data);
    });
  },

  hideModalHandler: function() {
    this.setState({showModal: false});
  },

  refreshEvents: function() {
    var selectedMoment = this.state ? this.state.selectedMoment : moment();
    this.getEvents(selectedMoment.format("dddd, MMMM Do YYYY"), this.updateEvents);
  },

  renderWeeks: function() {
    var firstDay = this.state.selectedMoment.clone().startOf("month").day("Sunday");
    var selectedMonth = this.state.selectedMonth;
    var weeks = [];

    for (var i=0;i<6;i++) {
      var key = "week_" + (i+1);
      var day = firstDay.clone();
      weeks.push(<Week key={key} firstDay={day} selectedMonth={selectedMonth}/>);
      firstDay.add(1,"w");
    }

    return weeks;
  },

  saveClickHandler: function(formattedMoment, action, callback = this.refreshEvents) {
    var description, method, title;
    if (action == "create") {
      method = "POST";
      title = $(".new-event-form input[name=title]").val();
      description = $(".new-event-form input[name=description]").val();
    } else {
      method = "PATCH";
      title = $(".edit-event-form input[name=title]").val();
      description = $(".edit-event-form input[name=title").val();
    }

    var formData = {
      description: description,
      moment: formattedMoment,
      title: title
    };

    $.ajax({
      url: "/events",
      method: method,
      dataType: "json",
      data: formData
    }).done(function() {
      callback();
    }).fail(function(request,status,error) {
      console.log(error);
    });
  },

  updateEvents: function(events) {
    this.setState({events: events});
  },

  render: function() {
    var {events,selectedMoment, selectedMonth, selectedYear, showModal} = this.state;
    selectedMonth = this.props.months[selectedMonth];
    var formattedMoment = selectedMoment.format("dddd, MMMM Do YYYY");
    var weeks = this.renderWeeks();

    return(
      <div className="calendar-body">
        <div className="month-header row text-center">
          <div className="col-xs-7">
            <h1>{selectedMonth} {selectedYear}</h1>
          </div>
        </div>

        <DaysOfTheWeek />
        {weeks}

        <NewEventForm formattedMoment={formattedMoment} onSaveClick={this.saveClickHandler} />

        <EventsList events={events} formattedMoment={formattedMoment} onEdit={this.editHandler} />

        <ReactBootstrap.Modal bsSize="medium" show={showModal} onHide={this.hideModalHandler}>
          <ReactBootstrap.Modal.Header>
            <button type="button" className="close" aria-hidden="true" onClick={this.hideModalHandler}>&times;</button>
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
            </form>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
      </div>
    );
  }
});
