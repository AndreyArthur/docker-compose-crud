import knex from 'knex';

import knexfile from '@/database/knexfile'

const db = knex(knexfile);

export {db};
