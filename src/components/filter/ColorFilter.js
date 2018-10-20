import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { filterByColor } from "../../actions/filterActions";

class ColorFilter extends Component {
  render() {
    const colorList = this.props.distinctColors.map(color => {
      return (
        <li key={color}>
          <input
            type="checkbox"
            id={"filter-" + color}
            onChange={() => this.props.filterByColor(color)}
          />
          <label htmlFor={"filter-" + color}>
            <span className="swatch" style={{ backgroundColor: color }} />
            <span className="text">{color}</span>
          </label>
        </li>
      );
    });

    return (
      <div>
        <h4>Color</h4>

        <ul className="color-list">{colorList}</ul>
      </div>
    );
  }
}

const getDistinctColors = list => {
  let distinctColors = [];

  list.forEach(item => {
    item.Variant.forEach(variant => {
      if (distinctColors.indexOf(variant.color) === -1) {
        distinctColors.push(variant.color);
      }
    });
  });

  return distinctColors;
};

ColorFilter.propTypes = {
  filterByColor: PropTypes.func.isRequired,
  distinctColors: PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
  distinctColors: getDistinctColors(state.cloth.clothList)
});

export default connect(
  mapStateToProps,
  { filterByColor }
)(ColorFilter);
