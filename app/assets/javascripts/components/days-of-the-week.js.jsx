var DaysOfTheWeek = React.createClass({
  render: function() {
    return(
      <div className="days row">
        <span className="col-xs-1 text-center">Sunday</span>
        <span className="col-xs-1 text-center">Monday</span>
        <span className="col-xs-1 text-center">Tuesday</span>
        <span className="col-xs-1 text-center">Wednesday</span>
        <span className="col-xs-1 text-center">Thursday</span>
        <span className="col-xs-1 text-center">Friday</span>
        <span className="col-xs-1 text-center">Saturday</span>
      </div>
    );
  }
});