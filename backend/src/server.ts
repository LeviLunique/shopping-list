import app from './app';

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default server;