# Airtable Integration Setup Guide (2025 Edition)

This guide will help you securely connect your website or app to Airtable using best practices for 2025. **Direct client-side API access is not supported by Airtable.** You must use a backend to keep your API key safe and avoid CORS issues.

---

## 1. Create Your Airtable Base

1. Go to [Airtable](https://airtable.com) and sign in or create an account.
2. Create a new base (e.g., "Lead Contacts").
3. Add a table (e.g., "Lead Contacts" or "Contact Submissions").
4. Add the following columns (fields):
   - **Name** (Single line text)
   - **Email** (Email)
   - **Company** (Single line text)
   - **Service** (Single select)
   - **Message** (Long text)
   - **Date Submitted** (Date)

---

## 2. Get Your Airtable Credentials

- **Base ID:**
  - Open your base in Airtable. The URL will look like `https://airtable.com/appXXXXXXXXXXXXXX/tblXXXXXXXXXXXXXX`.
  - The part after `/airtable.com/` starting with `app` is your **Base ID**.
- **API Key:**
  - Go to your [Airtable account page](https://airtable.com/account).
  - Generate or copy your **API key** (or use a Personal Access Token if required).

> **Note:** Never share your API key publicly or commit it to public repositories.

---

## 3. Backend Integration (Required)

Airtable does **not** support CORS for browser requests. You **cannot** connect directly from client-side JavaScript. Instead, set up a backend (Node.js, Python, serverless function, etc.) to securely handle API requests.

### Example: Node.js Express Backend

```js
// server.js
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const AIRTABLE_API_URL = 'https://api.airtable.com/v0/<YOUR_BASE_ID>/<YOUR_TABLE_NAME>';
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY; // Store in environment variable

app.post('/api/submit', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;
    const response = await axios.post(
      AIRTABLE_API_URL,
      {
        fields: { name, email, company, service, message, 'Date Submitted': new Date().toISOString() }
      },
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json({ success: true, id: response.data.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

- Deploy this backend (e.g., Vercel, Netlify Functions, your own server).
- Set your `AIRTABLE_API_KEY` as an environment variable.
- From your frontend, POST form data to `/api/submit`.

---

## Vercel Serverless Function Integration (Recommended)

1. Add the provided `api/airtable-submit.js` file to your project root.
2. In your Vercel dashboard, set these environment variables:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_TABLE_NAME`
3. Update your frontend form submission to POST to `/api/airtable-submit`.
4. On successful submission, handle the response as needed in your UI.

See the README for code examples.

---

## 4. Security Best Practices

- **Never expose your Airtable API key in client-side code.**
- Use environment variables to store secrets.
- Validate and sanitize all incoming data on your backend.
- Implement rate limiting and spam protection as needed.

---

## 5. Troubleshooting

- **CORS errors:** You are trying to access Airtable directly from the browser. Use a backend.
- **401 Unauthorized:** Check your API key and permissions.
- **Field mismatch:** Ensure your field names in code match exactly with Airtable.

---

## 6. References

- [Airtable API Docs](https://airtable.com/developers/web/api/introduction)
- [Airtable Account Settings](https://airtable.com/account)
- [Airtable Community](https://community.airtable.com/)

---

**Last updated: 2025** 