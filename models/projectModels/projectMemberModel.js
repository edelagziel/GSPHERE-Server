const pool = require("../../db");

async function getAll_ProjectMembers(project_id) {
    const query = `
        SELECT 
            ProjectMembers.user_id,
            ProjectMembers.joined_at,
            ProjectMembers.is_active,
            users.first_name,
            users.last_name,
            users.email,
            users.level,
            users.profile_picture_url,
            ProjectRoles.name AS role_name,
            ProjectRoles.description AS role_description,
            Roles.role_name AS user_role_name
        FROM ProjectMembers
        JOIN users ON users.user_id = ProjectMembers.user_id
        JOIN ProjectRoles ON ProjectRoles.role_id = ProjectMembers.role_id
        JOIN Roles ON Roles.role_id = users.role
        WHERE ProjectMembers.project_id = $1
    `;
    const values = [project_id];
    return pool.query(query, values);
}


async function get_ProjectMemberById(member_id,project_id) 
{
    const query = `
        SELECT 
            ProjectMembers.user_id,
            users.first_name,
            users.last_name,
            users.profile_picture_url,
            users.level
        FROM ProjectMembers
        JOIN users ON users.user_id = ProjectMembers.user_id
        WHERE ProjectMembers.user_id = $1 AND ProjectMembers.project_id = $2;
    `;    
    const values = [member_id, project_id]; 
    return pool.query(query, values);
}



async function add_ProjectMember(project_id, user_id, role_id) {
    const query = "INSERT INTO ProjectMembers (project_id, user_id, role_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [project_id, user_id, role_id];
    return pool.query(query, values);
}

async function update_ProjectMemberRole(member_id, role_id, project_id) {
    const query = `
        UPDATE ProjectMembers 
        SET role_id = $1 
        WHERE user_id = $2 AND project_id = $3 
        RETURNING *
    `;
    const values = [role_id, member_id, project_id];
    return pool.query(query, values);
}


async function remove_ProjectMember(member_id, project_id) 
{
    const query = "DELETE FROM ProjectMembers WHERE user_id = $1 AND project_id = $2";
    const values = [member_id, project_id];
    return pool.query(query, values);
}


async function get_ProjectMemberByUserAndProject(user_id, project_id) {
    const query = "SELECT * FROM ProjectMembers WHERE user_id = $1 AND project_id = $2";
    const values = [user_id, project_id];
    return pool.query(query, values);
}


async function checkIfOwner(user_id, project_id) {
    const query = `
      SELECT 1
      FROM projects
      WHERE id = $1 AND owner_id = $2
      LIMIT 1;
    `;
    const values = [project_id, user_id];
    const result = await pool.query(query, values);
    return result.rowCount > 0; 
  }
  

module.exports = {
    getAll_ProjectMembers,
    get_ProjectMemberById,
    add_ProjectMember,
    update_ProjectMemberRole,
    remove_ProjectMember,
    get_ProjectMemberByUserAndProject,
    checkIfOwner
};
