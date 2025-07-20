# 🚀 Vercel Deployment Guide for Starteady.com

This guide will walk you through deploying your Starteady website to Vercel for free and connecting your custom domain `starteady.com`.

## 📋 Prerequisites

- A GitHub account (free)
- Your `starteady.com` domain
- All your website files ready

## 🎯 Step 1: Prepare Your Files

Your website files are already properly structured for Vercel deployment:
- ✅ `index.html` - Main HTML file
- ✅ `styles.css` - CSS styles
- ✅ `script.js` - JavaScript functionality
- ✅ `airtable-config.js` - Airtable configuration
- ✅ `vercel.json` - Vercel configuration (just created)

## 🎯 Step 2: Create GitHub Repository

1. **Go to GitHub**: Visit [github.com](https://github.com) and sign in
2. **Create New Repository**:
   - Click the "+" icon → "New repository"
   - Repository name: `starteady-website`
   - Make it **Public** (required for free Vercel)
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Upload Your Files**:
   ```bash
   # In your local project folder
   git init
   git add .
   git commit -m "Initial commit - Starteady website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/starteady-website.git
   git push -u origin main
   ```

## 🎯 Step 3: Deploy to Vercel

1. **Visit Vercel**: Go to [vercel.com](https://vercel.com)
2. **Sign Up/Login**: Use your GitHub account to sign up
3. **Import Project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Find and select your `starteady-website` repository
   - Click "Import"

4. **Configure Project**:
   - Project Name: `starteady-website` (or leave default)
   - Framework Preset: **Other** (since it's a static HTML site)
   - Root Directory: `./` (leave as default)
   - Build Command: Leave empty (not needed for static sites)
   - Output Directory: Leave empty (not needed for static sites)
   - Install Command: Leave empty

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)

6. **Get Your URL**:
   - Vercel will give you a URL like: `https://starteady-website-xxxx.vercel.app`
   - This is your temporary URL until you connect your domain

## 🎯 Step 4: Connect Your Custom Domain

### Option A: Using Vercel's Domain Management (Recommended)

1. **Add Domain in Vercel**:
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Click "Add Domain"
   - Enter: `starteady.com`
   - Click "Add"

2. **Configure DNS Records**:
   Vercel will show you the required DNS records. You'll need to add these to your domain registrar:

   **For Apex Domain (starteady.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.19.19
   TTL: 3600
   ```

   **For www subdomain (www.starteady.com):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

3. **Update DNS at Your Registrar**:
   - Log into your domain registrar (GoDaddy, Namecheap, etc.)
   - Find DNS management or DNS settings
   - Add the records shown above
   - Save changes

4. **Wait for Propagation**:
   - DNS changes can take 24-48 hours to propagate
   - Vercel will show "Pending" status until DNS is configured
   - You can check propagation at [whatsmydns.net](https://whatsmydns.net)

### Option B: Using External DNS Provider

If you prefer to manage DNS elsewhere:

1. **Get Vercel Nameservers**:
   - In Vercel project settings → Domains
   - Click "Configure" next to your domain
   - Select "External DNS Provider"
   - Vercel will provide nameservers like:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`

2. **Update Nameservers at Registrar**:
   - Go to your domain registrar
   - Find nameserver settings
   - Replace existing nameservers with Vercel's
   - Save changes

## 🎯 Step 5: SSL Certificate Setup

Vercel automatically provides SSL certificates:
- ✅ HTTPS will be enabled automatically
- ✅ SSL certificate renews automatically
- ✅ No additional configuration needed

## 🎯 Step 6: Test Your Website

1. **Check Domain**: Visit `https://starteady.com`
2. **Test All Features**:
   - Navigation links
   - Contact form
   - Airtable integration
   - Mobile responsiveness
   - Loading animations

## 🔧 Troubleshooting

### Common Issues:

**DNS Not Working:**
- Wait 24-48 hours for propagation
- Check DNS propagation at [whatsmydns.net](https://whatsmydns.net)
- Verify DNS records are correct

**Website Not Loading:**
- Check Vercel deployment status
- Verify all files are in the repository
- Check browser console for errors

**Airtable Integration Issues:**
- Verify `airtable-config.js` has correct credentials
- Check CORS settings in Airtable
- Test form submission

### Vercel Dashboard Features:

- **Analytics**: View visitor statistics
- **Functions**: Add serverless functions if needed
- **Environment Variables**: Store sensitive data securely
- **Preview Deployments**: Test changes before going live

## 📈 Performance Optimization

Your website is already optimized, but Vercel provides additional benefits:
- ✅ Global CDN (Content Delivery Network)
- ✅ Automatic image optimization
- ✅ Edge caching
- ✅ Instant deployments
- ✅ Zero downtime updates

## 💰 Cost Breakdown

**Vercel Free Tier Includes:**
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Global CDN
- ✅ 100GB bandwidth/month
- ✅ 100GB storage
- ✅ Perfect for your static website

**Paid Plans** (only if you need more):
- Pro: $20/month (unlimited bandwidth, team features)
- Enterprise: Custom pricing

## 🎉 Success!

Once completed, your website will be:
- ✅ Live at `https://starteady.com`
- ✅ Fast and secure with HTTPS
- ✅ Automatically updated when you push to GitHub
- ✅ Globally distributed via CDN
- ✅ Free to host and maintain

## 🔄 Updating Your Website

To make changes:
1. Edit files locally
2. Commit and push to GitHub
3. Vercel automatically redeploys
4. Changes go live instantly

```bash
git add .
git commit -m "Update website content"
git push origin main
```

Your website will be updated automatically within 1-2 minutes!

---

**Need Help?**
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- GitHub Issues: Create an issue in your repository 