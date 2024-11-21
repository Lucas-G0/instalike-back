import express from 'express';
import router from './src/routes/livrosRoutes.js';

const app = express();
router(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

