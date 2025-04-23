// 1 - Build a Node class
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// 2 - Build a Tree class
class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // 3 - Write a buildTree(array)
  buildTree(array) {
    // Eliminar duplicados
    const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);

    // Función recursiva para construir árbol
    const build = (arr) => {
      if (arr.length === 0) return null;

      const mid = Math.floor(arr.length / 2);
      const root = new Node(arr[mid]);

      root.left = build(arr.slice(0, mid));
      root.right = build(arr.slice(mid + 1));

      return root;
    };

    return build(uniqueSortedArray);
  }
}

// prettyPrint
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// test
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
