async function getGithubUserActivity(username) {
    if (!username)
    {
        throw new Error("Enter a username as command line argument")
    }

    let response = await fetch(
    `https://api.github.com/users/${username}/events`,
    {
      method: "GET",
      headers: {
        "User-Agent": "node.js",
      },
    });
    
    if (!response.ok) {
        if (response.status == 404)
            throw new Error(`User not found, please recheck the username: ${username}`);
        else
            throw new Error(`Error encountered with status code: ${response.status}`);
    }
    
    return response.json();
}

function displayEvent(data) {
    data.forEach(item => {
        let action = ""
        switch (item.type) {
            case "CommitCommentEvent":
                action = `$Performed ${item.payload.action}, Comment: ${item.payload.comment} at $`
        }
    });
}

//MAIN

getGithubUserActivity(username="michaelEmeka")
  .then((data) => displayEvent(data=data))
  .catch((error) => console.log(error));
