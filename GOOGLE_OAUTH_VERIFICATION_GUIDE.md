# Google OAuth Verification Fix Guide

## Overview
This guide addresses the 6 Google OAuth verification errors received for the "Apocalypse Survival Shorts" application.

## Current Errors (from Google)
1. **Homepage URL not registered to user/verify ownership** — Domain not verified in Google Search Console
2. **Privacy policy "does not have sufficient content"** — Enhanced in v1.1
3. **Homepage "behind a login page"** — Fixed: both pages publicly accessible without auth
4. **Homepage "does not explain purpose of app"** — Fixed: explicit "What this app does/does NOT do" section
5. **App name "claude" in OAuth consent screen doesn't match "Apocalypse Survival Shorts" on homepage** — Must update in Google Cloud Console
6. **Application not compliant with Google APIs ToS (AI NCII concern)** — Fixed: explicit AI Safety compliance statement

---

## Required Actions

### 1. Verify Domain Ownership in Google Search Console (CRITICAL - Error #1)

**Steps:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property" → Select "URL prefix"
3. Enter: `https://www.nirmal.cc`
4. Verify ownership using one of:
   - **HTML file upload** (recommended): Download the verification file and upload to your site root
   - **DNS TXT record**: Add TXT record to your domain DNS
   - **Google Analytics**: If GA4 is already installed
   - **Google Tag Manager**: If GTM is installed
5. Wait for verification to complete (can take up to 24 hours)

**Note:** Your site must be deployed and accessible at `https://www.nirmal.cc` for this to work.

---

### 2. Update Google Cloud Console OAuth Consent Screen (CRITICAL - Errors #5, #6)

Go to: [Google Cloud Console → APIs & Services → OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)

#### Branding Section:
| Field | Value |
|-------|-------|
| **App Name** | **Apocalypse Survival Shorts** (exactly — was "claude") |
| **User Support Email** | `nirmalhimansha@gmail.com` |
| **App Logo** | Optional: upload a logo |

#### App Domain Section:
| Field | Value |
|-------|-------|
| **Authorized domains** | `nirmal.cc` |
| **Application Homepage link** | `https://www.nirmal.cc/apocalypse-shorts.html` |
| **Application Privacy Policy link** | `https://www.nirmal.cc/apocalypse-shorts-privacy.html` |
| **Application Terms of Service link** | Optional: can link to same privacy policy |

#### User Type (CRITICAL - Error #6):
- **Change from "Internal" to "External"**
- **Add Test Users**: `nirmalhimansha@gmail.com` (and any other test accounts)

#### Data Access:
- Select scopes:
  - `https://www.googleapis.com/auth/youtube.upload`
  - `https://www.googleapis.com/auth/youtube`
  - `https://www.googleapis.com/auth/userinfo.email`
  - `https://www.googleapis.com/auth/userinfo.profile`
- Justification: "Personal automation tool for daily YouTube Shorts generation. Single-user application run by content creator on own hardware. Publicly documented at provided URLs."

---

### 3. Deploy Updated Pages to www.nirmal.cc (CRITICAL - Errors #1, #3, #4)

Your site files are at:
```
C:\Users\nirmal\OneDrive\VS Code\HTML\Web Site\V8\NirmalHimansha\
```

**Files to deploy:**
- `index.html` (updated with navbar links)
- `apocalypse-shorts.html` (updated homepage)
- `apocalypse-shorts-privacy.html` (updated privacy policy v1.1)
- `style.css?v=2` (existing)
- `site.js?v=2` (existing)
- `aos.css?v=2` (existing)
- `aos.js?v=2` (existing)
- `wolf_4081853.png` (favicon)

**Deployment options:**
- Your current hosting provider (GitHub Pages, Netlify, Vercel, etc.)
- Ensure HTTPS is enabled
- Preserve cache-busting query strings (`?v=2`) on CSS/JS

**Verify deployment:**
- `https://www.nirmal.cc/apocalypse-shorts.html` — loads without login
- `https://www.nirmal.cc/apocalypse-shorts-privacy.html` — loads without login
- Both pages show the purple/pink/teal gradient theme matching nirmal.cc design system

---

### 4. Wait for Google Systems to Update (24–48 hours)

After deploying and updating Google Cloud Console:
1. Wait 24–48 hours for Google to crawl the updated pages
2. Check Search Console for indexing status
3. Re-submit for verification in Google Cloud Console OAuth consent screen

---

### 5. Submit for Verification

In Google Cloud Console OAuth consent screen:
1. Click **"Submit for Verification"**
2. Select the required scopes (YouTube upload, userinfo.email, userinfo.profile)
3. Provide justification:
   > "Apocalypse Survival Shorts is a personal automation pipeline that generates and publishes daily educational YouTube Shorts about post-apocalyptic survival scenarios. The application runs on the creator's local hardware, uses a local LLM and Replicate API for video generation, and uploads via YouTube Data API v3. It serves a single user (the creator), has no public users, collects no viewer data, and generates strictly educational survival content from 10 predefined themes. Homepage and privacy policy are publicly accessible at the provided URLs without authentication."
4. Submit

---

## Enhanced Content Summary

### apocalypse-shorts.html (Homepage) — Key Additions:
- **"No Login Required" badge** in hero section
- **Explicit "What this application does" list** (5 bullet points)
- **Explicit "What this application does NOT do" list** (5 bullet points including NCII statement)
- **Clear statement** that app serves single creator, no public users, no viewer data collection

### apocalypse-shorts-privacy.html (Privacy Policy v1.1) — Key Additions:
- **Prominent "Public Access — No Login Required" notice** at top
- **AI Content Safety Compliance box** in Section 1 (addresses NCII concern)
- **Section 13: Deployment & Verification Guide** with step-by-step instructions
- **Updated Compliance Attestation** with 11 specific checklist items matching Google's requirements
- **Version bumped to 1.1** with updated date

---

## Checklist Before Resubmission

- [ ] Domain `www.nirmal.cc` verified in Google Search Console
- [ ] Both pages deployed and accessible via HTTPS at:
  - `https://www.nirmal.cc/apocalypse-shorts.html`
  - `https://www.nirmal.cc/apocalypse-shorts-privacy.html`
- [ ] Google Cloud Console OAuth consent screen updated:
  - [ ] App Name = "Apocalypse Survival Shorts"
  - [ ] User Type = "External"
  - [ ] Test user `nirmalhimansha@gmail.com` added
  - [ ] Authorized domains includes `nirmal.cc`
  - [ ] Homepage URL = `https://www.nirmal.cc/apocalypse-shorts.html`
  - [ ] Privacy Policy URL = `https://www.nirmal.cc/apocalypse-shorts-privacy.html`
- [ ] Waited 24–48 hours after deployment
- [ ] Submitted for verification with proper justification

---

## Contact for Issues

If verification fails again:
- Check Google Cloud Console for specific error details
- Ensure no `robots.txt` or meta tags block Googlebot
- Verify Search Console shows pages as "Indexed"
- Contact: `nirmalhimansha@gmail.com`