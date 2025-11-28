# Image Requirements for SVR Real Estate Website

## Required Images

Please add the following images to make the website fully functional:

### 1. Logo and Owner Images (3 images)
**Location**: `/public/logo/`
- `logo.jpg` - Company logo (recommended size: 200x200px)
- `owner1.png` - Owner image 1 for welcome screen left side (recommended size: 400x400px, square)
- `owner2.jpg` - Owner image 2 for welcome screen right side (recommended size: 400x400px, square)

### 2. Founder Photo (1 image)
**Location**: `/public/founder/`
- `founder.jpg` - Photo of Dr. L. Velayutham (recommended size: 800x800px)

### 3. Slideshow Images (3 images)
**Location**: `/public/slides/`
- `slide1.jpg` - First slideshow image (recommended size: 1920x1080px)
- `slide2.jpg` - Second slideshow image (recommended size: 1920x1080px)
- `slide3.jpg` - Third slideshow image (recommended size: 1920x1080px)

**Note**: These images will display with the following text overlays:
- Slide 1: "Invest in Delivered The Quality Homes at Affordable Cost"
- Slide 2: "Book your Two Decades of Building Trust And Happiness"
- Slide 3: "Trust us Book our plot Live happily"

### 4. Project Scrolling Images (10 images)
**Location**: `/public/project_scrolling/`
- `project1.jpg` - Railway Nagar
- `project2.jpg` - Siddhar Nagar
- `project3.jpg` - Satellite City
- `project4.jpg` - VSR Nagar
- `project5.jpg` - Green Valley
- `project6.jpg` - Palm Gardens
- `project7.jpg` - Royal Heights
- `project8.jpg` - Sunrise Villa
- `project9.jpg` - Ocean View
- `project10.jpg` - Hill Top Residency

**Recommended size**: 800x600px each

### 5. Project Detail Images (40 images total - 4 per project)
**Location**: `/public/projects/[project-number]/`

For each project (1 through 10), create a folder and add these 3 images:

#### Project 1 - Railway Nagar
**Location**: `/public/projects/1/`
- `plot-price.jpg` - Pricing details image
- `layout.jpg` - Layout plan
- `site.jpg` - Site photo
**Note**: Location is now shown via embedded Google Maps iframe

#### Project 2 - Siddhar Nagar
**Location**: `/public/projects/2/`
- `location.jpg`
- `plot-price.jpg`
- `layout.jpg`
- `site.jpg`

#### Project 3 - Satellite City
**Location**: `/public/projects/3/`
- `location.jpg`
- `plot-price.jpg`
- `layout.jpg`
- `site.jpg`

#### Project 4 - VSR Nagar
**Location**: `/public/projects/4/`
- `location.jpg`
- `plot-price.jpg`
- `layout.jpg`
- `site.jpg`

#### Project 5 - Green Valley
**Location**: `/public/projects/5/`
- `location.jpg`
- `plot-price.jpg`
- `layout.jpg`
- `site.jpg`

#### Project 6 - Palm Gardens
**Location**: `/public/projects/6/`
- `location.jpg`
- `plot-price.jpg`
- `layout.jpg`
- `site.jpg`

#### Project 7 - Royal Heights
**Location**: `/public/projects/7/`
- `location.jpg`
- `plot-price.jpg`
- `layout.jpg`
- `site.jpg`

#### Project 8 - Sunrise Villa
**Location**: `/public/projects/8/`
- `location.jpg`
- `plot-price.jpg`
- `layout.jpg`
- `site.jpg`

#### Project 9 - Ocean View
**Location**: `/public/projects/9/`
- `location.jpg`
- `plot-price.jpg`
- `layout.jpg`
- `site.jpg`

#### Project 10 - Hill Top Residency
**Location**: `/public/projects/10/`
- `location.jpg`
- `plot-price.jpg`
- `layout.jpg`
- `site.jpg`

**Recommended size**: 1200x900px each

## Image Format Recommendations

- **Format**: JPG or PNG
- **Quality**: High quality for best display
- **Optimization**: Compress images to reduce file size while maintaining quality
- **Aspect Ratios**:
  - Logo: Square (1:1)
  - Founder: Square or Portrait (1:1 or 3:4)
  - Slideshow: Landscape (16:9)
  - Projects: Landscape (4:3)

## Quick Setup Checklist

- [ ] Add logo.jpg to /public/logo/
- [ ] Add founder.jpg to /public/founder/
- [ ] Add 3 slideshow images to /public/slides/
- [ ] Add 10 project images to /public/project_scrolling/
- [ ] Create 10 project folders in /public/projects/
- [ ] Add 4 images to each project folder

## Total Images Required

- Logo and Owners: 3
- Founder: 1
- Slideshow: 3
- Project Scrolling: 10
- Project Details: 30 (3 images × 10 projects)

**Total: 47 images**

**Note**: Location images are no longer needed as we now use embedded Google Maps for location display.

---

Once all images are added, run `npm run dev` to see your fully functional website!
