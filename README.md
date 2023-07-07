# Harmony
Welcome to the **Harmony** repository! This is our semester project, which aims to create a communication platform similar to Discord. Our platform provides a wide range of communication services through servers, where users can join written, voice, and video discussion channels. Additionally, users have the ability to engage in private one-on-one messaging.

## Technology stack

### CI/CD

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

  

### Databases

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

  

### Languages

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

  

### Frontend

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Tauri](https://img.shields.io/badge/tauri-%2324C8DB.svg?style=for-the-badge&logo=tauri&logoColor=%23FFFFFF)

  

### Backend

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

  

### Deployment

![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)

![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)

### Microservices architecture
Deployed on Google Kubernetes Engine (GKE)  



![Architecture](https://drive.google.com/uc?export=view&id=1kRrZ5eCNUO4cAqYulAkAyjHvxNxg2w-V)
![Architecture](https://drive.google.com/uc?export=view&id=1-uhaMWyyag9P15gDVvx97zKv5d19fvkP)



## Try it out

### Live demo

Public app: https://harmony.vg

### Local demo

Run the app for the first time using the following command

```
npm install
docker compose up
npx nx serve client
```

The public app will be available at http://localhost:4200  
The api will be available at http://localhost:3000  

Content of .env files put in each root of microservices

```
NODE_ENV=dev

PORT=3000

CORS_ORIGIN=*

RATE_LIMIT_TTL=60000

RATE_LIMIT_MAX=100

API_ENTRYPOINT= {API_ENTRYPOINT_KEY}

MONGODB_URI= {MONGODB_URI_KEY}

JWT_TOKEN_SECRET={SECRET_TOKEN}
```

## Contributors

* **Louis Moulin** - [MoulinLouis](https://github.com/MoulinLouis)
* **Alexis Lours** - [alexislours](https://github.com/alexislours)
* **Anthony Arjona** - [AnthonyARJONA](https://github.com/AnthonyARJONA)
* **Julien Arbellini** - [JulienArbellini](https://github.com/JulienArbellini)
