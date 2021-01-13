
import * as bodyParser from 'body-parser';
import app from './app';
import { serviceConfig } from '../config/config';
import { Services } from './services';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new Services();

const port = serviceConfig.port;

app.listen(port, async() => {
  console.log(`server is listening on ${port} in environment ${serviceConfig.envName}`);
  await db.createMongoConnection();
  console.info('Database Connected');
})