import express from 'express';
import router from './src/routes/livrosRoutes.js';

const app = express();
app.use(express.static("uploads"));
router(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

