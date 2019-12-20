class Train {
  constructor(name) {
    this.name = name;
  }
}

const API = {
  getData: (endpoint) => {
    return new Train("IC12");
  }
};

export {Train, API};
