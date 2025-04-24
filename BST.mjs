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

  // 9 - Write a depth(value) function
  depth(value, node = this.root, currentDepth = 0) {
    if (node === null) return null;

    if (value === node.data) {
      return currentDepth;
    } else if (value < node.data) {
      return this.depth(value, node.left, currentDepth + 1);
    } else {
      return this.depth(value, node.right, currentDepth + 1);
    }
  }

  // 10 - Write an isBalanced function
  isBalanced(node = this.root) {
    if (node === null) return true;

    const height = (node) => {
      if (node === null) return -1;
      return 1 + Math.max(height(node.left), height(node.right));
    };

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    const heightDiff = Math.abs(leftHeight - rightHeight);

    // Esta rama está balanceada si:
    // - la diferencia de alturas es como mucho 1
    // - los subárboles también están balanceados
    return (
      heightDiff <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  // 11 - Write a rebalance function
  // Primero array de los valores del árbol en orden
  inOrderArray(node = this.root, result = []) {
    if (node === null) return result;
    this.inOrderArray(node.left, result);
    result.push(node.data);
    this.inOrderArray(node.right, result);
    return result;
  }

  // Luego rebalance()
  rebalance() {
    const sortedValues = this.inOrderArray();
    this.root = this.buildTree(sortedValues);
  }
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

// DRIVER SCRIPT
// Create an array of random numbers < 100
function randomArray(size, max = 100) {
  const set = new Set();
  while (set.size < size) {
    set.add(Math.floor(Math.random() * max));
  }
  return Array.from(set);
}

// Create a tree
const initialValues = randomArray(15);
console.log("Initial values:", initialValues);
const tree = new Tree(initialValues);
console.log("----------- INITIAL TREE -----------");
prettyPrint(tree.root);

// Confirm that the tree is balanced
console.log("¿The tree starts balanced?", tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("Pre Order:");
tree.preOrder((node) => console.log(node.data));

console.log("Post Order:");
tree.postOrder((node) => console.log(node.data));

console.log("In Order:");
tree.inOrder((node) => console.log(node.data));

//Unbalance the tree by adding several numbers > 100.
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);

// Confirm that the tree is unbalanced
console.log("----------- UNBALANCED TREE -----------");
console.log("¿It's balanced after adding numbers > 100?", tree.isBalanced());
prettyPrint(tree.root);

// Balance the tree
tree.rebalance();
// Confirm that the tree is balanced
console.log("----------- REBALANCED TREE -----------");
console.log("¿It's balanced after rebalance?", tree.isBalanced());
prettyPrint(tree.root);

// Print out all elements in level, pre, post, and in order
console.log("Level Order after rebalance:");
tree.levelOrder((node) => console.log(node.data));

console.log("Pre Order after rebalance:");
tree.preOrder((node) => console.log(node.data));

console.log("Post Order after rebalance:");
tree.postOrder((node) => console.log(node.data));

console.log("In Order after rebalance:");
tree.inOrder((node) => console.log(node.data));
