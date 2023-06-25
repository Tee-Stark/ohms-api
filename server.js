import app from './app.js';
import { connectDB } from './config/db.config.js'
import { PORT } from './config/constants.config.js';

const server = app.listen(PORT, async () => {
    await connectDB();
    console.log(`App listening on port: ${PORT}`);
});
