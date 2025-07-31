
const pool = require("../db"); 

async function createJob({ userId, title, description, status_id, location_id, deadline, skills })
 {
    const recruiter = await isRecruiter(userId);
    if (!recruiter) throw new Error("User is not a recruiter, cannot fetch jobs");    
    const query = `
        INSERT INTO JobPosts 
            (recruiter_id, title, description, status_id, location_id, deadline)
        VALUES 
            ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [userId, title, description, status_id, location_id, deadline];

    const res = await pool.query(query, values); 

    const jobId = res.rows[0].id;
    const resSkill = await insetSkillToJobs(skills, jobId);

    return { JobPosts: res, JobPostSkills: resSkill }; 
}

async function insetSkillToJobs(skills, jobId) 
{
    
    const query = `
        INSERT INTO JobPostSkills (job_post_id, skill_id)
        SELECT $1, unnest($2::int[])
        RETURNING *;
    `;
    const values = [jobId, skills];
    return pool.query(query, values);
}



async function updateJob(id,title,description,deadline)
{
    
    const query = `
        UPDATE JobPosts
        SET title = $1,
            description = $2,
            deadline = $3
        WHERE id = $4
        RETURNING *;
    `;
    const values = [title, description, deadline, id];
    return pool.query(query, values);
}

async function deleteJob(id) 
{
   
    const query="DELETE FROM JobPosts where id=$1";
    const values=[id];
    return pool.query(query,values);
}

async function updateJobStatus(id, status) 
{
    const query = `
        UPDATE JobPosts
        SET status_id = $1
        WHERE id = $2
        RETURNING *;
    `;
    const values = [status, id];
    return pool.query(query, values);
}

async function getMyJobs(userId) 
{
    const recruiter = await isRecruiter(userId);
    if (!recruiter) throw new Error("User is not a recruiter, cannot fetch jobs");

    const query = `
        SELECT jp.*
        FROM JobPosts jp
        WHERE jp.recruiter_id = $1
        ORDER BY jp.created_at DESC
    `;
  
    const values = [userId];
  return pool.query(query, values);
    
}

async function isRecruiter(userId) {
    const query = `
      SELECT 1 
      FROM users 
      JOIN roles ON users.role = roles.role_id 
      WHERE users.user_id = $1 AND roles.role_name = 'recruiter'
    `;
    const result = await pool.query(query, [userId]);
    return result.rowCount > 0;
  }
  

  async function getActiveJobs() 
  {
    const query = `
      SELECT 
      jp.id,
      jp.title,
      jp.description,
      jp.deadline,
      jp.location_id,
      CONCAT(u.first_name, ' ', u.last_name) AS recruiter_name,
      COALESCE(ARRAY_AGG(DISTINCT js.name), '{}') AS skills
    FROM JobPosts jp
    JOIN users u ON jp.recruiter_id = u.user_id
    LEFT JOIN JobPostSkills jps ON jp.id = jps.job_post_id
    LEFT JOIN JobSkills js ON jps.skill_id = js.id
    WHERE jp.status_id = 1
    GROUP BY 
      jp.id, jp.title, jp.description, jp.deadline, jp.location_id, u.first_name, u.last_name
    ORDER BY jp.created_at DESC
  `;
    
    return pool.query(query);
  }
  

  async function getJobCandidates(jobId) {
    const query = `
      SELECT 
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        ja.submitted_at,
        ast.name AS application_status
      FROM JobApplications ja
      JOIN Users u ON ja.user_id = u.user_id
      JOIN ApplicationStatus ast ON ja.status_id = ast.id
      WHERE ja.job_post_id = $1
      ORDER BY ja.submitted_at DESC
    `;
    const values = [jobId];
    return pool.query(query, values);

  }
  

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    updateJobStatus,
    getMyJobs,
    getActiveJobs,
    getJobCandidates
};
