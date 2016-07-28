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

    return {
      selectedDate: thisDate,
      selectedDay: thisDay,
      selectedMoment: today,
      selectedMonth: thisMonth,
      selectedYear: thisYear
    };
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

  render: function() {
    var {selectedMonth,selectedYear} = this.state;
    selectedMonth = this.props.months[selectedMonth];

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
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
