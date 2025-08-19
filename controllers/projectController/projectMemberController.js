
const {
    getAll_ProjectMembers,
    get_ProjectMemberById,
    add_ProjectMember,
    update_ProjectMemberRole,
    remove_ProjectMember,
    get_ProjectMemberByUserAndProject,
    checkIfOwner
} = require("../../models/projectModels/projectMemberModel");

async function getAllProjectMembersController(req, res) {
    try {
        const { projectId } = req.params;
        const project_id = parseInt(projectId);
        if (isNaN(project_id)) {
            return res.status(400).json({ error: "Invalid project_id" });
        }
        const result = await getAll_ProjectMembers(project_id);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Members not found" });
        }
        res.status(200).json({ message: "All members retrieved successfully", members: result.rows });
    } catch (error) {
        return res.status(500).json({ error: "Failed to get all members" });
    }
}

async function getProjectMemberByIdController(req, res) {
    try {
        const { id, projectId } = req.params;
        const member_id = parseInt(id);
        const project_id = parseInt(projectId);
        console.log(member_id,project_id);
        if (isNaN(project_id) || isNaN(member_id)) {
            return res.status(400).json({ error: "Invalid project_id or member_id" });
        }
        const result = await get_ProjectMemberById(member_id,project_id);

        if (result.rows.length === 0)
        {
            return res.status(404).json({ error: "Member not found in this project" });
        }
        res.status(200).json({ message: "Member retrieved successfully", member: result.rows[0] });
    } catch (error) {
        return res.status(500).json({ error: "Failed to get member by id" });
    }
}

async function addProjectMemberController(req, res)
 {
    try 
    {
        console.log(req.user);
        const { projectId } = req.params;
        // const { user_id, role } = req.body;
        const user_id = req.user.user_id ;
        const project_id = parseInt(projectId);
        const userId = parseInt(user_id);
        // const role_id = parseInt(role);
        const role_id = 12;

        if (isNaN(project_id) || isNaN(userId) || isNaN(role_id)) 
        {
            return res.status(400).json({ error: "Invalid project_id, user_id, or role" });
        }

        const isMember = await get_ProjectMemberByUserAndProject(userId, project_id);
        if (isMember.rows.length !== 0) 
        {
            return res.status(400).json({ error: "Member already exists in this project" });
        }
        const result = await add_ProjectMember(project_id, userId, role_id);
        if (result.rows.length === 0)
        {
            return res.status(400).json({ error: "Failed to add new member" });
        }
        res.status(201).json({ message: "New member added successfully", member: result.rows[0] });
    } 
    catch (error)
    {
        return res.status(500).json({ err: "Failed to add new member",message:error });
    }
}

async function updateProjectMemberRoleController(req, res) {
    try {
        const { id, projectId } = req.params;
        const { role } = req.body;
        const member_id = parseInt(id);
        const project_id = parseInt(projectId);
        const role_id = parseInt(role);

        if (isNaN(project_id) || isNaN(member_id) || isNaN(role_id)) 
        {
            return res.status(400).json({ error: "Invalid project_id, member_id, or role" });
        }

        const result = await update_ProjectMemberRole(member_id, role_id, project_id);
        if (result.rows.length === 0)
        {
            return res.status(404).json({ error: "Member not found or role not updated" });
        }
        res.status(200).json({ message: "Member role updated successfully", member: result.rows[0] });
    } catch (error) {
        return res.status(500).json({ error: "Failed to modify member role" });
    }
}

async function removeProjectMemberController(req, res) {
    try 
    {
        const { projectId } = req.params;
        const user_id = req.user.user_id ;

        const member_id = parseInt(user_id);
        const project_id = parseInt(projectId);

        if (isNaN(project_id) || isNaN(member_id)) 
        {
            return res.status(400).json({ error: "Invalid project_id or member_id" });
        }
        const isOwner = await checkIfOwner(member_id, project_id);
        if (isOwner) 
        {
            return res.status(403).json({ error: "Cannot remove owner without confirmation", owner: true });
        }


        const result = await remove_ProjectMember(member_id, project_id);
        if (result.rowCount === 0) 
        {
            return res.status(404).json({ error: "Member not found or already deleted" });
        }
        res.status(200).json({ message: "Member deleted successfully" });
    } 
    catch (error) 
    {
        return res.status(500).json({ error: "Failed to delete member" });
    }
}

module.exports = {
    getAllProjectMembersController,
    getProjectMemberByIdController,
    addProjectMemberController,
    updateProjectMemberRoleController,
    removeProjectMemberController
};
