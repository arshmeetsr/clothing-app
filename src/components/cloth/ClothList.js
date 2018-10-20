import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ClothItem from "./ClothItem";
import { fetchClothList } from "../../actions/clothActions";

class ClothList extends Component {
  componentDidMount() {
    this.props.fetchClothList();
  }

  render() {
    let listItems;
    const clothList = this.props.clothList;

    if(clothList.length === 0) {
      listItems = "No items on these filter combination"
    } else {
      listItems = clothList.map(cloth => {
        return <ClothItem key={cloth.id} item={cloth} />;
      });
    }

    return (
      <div>
        <h4>Clothes</h4>
        <div className="items-container">{listItems}</div>
      </div>
    );
  }
}

const createItem = (visibleClothList, visibleListIndex, list, i, j) => {
  visibleClothList[visibleListIndex] = {};
  visibleClothList[visibleListIndex] = {...list[i]};
  visibleClothList[visibleListIndex].filterScore = 0;
  visibleClothList[visibleListIndex].Variant = [];
}

const filterList = (list, filters) => {
  let visibleClothList = [];
  let visibleListIndex = 0;

  for (let i = 0; i < list.length; i++) {
    
    let itemAdded = false;

    for (let j = 0; j < list[i].Variant.length; j++) {
      let colorScore = 0;
      let monthScore = 0;

      if(filters.colorFilters.length > 0) {
        if (filters.colorFilters.indexOf(list[i].Variant[j].color) !== -1) {
          colorScore += 1;  
        }
      }

      if(filters.monthFilters.length > 0) {
        for (let k = 0; k < list[i].Variant[j].months.length; k++) {
          if (filters.monthFilters.indexOf(list[i].Variant[j].months[k]) !== -1) {
            monthScore += 1;
          }
        }
      }

      if(filters.colorFilters.length && filters.monthFilters.length) {
        if(colorScore > 0 && monthScore > 0) {
          if(!itemAdded) {
            createItem(visibleClothList, visibleListIndex, list, i, j);
            itemAdded = true;
            visibleListIndex += 1;
          } 
          visibleClothList[visibleListIndex - 1].filterScore += colorScore + monthScore;
          visibleClothList[visibleListIndex - 1].Variant.push(list[i].Variant[j]);
        }

      } else {
        if(filters.colorFilters.length && colorScore > 0) {
          if(!itemAdded) {
            createItem(visibleClothList, visibleListIndex, list, i, j);
            itemAdded = true;
            visibleListIndex += 1;
          } 
          visibleClothList[visibleListIndex - 1].filterScore += colorScore;
          visibleClothList[visibleListIndex - 1].Variant.push(list[i].Variant[j]);
        }

        if(filters.monthFilters.length && monthScore > 0) {
          if(!itemAdded) {
            createItem(visibleClothList, visibleListIndex, list, i, j);
            
            itemAdded = true;
            visibleListIndex += 1;
          } 
          visibleClothList[visibleListIndex - 1].filterScore += monthScore;
          visibleClothList[visibleListIndex - 1].Variant.push(list[i].Variant[j]);
        }
      }
    }
  }

  return visibleClothList;
};

const sortListByDescFilterScore = list => {
  list.sort((a, b) => {
    return b.filterScore - a.filterScore;
  });

  return list;
};

const getVisibleClothList = (list, filters) => {
  if (
    !filters ||
    (filters.colorFilters.length === 0 && filters.monthFilters.length === 0)
  )
    return list;

  let filteredClothList = filterList(list, filters);
  let visibleClothList = sortListByDescFilterScore(filteredClothList);

  return visibleClothList;
};

ClothList.propTypes = {
  fetchClothList: PropTypes.func.isRequired,
  clothList: PropTypes.array
};

const mapStateToProps = state => {
  const clothListClone = state.cloth.clothList.map(item => ({ ...item }));
  return {
    clothList: getVisibleClothList(clothListClone, state.filters)
  };
};

export default connect(
  mapStateToProps,
  { fetchClothList }
)(ClothList);
