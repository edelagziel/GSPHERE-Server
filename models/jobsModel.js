
const pool = require("../db"); 

async function createJob({ userId, title, description, status_id, location_id, deadline, skills })
 {
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
    return { message: "Job status updated (model placeholder)" };
}

// Placeholder: get all jobs for a recruiter
async function getMyJobs(userId) {
    // TODO: Implement logic to get all jobs for a specific recruiter
    return { jobs: [] };
}

// Placeholder: get all active jobs
async function getActiveJobs() {
    // TODO: Implement logic to get all active jobs
    return { jobs: [] };
}

// Placeholder: get candidates for a specific job
async function getJobCandidates(jobId) {
    // TODO: Implement logic to get candidates for a job
    return { candidates: [] };
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
