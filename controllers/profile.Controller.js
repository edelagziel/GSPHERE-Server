
const { createEmptyProfile, GetMyProfile, UpdateMyprofile } = require("../models/profile.model");

async function getProfile(req, res) 
{
    try 
    {
        const userId = req.user.user_id;
        const result = await GetMyProfile(userId);
        if(result.rowCount===0) return res.status(404).json({error:"Profile not found"});

        res.status(200).json({ message: "Profile fetched successfully", profile: result.rows[0] });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Failed to fetch profile", details: error.message });
    }
}

async function createProfile(req, res)
{
    try 
    {
        const userId = req.user.user_id;
        MyuserId=parseInt(userId);

        const result = await createEmptyProfile(userId);
        if(result.rowCount===0) return res.status(404).json({error:"Profile not created"});

        res.status(201).json({ message: "Profile created successfully", profile: result.rows[0] });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Failed to create profile", details: error.message });
    }

}

async function updateProfile(req, res) {
    try
     {
      const userId = req.user.user_id;
  
      const {bio,cv_url,location,experience,profile_picture_url,website_url,github_url,linkedin_url} = req.body;
  
      const result = await UpdateMyprofile(userId,bio,cv_url,location,experience,profile_picture_url,website_url,github_url, linkedin_url);
      if(result.rowCount===0) return res.status(404).json({error:"Profile not updated"});

      res.status(200).json({ message: "Profile updated successfully", profile: result.rows[0] });
    } 
    catch (error) 
    {
      console.error("Update profile error:", error.message);
      res.status(500).json({ error: "Failed to update profile", details: error.message });
    }
  }
  

module.exports = {
    getProfile,
    createProfile,
    updateProfile
};
