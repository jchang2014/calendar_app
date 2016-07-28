var Week = React.createClass({
  getDefaultProps: function() {
    return {
      firstDay: null,
      key: null,
      selectedMonth: null
    };
  },

  renderDays: function() {
    var days = [];
    var day = this.props.firstDay.clone();

    for (var i=0;i<7;i++) {
      var date = day.date();
      var sameMonth = this.props.selectedMonth == day.month();
      var isCurrentDay = sameMonth && (date == moment().date());
      var key = "day_" + i;

      days.push(<WeekDay date={date} isCurrentDay={isCurrentDay} key={key} sameMonth={sameMonth} />);
      day.add(1,"d");
    }

    return days;
  },

  render: function() {
    var days = this.renderDays();

    return(
      <div className="week row text-center">
        {days}
      </div>
    );
  }
});