# SU Sortable Tree Theme

Forked from React Sortable Tree File Explorer Theme
https://github.com/frontend-collective/react-sortable-tree-theme-file-explorer

## Usage

```sh
yarn add @sensorup/su-sortable-tree-theme
```

```jsx
import React from "react";
import SortableTree from "react-sortable-tree";
import SuSortableTreeTheme from "@sensorup/su-sortable-tree-theme";

const Tree = ({ treeData, onTreeChange }) => {
  return (
    <SortableTree
      treeData={treeData}
      onChange={onTreeChange}
      theme={SuSortableTreeTheme}
    />
  );
};

export default Tree;
```
