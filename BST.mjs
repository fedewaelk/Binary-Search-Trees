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

  // 5 - Write a find(value) function
  find(value, node = this.root) {
    if (node === null) return null;

    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  // 6 - Write a levelOrder(callback)
  //iteration
  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const queue = [];
    if (this.root !== null) queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  // recursion
  levelOrderRecursive(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const height = (node) => {
      if (node === null) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    };

    const visitLevel = (node, level) => {
      if (node === null) return;
      if (level === 1) {
        callback(node);
      } else {
        visitLevel(node.left, level - 1);
        visitLevel(node.right, level - 1);
      }
    };

    const h = height(this.root);
    for (let i = 1; i <= h; i++) {
      visitLevel(this.root, i);
    }
  }

  // 7 - Write inOrder(callback), preOrder(callback), and postOrder(callback) functions
  // izquierda → nodo → derecha
  inOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }
  // nodo → izquierda → derecha
  preOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;

    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }
  // izquierda → derecha → nodo
  postOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (node === null) return;

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  // 8 - Write a height(value) function
  height(value) {
    const node = this.find(value);
    if (node === null) return null;

    const computeHeight = (node) => {
      if (node === null) return -1; // uso -1 porque las hojas deben retornar 0
      return 1 + Math.max(computeHeight(node.left), computeHeight(node.right));
    };

    return computeHeight(node);
  }

  // 9 -
  // 10 -
}

// prettyPrint
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
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

console.log("Found node with data = 7 :", tree.find(7)); // Node with data = 7
console.log("Node not found :", tree.find(100)); // null

console.log("Iteration:");
tree.levelOrder((node) => {
  console.log(node.data); // 8, 4, 324, 3, 7, 23, 6345, 1, 5, 9, 6
});
console.log("Recursive:");
tree.levelOrderRecursive((node) => {
  console.log(node.data); // 8, 4, 324, 3, 7, 23, 6345, 1, 5, 9, 6
});

console.log("In-order:");
tree.inOrder((node) => console.log(node.data));

console.log("Pre-order:");
tree.preOrder((node) => console.log(node.data));

console.log("Post-order:");
tree.postOrder((node) => console.log(node.data));

console.log("Heigh of the node with value 8:", tree.height(8)); // 4
console.log("Heigh of the node with value 1:", tree.height(1)); // 0 (it's leaf)
console.log("Heigh of the node with value 100:", tree.height(100)); // null (doesn't exist)
