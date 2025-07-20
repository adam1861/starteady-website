# Airtable Integration Setup Guide

This guide will help you set up Airtable to collect form submissions from your Starteady website.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Airtable Account
1. Go to [https://airtable.com](https://airtable.com)
2. Sign up for a free account
3. Create a new workspace

### Step 2: Create Your Base
1. Click "Add a base" → "Start from scratch"
2. Name it "Starteady Contact Form" or similar
3. Click "Create base"

### Step 3: Set Up Your Table
1. Rename the first table to "Contact Submissions"
2. Add these columns:

| Column Name | Type | Description |
|-------------|------|-------------|
| Name | Single line text | Customer's full name |
| Email | Email | Customer's email address |
| Company | Single line text | Company name (optional) |
| Service | Single select | Service they're interested in |
| Message | Long text | Additional message (optional) |
| Date Submitted | Date | When the form was submitted |

### Step 4: Configure Service Options
1. Click on the "Service" column
2. Click "Configure field"
3. Add these options:
   - AI Chatbots
   - Business Automation
   - Lead Generation
   - Marketing AI
   - Custom Solution

### Step 5: Get Your Credentials

#### Get Base ID:
1. Open your base in Airtable
2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/tblXXXXXXXXXXXXXX`
3. Copy the part after `/app` and before `/tbl` (this is your Base ID)

#### Get API Key:
1. Go to [https://airtable.com/account](https://airtable.com/account)
2. Scroll down to "API" section
3. Click "Generate API key"
4. Copy the generated key

### Step 6: Update Configuration
1. Open `airtable-config.js` in your website files
2. Replace the placeholder values:

```javascript
window.AIRTABLE_CONFIG = {
    baseId: 'appXXXXXXXXXXXXXX', // Your actual Base ID
    apiKey: 'keyXXXXXXXXXXXXXX', // Your actual API Key
    tableName: 'Contact Submissions',
    // ... rest of the config
};
```

### Step 7: Test the Integration
1. Open your website in a browser
2. Fill out the contact form
3. Submit the form
4. Check your Airtable base - you should see a new record!

## 🔧 Advanced Configuration

### Custom Field Names
If you want to use different column names in Airtable, update the `fields` object:

```javascript
fields: {
    name: 'Customer Name',        // Instead of 'Name'
    email: 'Email Address',       // Instead of 'Email'
    company: 'Business Name',     // Instead of 'Company'
    service: 'Interest',          // Instead of 'Service'
    message: 'Comments',          // Instead of 'Message'
    dateSubmitted: 'Timestamp'    // Instead of 'Date Submitted'
}
```

### Multiple Tables
You can create multiple tables for different purposes:

```javascript
// For general inquiries
tableName: 'General Inquiries',

// For specific services
tableName: 'Service Requests',

// For newsletter signups
tableName: 'Newsletter Subscribers'
```

### Additional Fields
Add more fields to collect additional information:

1. **Phone Number**: Add a "Phone" column in Airtable
2. **Budget Range**: Add a "Budget" single select field
3. **Project Timeline**: Add a "Timeline" single select field
4. **Source**: Add a "How did you find us?" single select field

Then update your form HTML and the `submitToAirtable` function accordingly.

## 🛡️ Security Best Practices

### API Key Security
- **Never commit your API key to public repositories**
- **Use environment variables in production**
- **Rotate your API key regularly**
- **Set up proper CORS settings**

### Rate Limiting
Airtable has rate limits:
- **5 requests per second per base**
- **1,200 requests per minute per base**

For high-traffic sites, consider:
- Implementing client-side rate limiting
- Using a backend service to buffer requests
- Setting up webhook notifications

### Data Privacy
- **GDPR Compliance**: Ensure you have proper consent mechanisms
- **Data Retention**: Set up automated data cleanup
- **Access Control**: Limit who can access your Airtable base

## 🔍 Troubleshooting

### Common Issues

#### "CORS Error"
- **Solution**: Use a CORS proxy or backend service
- **Alternative**: Set up a simple backend API

#### "API Key Invalid"
- **Check**: Your API key is correct and active
- **Verify**: You have proper permissions on the base

#### "Table Not Found"
- **Check**: Table name matches exactly (case-sensitive)
- **Verify**: Table exists in your base

#### "Field Not Found"
- **Check**: Column names match exactly
- **Verify**: Column types are correct

### Debug Mode
Enable debug logging by adding this to your browser console:

```javascript
// Enable debug mode
localStorage.setItem('debug', 'true');

// Check configuration
console.log('Airtable Config:', window.AIRTABLE_CONFIG);
```

### Testing API Connection
Test your API connection directly:

```javascript
// Test in browser console
fetch(`https://api.airtable.com/v0/YOUR_BASE_ID/Contact%20Submissions`, {
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
```

## 📊 Analytics & Monitoring

### Track Form Submissions
Monitor your form performance:

1. **Airtable Views**: Create filtered views for different services
2. **Automations**: Set up email notifications for new submissions
3. **Integrations**: Connect to Zapier for additional workflows

### Performance Monitoring
- Track form completion rates
- Monitor API response times
- Set up error alerting

## 🚀 Production Deployment

### Environment Variables
For production, use environment variables:

```javascript
// Production configuration
window.AIRTABLE_CONFIG = {
    baseId: process.env.AIRTABLE_BASE_ID,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: process.env.AIRTABLE_TABLE_NAME
};
```

### Error Handling
Implement robust error handling:

```javascript
// Enhanced error handling
try {
    await submitToAirtable(data);
    showNotification('Success!', 'success');
} catch (error) {
    console.error('Submission failed:', error);
    
    // Fallback: save to localStorage
    saveToLocalStorage(data);
    
    // Show user-friendly error
    showNotification('We\'re experiencing technical difficulties. Please try again later.', 'error');
}
```

## 📞 Support

If you need help with the Airtable integration:

1. **Check the troubleshooting section above**
2. **Review Airtable's API documentation**
3. **Test with the debug mode enabled**
4. **Contact Airtable support for API issues**

---

**Happy collecting leads! 🎉** 