# Deploy to an AWS EC2 instance with Node.js and MongoDB

This repository is intended to help you deploy a basic Node.js app with a MongoDB database.  The Node.js app will serve out static content (index.html, CSS, client-side JavaScript) which point to a Node.js endpoints.  

[Watch the video tutorial](http://www.youtube.com/watch?v=7vf210p2tJg)   
[![Create an AWS EC2 Instance](https://www.aaronwht.com/images/videos/aws-ec2-node-mongo.jpg)](http://www.youtube.com/watch?v=7vf210p2tJg)  


Commands:  
Update permissions on your `.pem` file:  
`sudo chmod 400 YOUR_FILE_NAME.PEM`  

Install Node Version Manager:  
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash` 

Install Node:  
`nvm install node` 

Create redirect from port 80 to 8000:  
`sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000`  

`cd /etc/yum.repos.d` 
`sudo touch mongo-org-5.0.repo`  


```
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
```  

Install MongoDB:  
`sudo yum install -y mongodb-org` 

Make MongoDB directories:  
```
cd /  
sudo mkdir data 
sudo mkdir db  
```

Navigate back to the home directory:  
`cd /home/ec2-user` 

Start Mongo Service:  
`sudo service mongod start` 

Use MongoDB:  
`mongo`  
`use mern`  

Create database owner:  
`db.createUser({ user: "my_user", pwd: "my_pwd", roles: ["dbOwner"] })`  

Create database documents:  
```
db.members.insert({ firstName: "Bill", lastName: "Smith" })
db.members.insert({ firstName: "Bob", lastName: "Smith" })
```  

Install `mongoose` and `express`  
`npm install mongoose express`

Install PM globally:  
`npm install pm2 -g` 

Run the app:  
`pm2 start server.js` 


