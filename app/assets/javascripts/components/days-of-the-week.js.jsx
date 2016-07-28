var DaysOfTheWeek = React.createClass({
  render: function() {
    return(
      <div className="days row">
        <b className="day-title col-xs-1 text-center">Sunday</b>
        <b className="day-title col-xs-1 text-center">Monday</b>
        <b className="day-title col-xs-1 text-center">Tuesday</b>
        <b className="day-title col-xs-1 text-center">Wednesday</b>
        <b className="day-title col-xs-1 text-center">Thursday</b>
        <b className="day-title col-xs-1 text-center">Friday</b>
        <b className="day-title col-xs-1 text-center">Saturday</b>
      </div>
    );
  }
});