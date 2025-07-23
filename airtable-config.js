// Airtable Configuration File
// Replace these values with your actual Airtable credentials

window.AIRTABLE_CONFIG = {
    // Your Airtable Base ID (found in the URL when you open your base)
    baseId: 'appkHAwRgMos5OqMz',
    
    // Your Airtable API Key (found in your account settings)
    apiKey: 'pathIE4EukjjDi4ku.77737f5baaec7f20231954926a0bc1da59a988be7281ad49d3e162f8480d05d2',
    
    // The name of your table in Airtable
    tableName: 'Lead Contacts',
    
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
// 7. IMPORTANT: Airtable does not allow public API access or CORS for browser requests.
//    You must use a backend server or serverless function to securely interact with the Airtable API.
//    Do NOT expose your API key in client-side code. See the README or AIRTABLE-SETUP.md for backend integration guidance. 