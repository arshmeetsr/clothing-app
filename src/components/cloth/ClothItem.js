import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Cloth.css";
import SwatchList from './SwatchList';

export default class ClothItem extends Component {
  constructor(props) {
    super(props);

    let defaultVariant = this.getDefaultVariant(props.item.Variant);

    this.state = {
      selectedVariant: defaultVariant,
      displayVariant: defaultVariant
    }

    this.changeToPreviewVariant = this.changeToPreviewVariant.bind(this);
    this.changeToSelectedVariant = this.changeToSelectedVariant.bind(this);
    this.selectVariant = this.selectVariant.bind(this);
  }

  getDefaultVariant(variants) {
    let defaultVariant = null;

    variants.forEach(variant => {
      if (variant.type === "default") {
        defaultVariant = variant;
      }
    });

    if(!defaultVariant) {
      defaultVariant = variants[0];
    }

    return defaultVariant;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.item !== this.props.item) {
      this.defaultVariant = this.getDefaultVariant(this.props.item.Variant);

      this.setState({
        selectedVariant: this.defaultVariant,
        displayVariant: this.defaultVariant
      })
    }
  }

  changeToPreviewVariant(variant) {
    this.setState({
      displayVariant: variant
    });
  }

  changeToSelectedVariant() {
    this.setState(state => ({
      displayVariant: state.selectedVariant
    }));
  }

  selectVariant(variant) {
    this.setState({
      selectedVariant: variant
    });
  }

  render() {
    const item = this.props.item;
    const displayVariant = this.state.displayVariant;
   
    return (
      <div className="cloth-item">
        <div
          className="preview"
          style={{ backgroundColor: displayVariant.color }}
        />
        <div>
          <h4>{item.name}</h4>
          <h4>By: {item.brand}</h4>
          <h4>Price: {displayVariant.cost}</h4>

          <SwatchList
            variants={item.Variant}
            changeToPreviewVariant={this.changeToPreviewVariant}
            changeToSelectedVariant={this.changeToSelectedVariant}
            selectVariant={this.selectVariant}
            itemId={item.id}
            selectedVariant={this.state.selectedVariant}
          />
        </div>
      </div>
    );
  }
}

ClothItem.propTypes = {
  item: PropTypes.object
}
