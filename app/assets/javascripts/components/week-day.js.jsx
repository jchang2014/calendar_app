var WeekDay = React.createClass({
  getDefaultProps: function() {
    return{
      date: null,
      isCurrentDay: false,
      sameMonth: false
    };
  },

  render: function() {
    var {date, isCurrentDay, sameMonth} = this.props;

    return(
      <span
        className={"day col-xs-1" +
          (sameMonth ? "" : " grayed") +
          (isCurrentDay ? " current-day" : "")
        }
      >
        {date}
      </span>
    );
  }
});