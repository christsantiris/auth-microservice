import { route } from "express/lib/application";

export default function (app, express, db) {
  const router = express.Router();

  router.get('/', async(req, res) => {
    res.send('I am the / route');
  });
  return router;
}
