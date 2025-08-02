
const {createNewProject,deleteProjectById,modifyProjectById,getAll_Projects,get_ProjectById,getuserProject}=require("../../models/projectModels/projectModel")
const { add_ProjectMember } = require("../../models/projectModels/projectMemberModel"); 

async function addNewProject (req, res) 
{
    try
    {
       const{title,description,image_url,stage_id,visibility_id}=req.body
       const owner_id = req.user.user_id;
       if(!owner_id||!title||!description||!image_url||!stage_id||!visibility_id)
            return res.status(400).json({error:"parmeters not valid"});
        const Mystage_id=parseInt(stage_id);
        const Myvisibility_id=parseInt(visibility_id);
        const result = await createNewProject(owner_id,title,description,image_url,Mystage_id,Myvisibility_id);
        const project_id = result.rows[0].id;
        await add_ProjectMember(project_id, owner_id, 11);
            res.status(200).json({message:"project created",project:result.rows[0]});

    }
    catch(err)
    {
        return res.status(500).json({error:"faild to add project"});
    }
}


async function deleteProject(req, res) 
{
    try
    {
        const {id}=req.body;
        const owner_id = req.user.user_id;
        const projectId=parseInt(id);
        const result = await deleteProjectById(owner_id,projectId);
        if (result.rowCount === 0)
        {
            return res.status(404).json({ error: "Project not found or you are not authorized" });
        }
        res.status(200).json({message:"project delete ",owner_id,projectId});
    }
    catch(error)
    {
        return res.status(500).json({error:"faild to delete project"});
    }
    
}

async function modifyProject(req, res) 
{
    try
    {
        const {title,description,image_url,stage_id,visibility_id,id}=req.body;
        const owner_id = req.user.user_id;
        const projectId=parseInt(id);
        const result = await modifyProjectById(title,description,image_url,stage_id,visibility_id,projectId,owner_id);

        if (result.rowCount === 0)
        {
            return res.status(404).json({ error: "Project not found or you are not authorized" });
        }
        res.status(200).json({ message: "project modified", project: result.rows[0] });
    }
    catch(error)
    {
        return res.status(500).json({error:"faild to modify project"});
    }
}

 async function getAllProjects(req, res) 
{
    try 
    {
        const result = await getAll_Projects();
        if (result.rows.length === 0) 
        {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ message: "All projects retrieved successfully", projects: result.rows});
    }
    catch(error)
    {
        return res.status(500).json({error:"faild to get all project"});
    }
}

async function getProjectById(req, res)
{
    try
    {
        const {id}=req.params;
        const projectid=parseInt(id);
        const result=await get_ProjectById(projectid);
        if(result.rows.length===0)
        {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ message: "Project retrieved successfully", project: result.rows[0]});

    }
    catch(error)
    {
        return res.status(500).json({error:"faild to get project"});
    }

}
async function getMyProjects(req, res) 
{
    try 
    {
        const result = await getuserProject(req.user.user_id);
        res.status(200).json({ message: "All My projects retrieved successfully", projects: result.rows});
    }
    catch(error)
    {
        return res.status(500).json({error:"faild to get all user project"});
    }
}








module.exports = {
    addNewProject,
    deleteProject,
    modifyProject,
    getAllProjects,
    getProjectById,
    getMyProjects
};