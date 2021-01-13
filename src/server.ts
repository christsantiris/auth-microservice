
import * as bodyParser from 'body-parser';
import app from './app';
import { serviceConfig } from '../config/config';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = serviceConfig.port;

app.listen(port, () => {
  console.log(`server is listening on ${port}`)
})