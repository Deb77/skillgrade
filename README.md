[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Deb77/skillgrade">
    <img src="client/public/logo.svg" alt="logo" height=80 width=80/>
  </a>

  <h3 align="center">Skill Grade</h3>

  <p align="center">
   An online platform that caters to streamlined learning in various tracks like web dev, UI design, etc. It focuses on developing an individuals skills by providing various tasks and projects.
    <br />
  </p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="https://res.cloudinary.com/dzxtxkngg/image/upload/v1630776933/skillshare_feed/WhatsApp_Image_2021-09-04_at_23.05.16_wavvff.jpg"/>

### What is skill grade?

Skill Grade is an online platform that caters to streamlined learning in various tracks like web dev, UI design, etc.

### What are the steps to start a task?

Step 1: Choose the category you want to learn and work on from the dashboard page

Step 2: Based on your selection it will take you to tasklist page where there are various kinds of projects divided into 3 categories namely, beginner, intermediate and advanced level. You can choose between them. It is recommended you start from the beginner tasks.

Step 3: Next you will be redirected to the selected task. This page contains all the information such as task introduction and resources that can be used. You can use this and start working on the task. (It is mandatory to prepare a pdf document of your work)

Step 4: After completing the task you can upload your file in the submission section. You will be scored after our experts review your tasks. That's it!! You've completed a task.

Step 5: We also have a feed where you can post images of your work and gain and likes from other students. You can also use the feed to take inspiration and get ideas.

### What is the Leaderboard?

The leaderboard page shows you your current rank among all other registered students. The ranks is based on points that are allocated to you on task completion. So try your best to complete maximum tasks and climb up to the top!!

### What does "Your Tasks" sections imply on the dashboard?

"Your tasks" section contains all the tasks that have been started by you but are not yet submitted. It shows no. of days left till the due date and would alert overdue if due date has been crossed. Remeber the points of the tasks keep decreasing after the due date so hurry up and complete all pending tasks!

### Built With

* [Postgresql](https://www.postgresql.org)
* [Express](https://expressjs.com)
* [React](https://reactjs.org)
* [Redux](https://redux.js.org)
* [Node.js](https://nodejs.org)
* [Clouding](https://cloudinary.com)
* [AWS S3](https://aws.amazon.com/s3)


<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Get free API keys to populate the .env files(an env example has been provided)
2. Clone the repo
   ```sh
   git clone https://github.com/Deb77/skillgrade
   ```
3. Install NPM packages
   ```sh
   cd client
   npm install
   cd backend
   npm install
   ```
4. Run the servers(backend and client on separate terminals)
   ```sh
   cd client
   npm start
   
   cd backend 
   nodemon server.js
   ```
   
<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

[contributors-shield]: https://img.shields.io/github/contributors/Deb77/skillshare?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Deb77/skillgrade
[forks-url]: https://github.com/Deb77/skillgrade/network/members
[stars-shield]: https://img.shields.io/github/stars/Deb77/skillgrade
[stars-url]: https://github.com/Deb77/skillgrade/stargazers
[issues-shield]: 	https://img.shields.io/github/issues/Deb77/skillgrade
[issues-url]: https://github.com/Deb77/skillgrade/issues
[license-shield]: https://img.shields.io/github/license/Deb77/skillgrade
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
