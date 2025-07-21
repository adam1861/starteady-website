// Airtable Configuration File
// Replace these values with your actual Airtable credentials

window.AIRTABLE_CONFIG = {
    // Your Airtable Base ID (found in the URL when you open your base)
    baseId: 'YOUR_AIRTABLE_BASE_ID',
    
    // Your Airtable API Key (found in your account settings)
    apiKey: 'YOUR_AIRTABLE_API_KEY',
    
    // The name of your table in Airtable
    tableName: 'Contact Submissions',
    
    // Field names in your Airtable table (should match exactly)
    fields: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        service: 'Service',
        message: 'Message',
        dateSubmitted: 'Date Submitted'
    }
};

// Instructions for setup:
// 1. Go to https://airtable.com and create a new base
// 2. Create a table called "Contact Submissions" (or change tableName above)
// 3. Add these columns to your table:
//    - Name (Single line text)
//    - Email (Email)
//    - Company (Single line text)
//    - Service (Single select)
//    - Message (Long text)
//    - Date Submitted (Date)
// 4. Get your Base ID from the URL: https://airtable.com/appXXXXXXXXXXXXXX/tblXXXXXXXXXXXXXX
// 5. Get your API Key from: https://airtable.com/account
// 6. Replace the values above with your actual credentials
// 7. Make sure your Airtable base is set to "Public" or you have proper CORS settings 
