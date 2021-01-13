import { route } from "express/lib/application";

export default function (app, express, db) {
  const router = express.Router();

  router.get('/', async(req, res) => {
    const authToken = req.headers.authorization;

    try {
      const response = await db.services.authorizationservice.checkAuth(authToken);
      res.json(response);
    } catch (err) {

    }
  });

  router.post('/', async(req, res) => {
    try {
      const response = await db.services.authorizationservice.createAuth(req.body);
      res.json(response);
    } catch (err) {

    }
  });
  return router;
}
