import { envs } from './config';
import { AppRoutes } from './presentation/routes';
import { Server } from './server';

(() => {
  main();
})();

async function main() {
  new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
}
