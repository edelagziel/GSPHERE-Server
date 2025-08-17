
const {createJob,updateJob,deleteJob,updateJobStatus,getMyJobs,getActiveJobs,getJobCandidates,applyJobToPost,getAllSkills} = require("../models/jobsModel");

async function createJobController(req, res)
 {
    try 
    {
        const userId = req.user.user_id;
        console.log(userId);
        console.log(req.body);
        const { title, description, status_id, location_id, deadline, skills } = req.body;
        if (!Array.isArray(skills)) 
        {
            throw new Error("skills must be an array of integers");
        }

        const result = await createJob({
            userId,
            title,
            description,
            status_id,
            location_id,
            deadline,
            skills 
        });

      
        res.status(201).json({
            message: "Job created successfully",
            job: {
              id: result.JobPosts.id,
              title: result.JobPosts.title,
              description: result.JobPosts.description,
              status_id: result.JobPosts.status_id,
              location_id: result.JobPosts.location_id,
              deadline: result.JobPosts.deadline,
              // אפשר להוסיף skills אם ה-frontend מציג אותם מיד:
              skills: result.JobPostSkills ? result.JobPostSkills.skillIds : []
            }
          });
    } 
    catch (error)
    {
        res.status(500).json({ error: "Failed to create job", details: error.message });
    }
}



async function updateJobController(req, res)
{
    // TODO: validate title change is minor (use levenshtein distance)
    try 
    {
        const { id } = req.params;
        const {title,description,deadline} = req.body;
        const result = await updateJob(id,title,description,deadline);
        res.status(200).json({message : "Job update successfully",info:result.rows[0]});
    } 
    catch (error)
    {
        res.status(500).json({ error: "Failed to update job", details: error.message });
    }
}

async function deleteJobController(req, res)
 {
    try 
    {
        console.log(req.params);
        const { id } = req.params;
        JobId=parseInt(id);
        const result = await deleteJob(JobId);
        if(result.rowCount===0) return res.status(404).json({error:"job not found"});
        return res.status(200).json({ message: "Job deleted successfully" });
    } 
    catch (error)
    {
        res.status(500).json({ error: "Failed to delete job", details: error.message });
    }
}

async function updateJobStatusController(req, res) 
{
    try 
    {
        console.log(req.params,req.body);
        const { id } = req.params;
        const { status } = req.body;
        const jobsstatus= parseInt(status);
        const result = await updateJobStatus(id, jobsstatus);
        res.status(200).json({ message: "Job status updated successfully", job: result.rows[0] });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Failed to update job status", details: error.message });
    }
}

async function getMyJobsController(req, res) 
{
    try 
    {
        const userId = req.user.user_id;
        if (!userId ) 
        {
            return res.status(400).json({ error: "User ID is required" });
        }
        const result = await getMyJobs(userId);
        if (result.rowCount === 0)
        {
            return res.status(404).json({ message: "No jobs found", job: [] });
        }
      return res.status(200).json({ message: "Jobs fetched successfully", job: result.rows });
    }
     catch (error)
    {
        res.status(500).json({ error: "Failed to get jobs for recruiter", details: error.message });
    }
}

async function getActiveJobsController(req, res) 
{
    try 
    {
        const result = await getActiveJobs();
        if (result.rowCount  === 0) 
        {
            return res.status(404).json({ message: "No active jobs found", jobs: [] });
        }
        res.status(200).json({ message: "Active jobs fetched successfully", jobs:result.rows });
    } 
    catch (error)
    {
        res.status(500).json({ error: "Failed to get active jobs", details: error.message });
    }
}

async function getJobCandidatesController(req, res) 
{
    try
    {
        const { id } = req.params;
        const result = await getJobCandidates(id);
        if (result.rowCount === 0)
        {
            return res.status(200).json({ message: "No candidates found", candidates: [] });
        }
        res.status(200).json({ message: "Candidates fetched successfully", candidates: result.rows });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Failed to get job candidates", details: error.message });
    }
}


async function applyToJob(req, res) 
{
    try 
    {
        const { id } = req.params; 
        const userId = req.user.user_id ;
    
        const result = await applyJobToPost(id, userId);
        if (result.rowCount === 0) 
        {
            return res.status(400).json({ message: "Failed to apply to job" });
        }
        res.status(200).json({ message: "Applied to job successfully", application: result.rows[0] });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Failed to apply to job", details: error.message });
    }
}

async function getSkillsController(req, res) {
    try 
    {
        const result = await getAllSkills();
        res.status(200).json({ message: "Skills fetched successfully", skills: result.rows });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Failed to get skills", details: error.message });
    }
}



module.exports = {
    createJobController,
    updateJobController,
    deleteJobController,
    updateJobStatusController,
    getMyJobsController,
    getActiveJobsController,
    getJobCandidatesController,
    applyToJob,
    getSkillsController
};

