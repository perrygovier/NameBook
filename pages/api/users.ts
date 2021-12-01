
import { WebClient } from '@slack/web-api';
const token = process.env.SLACK_TOKEN;

export default function handler(_req, res) {
  const client = new WebClient(token);

  const tryGettingUsers = async () => {
    let usersStore = {};

    try {
      // Call the users.list method using the WebClient
      const result = await client.users.list();
    
      saveUsers(result.members);

      console.log(usersStore)
      res.status(200).json(usersStore)
      return usersStore;
    }
    catch (error) {
      console.error(error);
      res.status(500).json(error)
    }

    // Put users into the JavaScript object
    function saveUsers(usersArray) {
      let userId = '';
      usersArray.forEach(function(user){
        // Key user info on their unique user ID
        userId = user["id"];

        // Store the entire user object (you may not need all of the info)
        usersStore[userId] = user;
      });
    }
  }

  return tryGettingUsers();



}


