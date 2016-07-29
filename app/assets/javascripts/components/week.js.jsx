var Week = React.createClass({
  getDefaultProps: function() {
    return {
      firstDay: null,
      key: null,
      selectedMoment: null
    };
  },

  renderDays: function() {
    var days = [];
    var day = this.props.firstDay.clone();
    var selectedMonth = this.props.selectedMoment.month();
    var selectHandler = this.props.onSelect;

    for (var i=0;i<7;i++) {
      var dayMoment = day.clone();
      var date = day.date();
      var sameMonth = selectedMonth == day.month();
      var isCurrentDay = sameMonth && (date == moment().date());
      var key = "day_" + i;

      days.push(
        <WeekDay date={date}
          isCurrentDay={isCurrentDay}
          key={key}
          moment={dayMoment}
          onSelect={selectHandler}
          sameMonth={sameMonth}
        />
      );
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