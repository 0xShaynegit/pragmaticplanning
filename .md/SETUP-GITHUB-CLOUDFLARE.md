# GitHub & Cloudflare Setup Guide

**Project:** Pragmaticplanning Co
**URL:** pragmaticplanning.co.nz
**For:** [Client Name]
**Created:** 2026-05-29

---

## Overview

This guide walks you through setting up your website for the first time using:

- **GitHub** – Version control and code storage in the cloud
- **Cloudflare Pages** – Automatic deployment and hosting
- **Codex** – Local code editor with Git integration
- **Claude** – AI assistant for editing and code review (optional)

The process has some tricky steps, so this guide covers them in detail with screenshots and explanations.

---

## Part 1: GitHub Setup

### Step 1.1 – Create a GitHub Account

1. Go to [https://github.com](https://github.com)
2. Click **Sign up**
3. Enter your email address
4. Create a strong password
5. Choose a username (you'll need this later)
6. Complete the verification
7. Verify your email address (GitHub sends a confirmation link)

**Note:** Your username becomes part of your repository URLs, e.g., `github.com/yourusername/Pragmaticplanning Co`

### Step 1.2 – Create a New Repository

1. After signing in, click the **+** icon in the top-right corner
2. Select **New repository**
3. Fill in the details:

   **Repository name:** `pragmaticplanning-co` (e.g., `example-com` or `mysite`)

   **Description:** `Pragmaticplanning Co Website` (optional but helpful)

   **Public/Private:** Choose **Public** if you want others to see the code, or **Private** for security

   **Initialize this repository with:**
   - ☐ Do NOT check "Add a README file" (you already have one)
   - ☐ Do NOT check "Add .gitignore" (you already have one)
   - ☐ Do NOT check "Choose a license"

4. Click **Create repository**

**GitHub now shows you setup instructions.** You'll follow these next.

### Step 1.3 – Create a Personal Access Token (for Codex)

Codex needs a token to push code to GitHub. Here's how to create one:

1. In GitHub, click your **profile picture** (top-right)
2. Select **Settings**
3. Scroll to the left menu and click **Developer settings**
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**

**Configure the token:**

- **Note:** `Codex access for Pragmaticplanning Co` (descriptive name)
- **Expiration:** 90 days (or custom – see note below)
- **Scopes to select:**
  - ☑ `repo` (Full control of private repositories)
  - ☑ `workflow` (Update GitHub Action workflows)
  - ☑ `write:packages` (Upload packages)

6. Click **Generate token**

**IMPORTANT:** GitHub shows your token once. Copy it immediately and **save it in a safe place** (password manager, not in your code).

**Token format:** `ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` (40+ characters)

**Note on expiration:** 90 days is secure. After 90 days, GitHub will ask you to regenerate it. You'll just repeat this step.

---

## Part 2: Local Setup (Codex)

### Step 2.1 – Install Codex (VS Code)

If you don't have Codex (VS Code) installed:

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Download for your operating system (Windows, Mac, Linux)
3. Run the installer and follow the prompts
4. Launch Codex

### Step 2.2 – Install Git

Codex uses Git for version control. You need Git installed locally:

**Windows:**
1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download the installer
3. Run it and accept all defaults
4. Restart your computer

**Mac:**
1. Git comes with Xcode. Open Terminal and type: `git --version`
2. If not installed, download from [https://git-scm.com/download/mac](https://git-scm.com/download/mac)

**Linux:**
```bash
sudo apt-get install git
```

### Step 2.3 – Configure Git Locally

Open a terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
git config --global user.name "[Client Name]"
git config --global user.email "[client@email.com]"
```

Replace with your actual name and email. This tells Git who you are for every commit.

**Verify it worked:**
```bash
git config --global user.name
git config --global user.email
```

### Step 2.4 – Clone the Repository Locally

Now you'll download the GitHub repository to your computer.

**Option A: Using Codex (Easier)**

1. In Codex, press **Ctrl+Shift+P** (or **Cmd+Shift+P** on Mac)
2. Type: `Git: Clone`
3. Select **Git: Clone**
4. Paste your repository URL:
   ```
   https://github.com/[YOUR_USERNAME]/pragmaticplanning-co.git
   ```
5. Choose a folder to clone into (e.g., `C:\Sites\pragmaticplanning-co`)
6. Codex asks: "Would you like to open the cloned repository?" → Click **Open**

**Option B: Using Command Line**

Open Terminal/Command Prompt and run:

```bash
cd C:\Sites
git clone https://github.com/[YOUR_USERNAME]/pragmaticplanning-co.git
cd pragmaticplanning-co
```

Now your website files are on your computer in a Git repository.

### Step 2.5 – Configure Git Credentials in Codex

Codex needs to know your GitHub credentials to push code.

1. In Codex, open the **Source Control** panel (left sidebar, branching icon)
2. You should see your files listed
3. When you first try to **Commit** or **Push**, Codex will ask for credentials
4. Select **Authorize with token**
5. Paste your Personal Access Token (from Step 1.3)
6. Codex stores it securely and uses it for all future pushes

**If you don't see a prompt:**
1. Codex → **Settings** (gear icon, bottom-left)
2. Search: `git.terminalAuthentication`
3. Uncheck it (so Codex uses the browser for authentication)

---

## Part 3: Initial Deployment (First Push)

### Step 3.1 – Prepare Files Locally

Before pushing to GitHub, your local folder should contain all website files:

```
pragmaticplanning-co/
  index.html
  /pages
  /images
  /css
  /js
  /fonts
  /assets
  /sitemap.xml
  /robots.txt
  /wrangler.jsonc
  /.gitignore
  /.md/                    (local only, not committed)
    HANDOVER.md
    TECHNICAL-SPEC.md
```

**Important:** The `.md/` folder should already be in `.gitignore`, so it won't be committed. This is correct – those are local reference docs.

### Step 3.2 – Make Your First Commit

1. In Codex, open the **Source Control** panel (left sidebar)
2. You'll see all files listed as "Untracked"
3. Click the **+** icon next to each file to **stage** them, or click the **+** next to "Changes" to stage everything
4. In the **Message** field at the top, type: `Initial commit: website files`
5. Press **Ctrl+Enter** (or click the checkmark) to commit

**What this does:** Saves a snapshot of your files locally with a message describing what changed.

### Step 3.3 – Push to GitHub

1. Still in Source Control panel
2. Click the **...** menu and select **Push**, or use **Ctrl+Shift+P** → **Git: Push**
3. Codex uploads your files to GitHub

**Check it worked:**
1. Go to your GitHub repository: `https://github.com/[YOUR_USERNAME]/pragmaticplanning-co`
2. You should see all your files listed
3. Below, you'll see your commit message: "Initial commit: website files"

---

## Part 4: Cloudflare Pages Setup

### Step 4.1 – Create a Cloudflare Account

1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Sign up**
3. Enter email and password
4. Verify your email
5. Complete the signup

### Step 4.2 – Add Your Domain to Cloudflare (Optional but Recommended)

If you already own your domain (e.g., `pragmaticplanning.co.nz`):

1. In Cloudflare Dashboard, click **Add a domain**
2. Enter your domain name: `pragmaticplanning.co.nz`
3. Cloudflare shows DNS nameservers
4. Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
5. Update your nameservers to Cloudflare's nameservers (Cloudflare provides instructions)
6. Wait 24–48 hours for DNS to propagate

**If you don't have a domain yet:**
- Skip this for now
- You can point a domain to Cloudflare Pages later

### Step 4.3 – Create a Cloudflare Pages Project

1. In Cloudflare Dashboard, click **Pages** (left sidebar)
2. Click **Create a project**
3. Select **Connect to Git**
4. Choose **GitHub** (Cloudflare asks for permission)
5. **Authorize Cloudflare** to access your GitHub account (one-time)
6. Select your repository: `pragmaticplanning-co`
7. Click **Begin setup**

### Step 4.4 – Configure Build Settings

Cloudflare asks about your build process:

**Build command:** (leave blank or empty)

**Build output directory:** `/` (just the root, since your site is already static HTML)

**Environment variables:** (none needed for static HTML)

Click **Save and Deploy**

Cloudflare now:
1. Clones your GitHub repository
2. Detects it's a static site
3. Deploys to Cloudflare Pages
4. Gives you a temporary URL: `pragmaticplanning-co.pages.dev`

**Check it worked:**
1. Click the **Deployments** tab
2. You should see your first deployment marked "Success" (might take 1–2 minutes)
3. Click the deployment to see the live URL

### Step 4.5 – Connect Your Domain (If You Have One)

If you added your domain to Cloudflare (Step 4.2):

1. In Cloudflare Pages, click your project
2. Go to **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain: `pragmaticplanning.co.nz`
5. Cloudflare confirms DNS is pointing correctly
6. Click **Activate domain**

Your site is now live at `https://pragmaticplanning.co.nz`

**If DNS is not pointing to Cloudflare yet:**
- You'll see an error
- Update your domain registrar's nameservers (see Step 4.2)
- Wait 24–48 hours
- Try again

---

## Part 5: Ongoing Workflow (Edit → Commit → Deploy)

### The Daily Workflow

Now that everything is set up, this is how you update your website:

1. **Edit files** in Codex (HTML, CSS, images, text)
2. **Save** the file (Ctrl+S)
3. **Commit** in Source Control with a message (e.g., "Update homepage copy")
4. **Push** to GitHub
5. **Cloudflare automatically deploys** within 1–2 minutes
6. Your changes appear live on `https://pragmaticplanning.co.nz`

### Step-by-Step Example: Update a Service Description

1. Open Codex and navigate to `pages/services.html`
2. Find the service you want to update (use Ctrl+F to search)
3. Edit the text between the HTML tags
4. Save the file (Ctrl+S)
5. In Source Control (left sidebar), you'll see the file marked as changed
6. Click the **+** to stage it
7. Enter a commit message: `Update services description`
8. Click the checkmark to commit
9. Click **...** → **Push** to send to GitHub
10. Wait 1–2 minutes for Cloudflare to redeploy
11. Visit `https://pragmaticplanning.co.nz` to see the change live

---

## Part 6: Using Claude for Editing & Review (Optional)

Claude can help you edit content and review code before committing. Here are common workflows:

### 6.1 – Ask Claude to Edit Page Content

**You:** "Claude, please improve the homepage headline and opening paragraph. Make it more compelling for Pragmaticplanning Co services."

**Claude:**
1. Opens `index.html` in your project
2. Suggests improved text
3. Shows you the changes
4. You approve or request revisions

**Then you:**
1. Copy the improved text into Codex
2. Save the file
3. Commit and push (as normal workflow above)

### 6.2 – Ask Claude to Review Before Committing

**Before pushing, you can ask:**

"Claude, I've updated the contact form. Can you review the HTML and CSS for accessibility and best practices?"

**Claude:**
1. Reviews your changes
2. Suggests improvements (alt text, ARIA labels, form validation, etc.)
3. You make any suggested changes
4. Then you commit and push

### 6.3 – Ask Claude to Write New Sections

**You:** "Claude, write a new testimonials section for the homepage with 3 example testimonials."

**Claude:**
1. Writes the HTML section with proper structure
2. You copy it into Codex
3. You adjust names/details for your actual testimonials
4. You commit and push

### 6.4 – Ask Claude for Help Fixing Issues

**After noticing something broken:**

"Claude, the mobile menu isn't working on the homepage. Can you help me debug?"

**Claude:**
1. Helps identify the problem in your HTML/CSS/JS
2. Suggests fixes
3. You make the changes
4. You test locally and commit

---

## Part 7: Common Gotchas & Troubleshooting

### Issue: "Authentication failed" when pushing

**Cause:** Codex doesn't have your GitHub token.

**Fix:**
1. Codex → **Settings** (gear, bottom-left)
2. Search: `git.terminalAuthentication`
3. Uncheck it
4. Try pushing again
5. Codex will ask for your token (paste it from Step 1.3)

### Issue: "Changes not showing on the live site"

**Checklist:**
1. Did you **save** the file locally? (Ctrl+S)
2. Did you **commit** in Source Control?
3. Did you **push** to GitHub? (check for checkmark)
4. Did Cloudflare **deploy**? (check Deployments tab in Cloudflare Dashboard)
5. Hard refresh your browser: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)

If all steps are done and still not showing:
- Wait another 2 minutes (Cloudflare can be slow)
- Check Cloudflare Dashboard → Pages → Deployments to see if it's still building
- Check the deployment log for errors

### Issue: "Repository not found" when cloning

**Cause:** You copied the wrong URL or your GitHub account doesn't have access.

**Fix:**
1. Go to your GitHub repository
2. Click **Code** (green button)
3. Copy the HTTPS URL (not SSH)
4. Paste it exactly into Codex

### Issue: Files showing as "modified" in Git but you didn't change them

**Cause:** Often line-ending differences (Windows vs Mac/Linux).

**Fix:**
1. In Codex, bottom-right, you'll see **CRLF** or **LF**
2. Click it and select **LF** (Unix line endings)
3. Save the file
4. In Source Control, right-click the file → **Discard Changes**
5. The file should no longer show as modified

### Issue: ".md/ folder keeps showing in Git commits"

**Cause:** `.gitignore` isn't working.

**Fix:**
1. Open `.gitignore` in Codex
2. Add a line: `.md/`
3. Save the file
4. In Source Control, right-click the `.md/` files → **Discard Changes**
5. Commit the `.gitignore` change
6. Push to GitHub

### Issue: Accidentally committed a large file (image, video)

**Cause:** You added a file to `/images` that shouldn't be in Git.

**Fix (quick):**
1. Delete the file from your local folder
2. In Source Control, stage the deletion
3. Commit with message: `Remove large file [filename]`
4. Push to GitHub

**For more advanced cleanup,** ask a developer – Git history tracking is involved.

### Issue: Merge conflict (multiple people editing same file)

**Cause:** You and someone else edited the same file → Git can't auto-merge.

**This is rare for single-maintainer sites, but if it happens:**
1. Codex will show **CONFLICT** in Source Control
2. Open the file
3. Look for conflict markers: `<<<<<<<`, `=======`, `>>>>>>>`
4. Choose which version to keep (Codex offers buttons to resolve)
5. Save the file
6. Stage and commit as normal

**Easier approach:** Reach out to the developer who made the other change – coordinate edits.

---

## Part 8: SSL/HTTPS & Security

### Automatic HTTPS

Cloudflare Pages **automatically provides HTTPS** for your site. Your URL is:
- `https://pragmaticplanning.co.nz` (secure, green padlock in browser)

**Not HTTP** (http://pragmaticplanning.co.nz) – Cloudflare redirects to HTTPS automatically.

### DNS & Security Best Practices

1. **Never commit sensitive data** to GitHub (API keys, passwords, etc.)
   - Use `.gitignore` to exclude sensitive files
   - If you accidentally committed a secret, regenerate it immediately

2. **Keep your GitHub token secure**
   - Don't share it with anyone
   - If you think it's compromised, delete it and create a new one

3. **Use strong passwords**
   - GitHub password: 12+ characters, mix of upper/lower/numbers/symbols
   - Cloudflare password: same

4. **Enable two-factor authentication (2FA)**
   - GitHub: Settings → Security → Two-factor authentication
   - Cloudflare: Account → Security → Two-Factor Authentication
   - Makes your accounts much harder to hack

---

## Part 9: Deployment Checklist (Before Going Live)

Before your first push to production, verify:

- [ ] All files are in the correct folders (pages/, images/, css/, etc.)
- [ ] `.gitignore` exists and contains `.md/`, `node_modules/`, `.env` (if any)
- [ ] No sensitive data in the code (API keys, passwords, etc.)
- [ ] `sitemap.xml` exists and lists all public pages
- [ ] `robots.txt` exists and is correct
- [ ] All internal links are working (test in browser: open `index.html`)
- [ ] Images load properly (test at file:// path or local server)
- [ ] Responsive design works on mobile (test at 375px width)
- [ ] No console errors in browser dev tools (F12)
- [ ] Lighthouse score is 90+ (all metrics)
- [ ] GitHub repository is created and cloned
- [ ] Cloudflare Pages is connected to GitHub
- [ ] Custom domain is set up (if you have one)
- [ ] SSL/HTTPS is working (green padlock)

**Once all these pass, you're ready for production.**

---

## Part 10: Advanced Topics

### Using Git Branches (Optional)

For larger changes, you can create a "branch" to work safely:

```bash
git checkout -b feature/new-section
```

Make changes, commit, and push. When ready, create a **Pull Request** on GitHub to merge back to `main`.

**For single maintainers**, this is optional – you can work directly on `main`.

### Reverting to a Previous Version

If you made a mistake and want to undo:

1. Codex Source Control → Click the commit you want to revert to
2. Right-click → **Revert Commit**
3. A new commit is created that undoes the changes
4. Push to GitHub
5. Cloudflare redeploys with the older version

---

## Part 11: Support & Next Steps

### If Something Goes Wrong

1. **Check the troubleshooting section** (Part 7 above)
2. **Check Cloudflare Deployments tab** for error logs
3. **Check Git status** in Codex for conflicting files
4. **Ask Claude:** Describe what's happening, and Claude can guide you through fixes
5. **Contact your developer** for complex Git or deployment issues

### Ongoing Maintenance

- **Weekly:** Check site appearance (does it look right?)
- **Monthly:** Review deployment logs in Cloudflare
- **Quarterly:** Test all forms, links, and interactive elements
- **Yearly:** Review this setup guide to ensure everything still applies

### Claude Integration Going Forward

You now have Claude available for:
- Content editing and improvement
- Code review before committing
- Debugging issues
- Adding new sections or features
- SEO optimization suggestions
- Performance recommendations

Just ask Claude: "Can you review my changes before I commit?" or "Help me write a new page section."

---

## Summary

You've now set up:

1. ✅ **GitHub** – Cloud backup and version history
2. ✅ **Cloudflare Pages** – Automatic deployment and hosting
3. ✅ **Codex** – Local editor with Git integration
4. ✅ **Claude** – AI assistant for content and code
5. ✅ **SSL/HTTPS** – Secure, encrypted connections
6. ✅ **Workflow** – Edit → Commit → Push → Auto-deploy

**Your website is now live and ready for ongoing updates.**

Changes take effect within 1–2 minutes of pushing to GitHub.

---

**Document Version:** 1.0
**Last Updated:** 2026-05-29
**Created for:** [Client Name] ([client@email.com])
