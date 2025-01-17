# Prisma Models

## Card

| Field      | Type     | Constraints |
|------------|----------|-------------|
| id         | String   |             |
| question   | String   |   Unique    |
| answer     | String   |             |
| id_user    | String   |             |
| createdAt  | DateTime |             |
| updatedAt  | DateTime |             |
| Learned    | Array    |             |

## Learned

| Field      | Type     | Constraints |
|------------|----------|-------------|
| id         | String   |             |
| id_user    | String   |   Unique    |
| id_card    | String   |   Unique    |
| createdAt  | DateTime |             |
| updatedAt  | DateTime |             |

# API Documentation

Les données sont envoyés avec l'achitecture suivante :
```
{
  data: données de l'objet,
  message: le message de succès ou d'erreur,
  success: le status de la requête : false (erreur) ou true (tout est bon)
}
```

## Card

### Get One (GET)
```
"/api/flashcard/$id"
```

### Get All (GET)
```
"/api/flashcard"
```

### Get All From One User (GET)
```
"/api/flashcard/user/$id_user"
```

### Create (POST)
```
"/api/flashcard"
```

```
{
  answer: string,
  question: string,
  userId: string
}
```

<!--
### Edit 
```
"/api/...."
```
-->

## Learned

### Get All (GET)
```
"/api/flashcard/learned"
```

### Get All From One User (GET)
```
"/api/flashcard/user/${id_user}/learned-flashcards"
```


 











## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
