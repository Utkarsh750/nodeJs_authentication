const fs = require("fs");
const os = require("os");

const user = os.userInfo();
console.log(user);
console.log(user.username);

fs.appendFile("newTextFile.txt", "Hii", + user.username + "!", () => {
  console.log("File is created");
});
