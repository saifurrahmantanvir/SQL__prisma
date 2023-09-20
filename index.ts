/* eslint-disable */
import dotenv from 'dotenv';

/* PATH__ALIASING____ */
require('module-alias/register');
import path from 'path';
import moduleAlias, { addAlias } from 'module-alias';

const base = path.join(__dirname, '.');

addAlias('app', path.join(__dirname, 'app'));
addAlias('config.env', path.join(__dirname, 'config.env'));

/* Hurray!__ It's working 🔥🔥 */
moduleAlias.addAliases({
  '@models': path.join(base, 'models'),
  '@views': path.join(base, 'views'),
  '@controllers': path.join(base, 'controllers'),
  '@routes': path.join(base, 'routes'),
  '@utils': path.join(base, 'utils')
});

/* This approach of module-aliasing is not working with typescript when compiling__
addAlias('@models', path.join(base, 'models'));
addAlias('@views', path.join(base, 'views'));
addAlias('@controllers', path.join(base, 'controllers'));
addAlias('@routes', path.join(base, 'routes'));
addAlias('@utils', path.join(base, 'utils'));
addAlias('@database', path.join(base, 'database')); */

process.on('uncaughtException', error => {
  console.log('🛑 Uncaught Exception Shutting Down!');
  console.log(error.name, error.message);

  process.exit(1);
});

dotenv.config({ path: 'config.env' });
import app from 'app';

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running and listening on port ${PORT}!`);
});

process.on('unhandledRejection', (error: Error) => {
  console.log('🛑 Unhandled Rejection Shutting Down!');
  console.log(error.name, error.message);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting Down!');

  server.close(() => {
    console.log('🛑 Process Terminated cause SIGTERM received!');
  });
});
