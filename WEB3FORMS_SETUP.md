# Web3Forms Lead Setup

This website sends enquiries to Web3Forms from three places:

- Scroll email pop-up: `scroll-email`
- Consultation assistant modal: `consultation`
- Contact page 3-step form: `contact-page`

## 1. Create Your Web3Forms Access Key

1. Go to `https://web3forms.com/`.
2. Create or log in to your Web3Forms account.
3. Verify the email address where you want enquiries delivered.
4. Copy the access key.

## 2. Add The Key To This Project

Create a `.env` file in the project root:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_real_access_key_here
```

The `.env.example` file shows the same variable name.

## 3. Where Customer Data Goes

When a visitor submits a form, Web3Forms sends the data to the verified email attached to your access key. You can also log in to the Web3Forms dashboard to view/export stored submissions while they are retained by your plan.

The site also keeps a local backup in the visitor browser under `av_impact_leads`. This is only a debugging fallback and is not a business database.

## 4. Recommended Security Settings

- Use Web3Forms Trusted Domains if you upgrade to a plan that supports it.
- Keep collecting only the details you actually need: name, email, phone, city, company, and requirement.
- Do not ask visitors for passwords, payment card numbers, Aadhaar/PAN, or other sensitive identity documents through these forms.
- Add a privacy policy before running ads or collecting a large number of leads.
