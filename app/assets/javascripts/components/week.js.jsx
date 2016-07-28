var Week = React.createClass({
  getDefaultProps: function() {
    return {
      firstDay: null,
      key: null
    };
  },

  renderDays: function() {
    var days = [];
    var day = this.props.firstDay.clone();

    for (var i=0;i<7;i++) {
      var date = day.date();
      days.push(<span className="day col-xs-1">{date}</span>);
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