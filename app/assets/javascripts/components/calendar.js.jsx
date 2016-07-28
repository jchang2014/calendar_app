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
    var firstSunday = this.state.selectedMoment.clone().startOf("month").day("Sunday").date();
    var lastSaturday = this.state.selectedMoment.clone().endOf("month").day("Saturday").date();
    var month = this.state.selectedMonth;
    var finished = false;
    var weeks = [];

    until (finished == true) {

    };
  },

  render: function() {
    var {selectedMonth,selectedYear} = this.state;
    selectedMonth = this.props.months[selectedMonth];

    return(
      <div className="calendar-body">
        <div className="month-header row text-center">
          <div className="col-xs-7">
            <h1>{selectedMonth} {selectedYear}</h1>
          </div>
        </div>

        <DaysOfTheWeek />
      </div>
    );
  }
});
