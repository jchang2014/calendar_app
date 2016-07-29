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
    var thisDay = today.day();
    var events = this.refreshEvents();

    return {
      events: events,
      selectedEvent: null,
      selectedMoment: today,
      showModal: false
    };
  },

  editHandler: function(i) {
    var event = this.state.events[i];

    this.setState({
      selectedEvent: event,
      showModal: true
    });
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
    var selectedMoment = this.state.selectedMoment;
    var weeks = [];

    for (var i=0;i<6;i++) {
      var key = "week_" + (i+1);
      var day = firstDay.clone();
      weeks.push(<Week key={key} firstDay={day} onSelect={this.selectHandler} selectedMoment={selectedMoment} />);
      firstDay.add(1,"w");
    }

    return weeks;
  },

  saveClickHandler: function(formattedMoment, action, callback = this.refreshEvents) {
    var description, id, method, title, url;
    if (action == "create") {
      method = "POST";
      title = $(".new-event-form input[name=title]").val();
      description = $(".new-event-form input[name=description]").val();
      id = null;
      url = "/events";
    } else if (action == "update") {
      method = "PATCH";
      title = $(".edit-event-form input[name=title]").val();
      description = $(".edit-event-form input[name=description").val();
      id = $(".edit-event-form input[name=id]").val();
      url = "/events/" + id;
    } else {
      console.log("action error");
    }

    var formData = {
      description: description,
      id: id,
      moment: formattedMoment,
      title: title
    };

    $.ajax({
      url: url,
      method: method,
      dataType: "json",
      data: formData
    }).done(function() {
      callback();
    }).fail(function(request,status,error) {
      console.log(error);
    });

    this.setState({
      selectedEvent: null,
      showModal: false
    });
  },

  selectHandler: function(moment) {
    var date = moment.date();
    var month = moment.month();
    var year = moment.year();
    var id = "#"+year+"_"+month+"_"+date;


    $(".current-day").removeClass("current-day");
    $(id).addClass("current-day");
    this.setState({
      selectedMoment: moment
    });

    this.refreshEvents();
  },

  updateEvents: function(events) {
    this.setState({events: events});
  },

  render: function() {
    var {events, selectedEvent, selectedMoment, showModal} = this.state;
    var selectedMonth = selectedMoment.month();
    var selectedYear = selectedMoment.year();
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

        <EventsList events={events} formattedMoment={formattedMoment} onEditClick={this.editHandler} />

        <EditEventModal event={selectedEvent}
          formattedMoment={formattedMoment}
          hideModalHandler={this.hideModalHandler}
          onSaveClick={this.saveClickHandler}
          showModal={showModal}
        />
      </div>
    );
  }
});
