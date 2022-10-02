import { express_app } from "./server/server";

express_app.listen(() => {
  const port = process.env.PORT || 3333;
  console.log(`Server initialized in port ${port}`);
  return port;
});
