const { db } = require('../config/db');

const getAllUsers = async () => {
  const query = 'SELECT * FROM users ORDER BY id ASC;';
  const { rows } = await db.query(query);
  return rows;
};

const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1;';
  const { rows } = await db.query(query, [id]);
  return rows[0];
}

const createUser = async (user) => {
  try {
    const query = 'INSERT INTO users (name, email, age, height, weight, dentist_time, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
    const response = await db.query(query, [user.name, user.email, user.age, user.height, user.weight, user.dentist_time, user.address]);
    console.log(response);
    return response.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const updateUser = async (id, user) => {
  try {
    const query = 'UPDATE users SET name = $1, email = $2, age = $3, height = $4, weight = $5, dentist_time = $6, address = $7 WHERE id = $8 RETURNING *;';
    const { rows } = await db.query(query, [user.name, user.email, user.age, user.height, user.weight, user.dentist_time, user.address, id]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async (id) => {
  try {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
