import boxen from "boxen";

const printCenter = (message) => {
  console.log(
    boxen(
      message,
      {
        padding: 0,
        margin: 0,
        borderStyle: {
          topLeft: " ",
          topRight: " ",
          bottomLeft: " ",
          bottomRight: " ",
          horizontal: " ",
          vertical: " "
        },
        float: "center"
      }
    )
  );
};

export {
  printCenter
};
