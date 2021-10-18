const { NotImplementedError } = require("../extensions/index");

const { Node } = require("../extensions/list-tree");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

module.exports = class BinarySearchTree {
  constructor() {
    this.treeNode = null;
  }

  root() {
    return this.treeNode;
  }

  add(data) {
    const newNode = new Node(data);

    this.treeNode === null
      ? (this.treeNode = newNode)
      : this.insertNode(this.treeNode, newNode);
  }

  insertNode(node, newNode) {
    newNode.data < node.data
      ? node.left === null
        ? (node.left = newNode)
        : this.insertNode(node.left, newNode)
      : node.right === null
      ? (node.right = newNode)
      : this.insertNode(node.right, newNode);
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    return this.search(this.treeNode, data);
  }

  search(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this.treeNode = this.removeNode(this.treeNode, data);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.data) {
      node.left = this.removeNode(node.left, key);

      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);

      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;

        return node;
      }

      if (node.left === null) {
        node = node.right;

        return node;
      } else if (node.right === null) {
        node = node.left;

        return node;
      }

      const temp = this.findMinNode(node.right);

      node.data = temp.data;

      node.right = this.removeNode(node.right, temp.data);

      return node;
    }
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  min() {
    let node = this.treeNode;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.treeNode;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
};
