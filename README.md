A full-stack **MERN + Tailwind CSS** web application inspired by Instagram stories — where an admin can create, edit, and delete visual stories, and normal users can view them interactively with auto-playing slides, smooth transitions, and timeline progress.

** (Admin credential-> email- admin@webstories.com, password - Admin@123)

##  Tech Stack     
**Frontend:**
- React (Vite)
- Tailwind CSS
- Axios
- Framer Motion (for story animations)
- Lucide Icons
**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary (media upload)
- JWT Authentication
- bcryptjs (password hashing)

## How It Works
*Admin
Login with seeded credentials
Can create, edit, and delete stories
Each story can have multiple image/video slides
Media is uploaded directly to Cloudinary
Redirects to “All Stories” after creation

*Normal User
Can sign up and log in\
Sees all stories created by admin
Clicks “View Story” → opens a fullscreen viewer
Viewer automatically plays slides with a timeline progress bar
Can click to skip slides or go back
 
*Story Viewer Features
Auto-slide every 5 seconds
Click to skip immediately
Smooth animations via Framer Motion
Timeline progress bar for each slide
Auto-close after the final slide

Authentication Flow
JWT tokens stored in localStorage
API requests include Authorization: Bearer <token>
Admin and user routes are protected on the backend

---