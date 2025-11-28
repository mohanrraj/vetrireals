# SVR Real Estate Website

A modern, fully animated real estate website built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

✨ **Stunning Animations**
- Smooth page transitions with Framer Motion
- Animated navigation with gradient backgrounds
- Scroll-triggered animations for all sections
- Animated borders and gradient effects

🎨 **Modern Design**
- Responsive layout for all devices
- Gradient color schemes (#D174D2, #3F567F, #412653)
- Glass morphism effects
- Beautiful hover animations

📱 **Sections Included**
- **Navigation Bar**: Animated gradient buttons with logo
- **Slideshow**: Welcome screen + 3 rotating slides with animated text
- **Founder Section**: Animated profile with detailed information page
- **About Us**: Multiple animated cards with company information
- **Corporate Profile**: Mission, Vision, Values with icons
- **Project Scrolling**: Infinite scroll animation of ongoing projects
- **Projects Grid**: 10 projects with individual detail pages
- **Video Section**: Embedded YouTube videos
- **Contact Section**: Contact form, map, and social media links
- **Footer**: Comprehensive footer with auto-updating year

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Your Images**
   
   You need to add images to the following directories:

   - `/public/image/logo.jpg` - Company logo
   - `/public/founder/founder.jpg` - Founder photo
   - `/public/slides/` - Add 3 slideshow images:
     - `slide1.jpg`
     - `slide2.jpg`
     - `slide3.jpg`
   - `/public/project_scrolling/` - Add 10 project images:
     - `project1.jpg` through `project10.jpg`
   - `/public/projects/[1-10]/` - For each project (1-10), create a folder with:
     - `location.jpg`
     - `plot-price.jpg`
     - `layout.jpg`
     - `site.jpg`

   **Example structure:**
   ```
   public/
   ├── image/
   │   └── logo.jpg
   ├── founder/
   │   └── founder.jpg
   ├── slides/
   │   ├── slide1.jpg
   │   ├── slide2.jpg
   │   └── slide3.jpg
   ├── project_scrolling/
   │   ├── project1.jpg
   │   ├── project2.jpg
   │   └── ... (up to project10.jpg)
   └── projects/
       ├── 1/
       │   ├── location.jpg
       │   ├── plot-price.jpg
       │   ├── layout.jpg
       │   └── site.jpg
       ├── 2/
       │   └── ... (same 4 images)
       └── ... (up to folder 10)
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Customization

### Update Contact Information

Edit the following files:
- `components/ContactSection.tsx` - Phone, email, address
- `components/Footer.tsx` - Footer contact details
- `components/Navbar.tsx` - WhatsApp number

### Update Project Names

Edit `components/ProjectsSection.tsx` and `app/project/[id]/page.tsx` to modify project names and details.

### Update Colors

The main gradient colors are defined in:
- `tailwind.config.js` - Animation keyframes
- `app/globals.css` - CSS variables and gradient classes

Main colors used:
- Primary: `#D174D2` (Pink)
- Secondary: `#3F567F` (Blue)
- Tertiary: `#412653` (Purple)

### Update Social Media Links

Edit these files:
- `components/ContactSection.tsx`
- `components/Footer.tsx`

Current links:
- Facebook: https://www.facebook.com/srivetrirealsassociate
- Instagram: https://www.instagram.com/svr24associates
- YouTube: https://www.youtube.com/@SVRASSOCIATES-v2w

### Update Videos

Edit `components/VideoSection.tsx` to change YouTube video IDs.

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Animation Features

- **Navbar**: Slides down on page load, gradient button hover effects
- **Slideshow**: 
  - Welcome text animates from left, right, and up
  - Slides change every 4 seconds
  - Text boxes with animated glowing borders
- **All Sections**: Fade in and slide up on scroll
- **Project Scrolling**: Infinite horizontal scroll
- **Buttons**: Scale and shadow effects on hover
- **Cards**: Lift effect on hover

## Pages

1. **Home** (`/`) - Main landing page with all sections
2. **Project Details** (`/project/[1-10]`) - Individual project pages
3. **Founder Details** (`/founder-details`) - Detailed founder information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images with Next.js Image component
- Lazy loading for images
- Code splitting
- CSS animations with GPU acceleration

## License

© 2024 SVR Real Estate. All rights reserved.

## Support

For any issues or questions, please contact:
- Email: info@svrassociates.com
- Phone: +91 98765 43210

---

**Note**: Make sure to replace all placeholder images with your actual project images before deploying to production.
