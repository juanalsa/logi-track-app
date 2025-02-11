import { envs } from './config';
import { connectDB } from './infrastructure';
import { AppRoutes } from './presentation/routes';
import { Server } from './server';

(() => {
  main();
})();

async function main() {
  await connectDB();

  new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}
