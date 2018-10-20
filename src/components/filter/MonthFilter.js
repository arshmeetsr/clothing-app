import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { MONTHS } from '../../contants';
import { filterByMonth } from "../../actions/filterActions";

class MonthFilter extends Component {
  render() {
    const monthList = this.props.distinctMonths.map(month => {
      return (
        <li key={month}>
          <input
            type="checkbox"
            id={month}
            onChange={() => this.props.filterByMonth(month)}
          />
          <label htmlFor={month}>{month}</label>
        </li>
      );
    });

    return (
      <div>
        <h4>Month</h4>
        <ul className="month-list">{monthList}</ul>
      </div>
    );
  }
}

const getDistinctMonths = list => {
  let distinctMonths = [];

  list.forEach(item => {
    item.Variant.forEach(variant => {
      variant.months.forEach(month => {
        if (distinctMonths.indexOf(month) === -1) {
          distinctMonths.push(month);
        }
      });
    });
  });

  sortByMonthName(distinctMonths);
  
  return distinctMonths;
};

const sortByMonthName = list => {
  list.sort(function(a, b){
      return MONTHS.indexOf(a)
           - MONTHS.indexOf(b);
  });
}

const mapStateToProps = (state, ownProps) => ({
  distinctMonths: getDistinctMonths(state.cloth.clothList)
});

MonthFilter.propTypes = {
  filterByMonth: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { filterByMonth }
)(MonthFilter);
