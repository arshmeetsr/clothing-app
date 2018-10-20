import React from "react";
import PropTypes from "prop-types";

export default function SwatchList(props) {
  const {
    changeToPreviewVariant,
    changeToSelectedVariant,
    selectVariant,
    itemId,
    variants,
    selectedVariant
  } = props;

  const colorList = variants.map((variant, index) => {
    return (
      <li
        key={variant.variationId}
        onMouseEnter={() => changeToPreviewVariant(variant)}
        onMouseLeave={changeToSelectedVariant}
      >
        <input
          type="radio"
          id={"preview-" + variant.variationId}
          name={"preview-" + itemId}
          checked={variant.variationId === selectedVariant.variationId}
          onChange={() => selectVariant(variant)}
        />
        <label htmlFor={"preview-" + variant.variationId}>
          <span className="swatch" style={{ backgroundColor: variant.color }} />
        </label>
      </li>
    );
  });
  return (
    <div>
      <ul className="color-list">{colorList}</ul>
    </div>
  );
}

SwatchList.propTypes = {
  changeToPreviewVariant: PropTypes.func,
  changeToSelectedVariant: PropTypes.func,
  selectVariant: PropTypes.func,
  itemId: PropTypes.string,
  variants: PropTypes.array
}
