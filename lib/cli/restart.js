const restart = ({ local }) => {
  if (local) {
    console.log("Restarting in local only mode...");
  } else {
    console.log("Restarting with UI server...");
  }
};

export default restart;
