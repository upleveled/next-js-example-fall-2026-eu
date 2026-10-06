import { config } from 'dotenv-safe';
import { postgresJsConfig } from './util/config.ts';

// Read in values from .env file to process.env
config();

const options = postgresJsConfig;

export default options;
