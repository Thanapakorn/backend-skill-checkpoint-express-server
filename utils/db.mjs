// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString:
    "postgresql://postgres:147120@localhost:5432/skillchechpoint",
});

export default connectionPool;
