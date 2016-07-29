var WeekDay = React.createClass({
  getDefaultProps: function() {
    return{
      date: null,
      moment: null,
      isCurrentDay: false,
      sameMonth: false
    };
  },

  selectHandler: function(moment) {
    var onSelect = this.props.onSelect;

    return function() {
      onSelect(moment);
    };
  },

  render: function() {
    var {date, isCurrentDay, moment, sameMonth} = this.props;
    var month = moment.month();
    var year = moment.year();

    return(
      <span
        className={"day col-xs-1" +
          (sameMonth ? "" : " grayed") +
          (isCurrentDay ? " current-day" : "")
        }
        id={""+year+"_"+month+"_"+date}
        onClick={this.selectHandler(moment)}
      >
        {date}
      </span>
    );
  }
});