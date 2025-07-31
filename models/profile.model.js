const pool = require("../db");


async function createEmptyProfile(userId) {
    const query = `
      INSERT INTO ProfileDetails (user_id)
      VALUES ($1)
      ON CONFLICT (user_id) DO NOTHING
      RETURNING *;
    `;
    const values = [userId];
    return pool.query(query, values);
    
  }

  async function GetMyProfile(userId) 
  {
    const query = `
      SELECT *
      FROM ProfileDetails
      WHERE user_id = $1
    `;
    const values = [userId];
    return pool.query(query, values);
  }
  

async function UpdateMyprofile(userId,bio,cv_url,location,experience,profile_picture_url,website_url,github_url, linkedin_url) 
{
    const query = `
    INSERT INTO ProfileDetails (
      user_id, bio, cv_url, location, experience,
      profile_picture_url, website_url, github_url, linkedin_url
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (user_id)
    DO UPDATE SET
      bio = EXCLUDED.bio,
      cv_url = EXCLUDED.cv_url,
      location = EXCLUDED.location,
      experience = EXCLUDED.experience,
      profile_picture_url = EXCLUDED.profile_picture_url,
      website_url = EXCLUDED.website_url,
      github_url = EXCLUDED.github_url,
      linkedin_url = EXCLUDED.linkedin_url
    RETURNING *;
  `;

  const values = [userId,bio,cv_url,location,experience,profile_picture_url,website_url,github_url,linkedin_url];

return pool.query(query, values);
}


module.exports = {
    createEmptyProfile,
    GetMyProfile,
    UpdateMyprofile
};
