const pool = require("../../db");

async function createNewProject(owner_id, title, description, image_url, stage_id, visibility_id) {
    const query = "INSERT INTO projects(owner_id,title,description,image_url,stage_id,visibility_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
    const values = [owner_id, title, description, image_url, stage_id, visibility_id];
    return pool.query(query, values);
}

async function deleteProjectById(owner_id, id) {
    const query = "DELETE FROM projects WHERE id=$1 AND owner_id=$2";
    const values = [id, owner_id];
    return pool.query(query, values);
}

async function modifyProjectById(title, description, image_url, stage_id, visibility_id, id, owner_id) {
    const query = `
        UPDATE projects
        SET title = $1,
            description = $2,
            image_url = $3,
            stage_id = $4,
            visibility_id = $5
        WHERE id = $6 AND owner_id = $7
        RETURNING *;
    `;
    const values = [title, description, image_url, stage_id, visibility_id, id, owner_id];
    return pool.query(query, values);
}

async function getAll_Projects() {
    const query = `
    SELECT u.first_name, u.last_name, p.id AS projectid, p.owner_id, p.title,
           p.description, p.image_url, p.created_at, ps.name AS stage_name
    FROM projects p
    JOIN users u ON u.user_id = p.owner_id
    LEFT JOIN projectstages ps ON ps.stage_id = p.stage_id
    WHERE p.visibility_id = 1
    ORDER BY p.created_at DESC
  `;
    return pool.query(query);
}

async function get_ProjectById(id) {
    const query = "SELECT * FROM projects WHERE id=$1";
    const values = [id];
    return pool.query(query, values);
}

async function getuserProject(user_id) {
    const query = `
        SELECT projects.*
        FROM projects
        JOIN ProjectMembers ON ProjectMembers.project_id = projects.id
        WHERE ProjectMembers.user_id = $1
        ORDER BY projects.created_at DESC;
    `;
    const values = [user_id];
    return pool.query(query, values);
}


module.exports = {
    createNewProject,
    deleteProjectById,
    modifyProjectById,
    getAll_Projects,
    get_ProjectById,
    getuserProject
};
