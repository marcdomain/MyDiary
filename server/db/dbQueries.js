const queryUsersByUsername = 'select * from users where username = $1';

const queryEntriesByUsername = 'select * from entries where username = $1';

const insertIntoUsers = 'insert into users (name, username, email, password) values ($1, $2, $3, $4)';

const insertIntoEntries = 'insert into entries (username, title, description) values ($1, $2, $3)';

const dbQueries = {
  queryUsersByUsername,
  queryEntriesByUsername,
  insertIntoEntries,
  insertIntoUsers
};

export default dbQueries;
