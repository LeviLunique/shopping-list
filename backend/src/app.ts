import express, { Express } from 'express';
import productRoutes from './routes/productRoutes';

const app: Express = express();

app.use(express.json());
app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;