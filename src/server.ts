import { connectDB } from './config/db';
import { env } from './config/env';
import { startCronJobs } from './services/cron.service';
import app from './app';

const startServer = async () => {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Start cron jobs
    startCronJobs();

    // 3. Start HTTP server
    app.listen(env.PORT, () => {
      console.log(`🚀 ELV CONNECT API — ${env.NODE_ENV} — port ${env.PORT}`);
      console.log(`   Health: http://localhost:${env.PORT}/health`);
      console.log(`   API:    http://localhost:${env.PORT}/api/v1`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
