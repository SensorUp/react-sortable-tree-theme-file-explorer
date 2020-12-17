import React, { Children, cloneElement } from "react";
import PropTypes from "prop-types";
import styles from "./tree-node-renderer.scss";

const SuCustomThemeTreeNodeRenderer = (props) => {
  const {
    children,
    listIndex,
    swapFrom,
    swapLength,
    swapDepth,
    scaffoldBlockPxWidth,
    lowerSiblingCounts,
    connectDropTarget,
    isOver,
    draggedNode,
    canDrop,
    treeIndex,
    treeId, // Delete from otherProps
    getPrevRow, // Delete from otherProps
    node, // Delete from otherProps
    path, // Delete from otherProps
    rowDirection,
    ...otherProps
  } = props;

  return connectDropTarget(
    <div {...otherProps} className={styles.node}>
      {Children.map(children, (child) =>
        cloneElement(child, {
          isOver,
          canDrop,
          draggedNode,
          lowerSiblingCounts,
          listIndex,
          swapFrom,
          swapLength,
          swapDepth,
        })
      )}
    </div>
  );
};

SuCustomThemeTreeNodeRenderer.defaultProps = {
  swapFrom: null,
  swapDepth: null,
  swapLength: null,
  canDrop: false,
  draggedNode: null,
  rowDirection: "ltr",
};

SuCustomThemeTreeNodeRenderer.propTypes = {
  treeIndex: PropTypes.number.isRequired,
  swapFrom: PropTypes.number,
  swapDepth: PropTypes.number,
  swapLength: PropTypes.number,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  treeId: PropTypes.string.isRequired,
  listIndex: PropTypes.number.isRequired,
  rowDirection: PropTypes.string,
  children: PropTypes.node.isRequired,

  // Drop target
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
  draggedNode: PropTypes.shape({}),

  // used in dndManager
  getPrevRow: PropTypes.func.isRequired,
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

export default SuCustomThemeTreeNodeRenderer;
