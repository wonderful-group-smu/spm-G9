// method to verify that all HTMLElements are in document 
const expectAllInDocument = (elementArray) => {
  elementArray.map((target) => {
    expect(target).toBeInTheDocument();
  })
}

// mock local storage
const storageMock = () => {
  let storage = {};
  return {
    setItem: (key, value) => {
      storage[key] = value || '';
    },
    getItem: (key) => {
      return storage[key] || null;
    },
    removeItem: (key) => {
      delete storage[key];
    },
    clear: function () {
      storage = {};
    },
    getLength: () => {
      return Object.keys(storage).length;
    },
    key: function (i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    }
  }
}

export {
  expectAllInDocument,
  storageMock,
}