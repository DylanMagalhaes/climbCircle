const client = require('./db_client');

const dataMapper = {
  registrationNewUser: async (username, email, password) => {
    const sql = `INSERT INTO climber(username, email, password) VALUES ($1, $2, $3)`;
    const values = [username, email, password]
    const results = await client.query(sql, values)
    console.log("__________________ new USER " + results.rowCount);
    return results.rowCount;
  },

  getAllUser: async () => {
    const sql = `SELECT * FROM climber`;
    const results = await client.query(sql)
    return results.rows;
  },

  getUserByUserName: async (username) => {
    const sql = `SELECT * FROM climber WHERE username=$1`;
    const values = [username]
    const results = await client.query(sql, values)

    return results.rows[0];
  },

  getAllFriendsOfClimber: async (climberId) => {
    const sql = 'SELECT c.* FROM climber c JOIN friendships f ON c.id = f.friend_id WHERE f.climber_id = $1';
    const values = [climberId];
    const results = await client.query(sql, values);
    return results.rows;
  },

  searchClimber: async (username) => {
    const sql = `SELECT * FROM climber WHERE username ILIKE $1`;
    const values = [`${username}%`];
    const results = await client.query(sql, values);
    return results.rows;
  },

  addFriend: async (username, friendToAdd) => {
    const sql = `INSERT INTO
    friendships (climber_id, friend_id)
    SELECT c1.id, c2.id
    FROM climber c1, climber c2
    WHERE
    c1.username = $1
    AND c2.username = $2`;
    const values = [username, friendToAdd];
    const results = await client.query(sql, values);
    return results.rows;
  },

  isFriend: async (username, potentialFriend) => {
    const sql = `SELECT COUNT(*)
      FROM friendships f
      JOIN climber c1 ON f.climber_id = c1.id
      JOIN climber c2 ON f.friend_id = c2.id
      WHERE c1.username = $1 AND c2.username = $2
      OR c1.username = $2 AND c2.username = $1`;
    const values = [username, potentialFriend];
    const result = await client.query(sql, values);
    return result.rows[0].count > 0;
  }


}

module.exports = dataMapper;


