import { cyan, bgBlue } from "colors/safe";
import { routes } from "./server/routes";
import { express_app } from "./server/server";
const port = process.env.PORT || 3333;
express_app.use(routes);

express_app.listen(port, () => {
  console.log(cyan(`Server initialized in port ${port}`));
});
