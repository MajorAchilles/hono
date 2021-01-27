const getState = () => {
  if (!global.honostate) {
    global.honostate = {};
  }

  return global.honostate;
};

export {
  getState
};
