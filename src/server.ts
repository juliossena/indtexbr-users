import express from 'express';
import router from './routes/routes';

require('./models');

const app = express();

app.use(express.json());

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000');
});
