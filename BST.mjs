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

  // 4 - Write insert(value) and deleteItem(value) functions
  insert(value, node = this.root) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    // Si value = node.data, no insertar nada (ya está en el árbol)

    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return node;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      // Caso 1: sin hijos
      if (node.left === null && node.right === null) return null;

      // Caso 2: un solo hijo
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Caso 3: dos hijos → obtener el sucesor in-order
      let successor = node.right;
      while (successor.left !== null) {
        successor = successor.left;
      }
      node.data = successor.data;
      node.right = this.deleteItem(successor.data, node.right);
    }

    return node;
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
prettyPrint(tree.root);

tree.insert(6);
console.log("Insert 6:");
prettyPrint(tree.root);

tree.deleteItem(67);
console.log("Delete 67:");
prettyPrint(tree.root);
