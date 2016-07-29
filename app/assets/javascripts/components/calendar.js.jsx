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
      selectedYear: thisYear
    };
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

  updateEvents: function(events) {
    this.setState({events: events});
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

  saveClickHandler: function(formattedMoment, callback = this.refreshEvents) {
    var title = $("input[name=title]").val();
    var description = $("input[name=description]").val();
    var formData = {
      description: description,
      moment: formattedMoment,
      title: title
    };

    $.ajax({
      url: "/events",
      method: "POST",
      dataType: "json",
      data: formData
    }).done(function() {
      callback();
    }).fail(function(request,status,error) {
      console.log(error);
    });
  },

  render: function() {
    var {events,selectedMoment, selectedMonth, selectedYear} = this.state;
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

        <EventsList events={events} formattedMoment={formattedMoment} />
      </div>
    );
  }
});
