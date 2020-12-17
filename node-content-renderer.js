import React from "react";
import PropTypes from "prop-types";
import { MdExpandMore, MdChevronRight } from "react-icons/md";

import styles from "./node-content-renderer.scss";

function isDescendant(older, younger) {
  return (
    !!older.children &&
    typeof older.children !== "function" &&
    older.children.some(
      (child) => child === younger || isDescendant(child, younger)
    )
  );
}

const SuCustomThemeNodeContentRenderer = (props) => {
  const {
    scaffoldBlockPxWidth,
    toggleChildrenVisibility,
    connectDragPreview,
    connectDragSource,
    isDragging,
    canDrop,
    canDrag,
    node,
    title,
    draggedNode,
    path,
    treeIndex,
    isSearchMatch,
    isSearchFocus,
    icons,
    buttons,
    className,
    style,
    didDrop,
    lowerSiblingCounts,
    listIndex,
    swapFrom,
    swapLength,
    swapDepth,
    treeId, // Not needed, but preserved for other renderers
    isOver, // Not needed, but preserved for other renderers
    parentNode, // Needed for dndManager
    rowDirection,
    ...otherProps
  } = props;

  const nodeTitle = title || node.title;

  const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;

  // Construct the scaffold representing the structure of the tree
  const scaffoldBlockCount = lowerSiblingCounts.length - 1;

  const nodeContent = connectDragPreview(
    <div
      className={
        styles.rowContents +
        (isSearchMatch ? ` ${styles.rowSearchMatch}` : "") +
        (isSearchFocus ? ` ${styles.rowSearchFocus}` : "") +
        (!canDrag ? ` ${styles.rowContentsDragDisabled}` : "")
      }
      style={{ paddingLeft: scaffoldBlockPxWidth * scaffoldBlockCount }}
    >
      <div className={styles.contentContainer}>
        <div className={styles.rowToolbar}>
          {icons.map((icon, index) => (
            <div
              key={index} // eslint-disable-line react/no-array-index-key
              className={styles.toolbarButton}
            >
              {icon}
            </div>
          ))}
        </div>
        <div className={styles.rowLabel}>
          <span className={styles.rowTitle}>
            {typeof nodeTitle === "function"
              ? nodeTitle({
                  node,
                  path,
                  treeIndex,
                })
              : nodeTitle}
          </span>
        </div>
      </div>
      <div className={styles.rowToolbar}>
        {buttons.map((btn, index) => (
          <div
            key={index} // eslint-disable-line react/no-array-index-key
            className={styles.toolbarButton}
          >
            {btn}
          </div>
        ))}
        {toggleChildrenVisibility && node.children && node.children.length > 0 && (
          <button
            type="button"
            aria-label={node.expanded ? "Collapse" : "Expand"}
            className={styles.toolbarButton}
            onClick={() =>
              toggleChildrenVisibility({
                node,
                path,
                treeIndex,
              })
            }
          >
            {node.expanded ? <MdExpandMore /> : <MdChevronRight />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ height: "100%" }} {...otherProps}>
      <div
        className={
          styles.rowWrapper +
          (!canDrag ? ` ${styles.rowWrapperDragDisabled}` : "")
        }
      >
        <div
          className={
            styles.row +
            (isLandingPadActive ? ` ${styles.rowLandingPad}` : "") +
            (isLandingPadActive && !canDrop ? ` ${styles.rowCancelPad}` : "") +
            (className ? ` ${className}` : "")
          }
          style={{
            opacity: isDraggedDescendant ? 0.5 : 1,
            paddingLeft: scaffoldBlockPxWidth,
            ...style,
          }}
        >
          {canDrag
            ? connectDragSource(nodeContent, { dropEffect: "copy" })
            : nodeContent}
        </div>
      </div>
    </div>
  );
};

SuCustomThemeNodeContentRenderer.defaultProps = {
  buttons: [],
  canDrag: false,
  canDrop: false,
  className: "",
  draggedNode: null,
  icons: [],
  isSearchFocus: false,
  isSearchMatch: false,
  parentNode: null,
  style: {},
  subtitle: null,
  swapDepth: null,
  swapFrom: null,
  swapLength: null,
  title: null,
  toggleChildrenVisibility: null,
  lowerSiblingCounts: undefined,
  listIndex: undefined,
};

SuCustomThemeNodeContentRenderer.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node),
  canDrag: PropTypes.bool,
  className: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.node),
  isSearchFocus: PropTypes.bool,
  isSearchMatch: PropTypes.bool,
  listIndex: PropTypes.number,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number),
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
  swapDepth: PropTypes.number,
  swapFrom: PropTypes.number,
  swapLength: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  toggleChildrenVisibility: PropTypes.func,
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,

  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  isDragging: PropTypes.bool.isRequired,
  parentNode: PropTypes.shape({}), // Needed for dndManager
  // Drop target
  canDrop: PropTypes.bool,
  isOver: PropTypes.bool.isRequired,
};

export default SuCustomThemeNodeContentRenderer;
