# 🔗 DNS Configuration for Starteady.com

## Quick Reference for Domain Setup

### Required DNS Records for Vercel

When you add `starteady.com` to your Vercel project, you'll need to configure these DNS records at your domain registrar:

#### Option 1: Apex Domain + CNAME (Recommended)

**For starteady.com (Apex Domain):**
```
Type: A
Name: @
Value: 76.76.19.19
TTL: 3600
```

**For www.starteady.com:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### Option 2: Nameservers (Alternative)

If you prefer to use Vercel's nameservers:

**Replace your registrar's nameservers with:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

## Popular Domain Registrars Setup

### GoDaddy
1. Log into GoDaddy
2. Go to "My Products" → "DNS"
3. Click "Manage DNS" next to starteady.com
4. Add the A and CNAME records above
5. Save changes

### Namecheap
1. Log into Namecheap
2. Go to "Domain List" → "Manage"
3. Click "Advanced DNS"
4. Add the A and CNAME records above
5. Save changes

### Google Domains
1. Log into Google Domains
2. Select starteady.com
3. Go to "DNS" → "Manage custom records"
4. Add the A and CNAME records above
5. Save changes

### Cloudflare
1. Log into Cloudflare
2. Select starteady.com
3. Go to "DNS" → "Records"
4. Add the A and CNAME records above
5. Save changes

## Verification

After adding DNS records:
1. Wait 24-48 hours for propagation
2. Check at [whatsmydns.net](https://whatsmydns.net)
3. Vercel dashboard will show "Valid" status
4. Visit https://starteady.com to test

## Common Issues

**"DNS Not Configured" in Vercel:**
- Double-check DNS records are exactly as shown
- Ensure TTL is set to 3600 or lower
- Wait for propagation (can take up to 48 hours)

**Website Not Loading:**
- Verify Vercel deployment is successful
- Check that all files are in your GitHub repository
- Ensure domain is added to Vercel project

**HTTPS Issues:**
- Vercel automatically provides SSL certificates
- If you see HTTPS errors, wait for certificate generation (usually 5-10 minutes) 