import Order from "../models/order.model.js";

import { getIO } from "../socket/socket.js";

const startOrderWatcher = async () => {

  try {

    // Watch collection changes
    const changeStream = Order.watch();

    console.log("Watching order collection...");

    changeStream.on("change", (change) => {

      console.log("Database Change Detected:");
      console.log(change);

      const io = getIO();

      io.emit("ordersUpdated", change);
    });

  } catch (error) {

    console.error("Change Stream Error:", error);
  }
};

export default startOrderWatcher;