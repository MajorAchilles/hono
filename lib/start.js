
const start = ({ local }) => {
  if (local) {
    console.log("Starting in local only mode...");
  } else {
    console.log("Starting with UI server...");
  }
};

export default start;
