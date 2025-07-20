# Starteady - AI Agency Website

A modern, responsive website for Starteady AI agency, inspired by The Level Up's design aesthetic. This website showcases AI services including chatbots, business automation, lead generation, and marketing AI solutions.

## 🚀 Features

### Design & UI
- **Modern Gradient Design**: Beautiful gradient backgrounds and text effects
- **Responsive Layout**: Fully responsive design that works on all devices
- **Custom Robot Mascot**: Animated robot logo matching your brand identity
- **Smooth Animations**: CSS animations and JavaScript interactions
- **Professional Typography**: Clean, modern font using Inter

### Sections
- **Hero Section**: Eye-catching landing with animated robot mascot
- **Services**: Four main AI service offerings with detailed features
- **About**: Company highlights with statistics and key benefits
- **Contact**: Functional contact form with validation
- **Footer**: Complete site navigation and social links

### Interactive Features
- **Enhanced Smooth Scrolling**: Custom easing animations with progress indicator
- **Scroll to Top Button**: Floating button that appears when scrolling down
- **Active Navigation Highlighting**: Current section highlighted in navigation
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Form Validation**: Client-side form validation with notifications
- **Loading Animations**: Page load animations and transitions
- **Counter Animations**: Animated statistics counters
- **Hover Effects**: Interactive hover states on cards and buttons
- **Airtable Integration**: Form submissions saved directly to Airtable database

## 📁 File Structure

```
starteady-website/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and animations
├── script.js               # JavaScript functionality
├── airtable-config.js      # Airtable configuration
├── AIRTABLE-SETUP.md       # Airtable setup guide
└── README.md               # This file
```

## 🛠️ Setup Instructions

### Option 1: Local Development
1. **Download Files**: Save all files to your local machine
2. **Open in Browser**: Double-click `index.html` to open in your web browser
3. **Live Server** (Recommended): Use VS Code's Live Server extension for auto-refresh

### Airtable Integration Setup
1. **Follow the Airtable Setup Guide**: See `AIRTABLE-SETUP.md` for detailed instructions
2. **Configure Credentials**: Update `airtable-config.js` with your Airtable credentials
3. **Test Form Submission**: Fill out the contact form to verify integration works

### Option 2: Web Hosting
1. **Upload Files**: Upload all files to your web hosting provider
2. **Domain Setup**: Point your domain to the hosting directory
3. **SSL Certificate**: Enable HTTPS for security

### Option 3: GitHub Pages
1. **Create Repository**: Create a new GitHub repository
2. **Upload Files**: Push all files to the repository
3. **Enable Pages**: Go to Settings > Pages and enable GitHub Pages

## 🎨 Customization Guide

### Colors
The website uses a consistent color scheme that can be easily modified in `styles.css`:

```css
/* Primary Colors */
--primary-gradient: linear-gradient(135deg, #667eea, #764ba2);
--accent-gradient: linear-gradient(135deg, #FF6B9D, #4ECDC4);
--robot-blue: #4A90E2;
--robot-dark-blue: #1E3A8A;
```

### Content Updates

#### Company Information
- **Logo**: Replace the CSS-based robot with your own logo image
- **Company Name**: Update "Starteady" throughout the HTML
- **Contact Details**: Update email, phone, and business hours
- **Social Links**: Add your actual social media URLs

#### Services
Modify the services section in `index.html`:
```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-[icon-name]"></i>
    </div>
    <h3>Your Service Name</h3>
    <p>Service description...</p>
    <ul class="service-features">
        <li>Feature 1</li>
        <li>Feature 2</li>
    </ul>
</div>
```

#### Statistics
Update the statistics in the About section:
```html
<div class="stat">
    <div class="stat-number">Your Number</div>
    <div class="stat-label">Your Label</div>
</div>
```

### Images and Media
- **Hero Background**: Replace the gradient with your own background image
- **Service Icons**: Use Font Awesome icons or custom SVG icons
- **Robot Mascot**: Customize the CSS-based robot or replace with an image

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Technical Features

### CSS Features
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: Easy color and spacing management
- **CSS Animations**: Smooth transitions and keyframe animations
- **Backdrop Filter**: Modern glassmorphism effects

### JavaScript Features
- **Intersection Observer**: Scroll-based animations
- **Form Validation**: Client-side validation with notifications
- **Mobile Navigation**: Touch-friendly mobile menu
- **Parallax Effects**: Subtle scroll animations

### Performance Optimizations
- **Minified Dependencies**: Using CDN for Font Awesome and Google Fonts
- **Optimized Images**: CSS-based graphics where possible
- **Smooth Scrolling**: Native CSS scroll-behavior
- **Lazy Loading**: Intersection Observer for animations

## 🌐 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## 📧 Contact Form

The contact form includes:
- **Client-side Validation**: Real-time form validation
- **Success/Error Notifications**: User-friendly feedback
- **Responsive Design**: Works on all devices
- **Easy Integration**: Ready to connect to your backend

### Form Fields
- Name (required)
- Email (required)
- Company Name
- Service Selection (required)
- Message

## 🚀 Deployment

### Recommended Hosting Providers
- **Netlify**: Easy deployment with drag-and-drop
- **Vercel**: Great for static sites with automatic deployments
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable cloud hosting

### SEO Optimization
- **Meta Tags**: Optimized for search engines
- **Semantic HTML**: Proper heading structure
- **Alt Text**: Ready for image optimization
- **Schema Markup**: Ready for structured data

## 🔒 Security Considerations

- **HTTPS**: Always use HTTPS in production
- **Form Security**: Implement server-side validation
- **Content Security Policy**: Consider adding CSP headers
- **Regular Updates**: Keep dependencies updated

## 📈 Analytics Integration

Ready for analytics platforms:
- **Google Analytics**: Add tracking code to `<head>`
- **Facebook Pixel**: Add pixel code for ad tracking
- **Hotjar**: Add heatmap tracking
- **Google Tag Manager**: Centralized tag management

## 🤝 Support

For customization help or technical support:
1. Check the CSS comments for styling guidance
2. Review the JavaScript comments for functionality
3. Test on multiple devices and browsers
4. Validate HTML and CSS using online tools

## 📄 License

This website template is created for Starteady AI agency. Feel free to modify and use for your own projects.

---

**Built with ❤️ for Starteady AI Agency** 