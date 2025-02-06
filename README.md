# Designr

Designr is my personal project—a next-generation design editor inspired by tools like [vue-fabric-editor](https://github.com/ikuaitu/vue-fabric-editor) (built on Vue). Built with Next.js and Fabric.js, it’s designed to offer a powerful, responsive canvas editor with a rich set of features for creating and editing graphics.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [License](#license)

---

## Features

- **Responsive Canvas**  
  Automatically resizes and auto-zooms using a Resize Observer to adjust the canvas dimensions.

- **Rich Editor Layout**  
  Includes a custom Editor page with a Navbar, Sidebar, Toolbar, and Footer.

- **Shape and Text Tools**  
  Add and manipulate various shapes (e.g., pentagon, hexagon) and text objects.

- **Advanced Object Controls**  
  Support for fill color, stroke color, stroke width, layering, transparency, and more.

- **API and State Management**  
  API building with Hono for scalable backend routes and React Query for data fetching.  
  Client-side state management with Zustand (carefully used only on the client).

- **Authentication**  
  Personal authentication setup using Auth.js (v5) with OAuth (GitHub, Google) and database session management via PostgreSQL, Neon, and Drizzle ORM.

- **Third-Party Integrations**  
  Integrates Unsplash for third-party images, Replicate AI for image generation and background removal, and Stripe for subscription billing.

- **Future Enhancements**  
  Plans for features such as export/import, undo/redo, keyboard shortcuts, and more.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (recommended: Node.js 18.x)
- Git

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/CJ-ONYERO99/Designr.git
   cd Designr
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file at the root of the project with the following variables:

   ```env
   NEXT_PUBLIC_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   NEXT_PUBLIC_BYTESCALE_API_KEY=your_bytescale_api_key
   REPLICATE_API_TOKEN=your_replicate_api_token
   AUTH_SECRET=your_auth_secret
   AUTH_GITHUB_ID=your_github_client_id
   AUTH_GITHUB_SECRET=your_github_client_secret
   DATABASE_URL=your_database_url
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PRICE_ID=your_stripe_price_id
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

   Replace the placeholders with your actual keys.

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   The app should now be running at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

I structured the project using Next.js' latest app directory, paying close attention to:

- **Route Groups & Private Folders:**  
  To ensure a clean separation of public routes and internal modules.
  
- **Custom Hooks and Components:**  
  - `useEditor.ts` for initializing and managing the Fabric.js canvas.  
  - `useAutoResize.ts` for making the canvas responsive with auto-zoom.

For more details, see [Next.js project structure](https://nextjs.org/docs/getting-started/project-structure).

---

## Environment Variables

I use several environment variables to configure the application. In local development, I set them in a `.env.local` file; in production (e.g., on Vercel), I configure them via the Vercel dashboard:

- **NEXT_PUBLIC_URL & NEXT_PUBLIC_API_URL:** Base URLs for my app and API.
- **NEXT_PUBLIC_UNSPLASH_ACCESS_KEY:** Unsplash API key.
- **NEXT_PUBLIC_BYTESCALE_API_KEY:** Bytescale API key.
- **REPLICATE_API_TOKEN:** Token for Replicate AI.
- **AUTH_SECRET:** A secret string for signing authentication tokens.
- **AUTH_GITHUB_ID & AUTH_GITHUB_SECRET:** GitHub OAuth credentials.
- **DATABASE_URL:** Database connection string.
- **AUTH_GOOGLE_ID & AUTH_GOOGLE_SECRET:** Google OAuth credentials.
- **STRIPE_SECRET_KEY, STRIPE_PRICE_ID & STRIPE_WEBHOOK_SECRET:** Stripe API keys and IDs for subscriptions.

---

## Usage

- **Editing:**  
  Access the Editor page to use the canvas tools for drawing, adding shapes, and editing text.
  
- **Authentication:**  
  OAuth authentication is set up using Auth.js. Test the endpoints at `/api/auth/providers`, `/api/auth/signin`, and `/api/auth/signout`.

- **Third-Party Integrations:**  
  I’ve integrated support for Unsplash, Replicate AI, and Bytescale. Refer to their respective docs for more information.

- **API & State Management:**  
  The project leverages Hono for building backend APIs and React Query for data fetching, with Zustand handling client-side state.

---

## Deployment

I deploy the project on Vercel. To deploy:

1. **Push to GitHub:**  
   Ensure your repository is updated with the latest changes.

2. **Configure Vercel:**  
   - Link your GitHub repository in the Vercel dashboard.
   - Set environment variables in Vercel.
   - Use the default `npm run build` script.

3. **Deploy:**  
   Vercel will automatically build and deploy the project.

---

## Roadmap

Below is a summary of my planned features and improvements:

- **Day 1-2:**  
  Set up Next.js, install libraries, understand project structure, and set up Fabric.js.
  
- **Day 3-4:**  
  Build the responsive canvas, add auto-zoom, and integrate basic editor components (Navbar, Sidebar, etc.).

- **Day 5-6:**  
  Expand editor functionality: shape tools, text tools, API setup with Hono, and third-party integrations (Unsplash, Replicate AI).

- **Day 7-8:**  
  Implement advanced features: object layering, undo/redo, export/import, and authentication with Auth.js.

- **Day 9-10:**  
  Build backend schemas, project APIs, and add SAAS functionality with Stripe and Zustand.

I plan to continue refining features, addressing issues (like canvas flickering and color picker warnings), and iterating based on testing and feedback.

---

## License

This project is for personal use and learning. (Include a proper license if I decide to open-source it.)

---

Feel free to reach out if you have any suggestions or improvements. Enjoy exploring Designr!

---