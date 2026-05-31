# Website Handover & Maintenance Guide

**Project:** Pragmaticplanning Co Website
**URL:** pragmaticplanning.co.nz
**For:** [Client Name]
**Last Updated:** 2026-05-29

***

## Overview

This guide explains how to update, maintain, and manage your website using:

- A **local project folder** on your computer
- **Codex** (or your code editor) for editing files
- **Git + GitHub** for version control
- **Cloudflare Pages** for automatic deployment

You do not need to log into a hosting panel or upload files manually. Most work happens on your computer in one folder.

***

## 1. How the system is set up

### Main components

1. **Local project folder**
   - Lives on your computer
   - Contains:
     - `index.html`, `/pages`, `/images`, `/css`, `/js`, `/fonts`, `/assets`
     - Configuration files for deployment

2. **Code Editor (Codex)**
   - Your local code editor
   - Used to open and edit the project folder
   - Handles Git commits and pushes to GitHub

3. **GitHub repository**
   - Stores a copy of the project in the cloud
   - Keeps full history of changes
   - Triggers website updates when you push new commits

4. **Cloudflare Pages**
   - Watches the GitHub repo
   - Automatically rebuilds and publishes the website when new commits arrive

5. **Domain (pragmaticplanning.co.nz)**
   - Points to Cloudflare so visitors see the latest version

### Update flow (high level)

1. Edit files **locally** with your code editor
2. Prepare and optimize images
3. Copy processed images into `/images`
4. Commit and push changes from your editor to GitHub
5. Cloudflare automatically deploys the updated site

***

## 2. Project folder structure (local)

On your computer you will see something like:

```text
/pragmaticplanning-co
  index.html
  /pages
  /images
  /css
  /js
  /fonts
  /assets
  .git                (hidden Git folder)
  .gitignore          (Git configuration)
  .md/                (Documentation folder, gitignored)
```

### Files you will edit often

- `index.html` – Home page
- `pages/` – Subpages (about, services, contact, etc.)
- Text and copy updates

### Files you might touch occasionally

- `/images` – Website images (WebP format preferred)
- Contact information
- Social links

### Files to leave to a developer

- `/css/` – Design system and styling
- `/js/` – Scripts and interactivity
- `sitemap.xml` and `robots.txt` – SEO configuration
- Build and deployment configuration

***

## 3. Opening the project in your code editor

1. Open your code editor on your computer.
2. Choose **Open Folder** (or similar) and select your project folder.
3. You should see:
   - `index.html` and all folders (`pages`, `images`, `css`, `js`, etc.) in the sidebar
   - A main editor area for editing files

From now on you will make all content changes inside your editor, then commit and push from there.

***

## 4. Updating text content

### General rule

Only change the text between the tags, not the tags themselves.

Example:

```html
<p>Old text here.</p>
```

Change to:

```html
<p>New text here.</p>
```

Do not remove `<p>` or `</p>`.

### Step-by-step example: update text

1. In your editor, open the file you want to update (e.g., `index.html` or `pages/about.html`).
2. Use the **Find** function to search for the text you want to change.
3. Edit the text directly.
4. Save the file.

You have edited it locally; later you will commit and push (see deployment section).

### Common HTML edits

**Change a heading**

```html
<h2>Old Heading</h2>
```

to

```html
<h2>New Heading</h2>
```

**Change a paragraph**

```html
<p>Old paragraph text.</p>
```

to

```html
<p>New paragraph text.</p>
```

**Change a link or button**

```html
<a href="pages/services.html">Old Button</a>
```

to

```html
<a href="pages/services.html">New Button</a>
```

***

## 5. Image workflow and optimization

Images on the site should ideally be in WebP format for fast loading.

### Step 1 – Prepare new images

1. Export or take your images at good quality.
2. Consider the size:
   - Hero/featured images: ~1200–1600px wide
   - Inline content: ~800–1000px wide
   - Small icons/logos: ~200–400px

### Step 2 – Optimize to WebP

Use any tool to convert images to WebP format:

- Online converters: [Convertio](https://convertio.co) or similar
- Desktop tools: Photoshop, GIMP, XnConvert
- Command line: ImageMagick or cwebp

### Step 3 – Name descriptively

Name files clearly and descriptively:

- ✅ `hero-image.webp` – Hero section image
- ✅ `logo-banner.webp` – Logo/branding banner
- ✅ `team-photo.webp` – Team or profile photo
- ❌ `2a1adc_ae30a94.webp` – Auto-generated filename
- ❌ `Screenshot 2026-03-23.webp` – Generic screenshot name

### Step 4 – Place in `/images`

Copy the processed WebP images into:

```text
/pragmaticplanning-co/images
```

### Step 5 – Use in HTML

From `index.html` (root):

```html
<img src="images/hero-image.webp" alt="Descriptive alt text here">
```

From any file inside `/pages`:

```html
<img src="../images/logo-banner.webp" alt="Logo description">
```

Always:

- Use the WebP filenames (not .jpg or .png)
- Add descriptive `alt` text
- Match your existing filename patterns

***

## 6. Updating sections and content

### Page content

1. Open the HTML file in your editor.
2. Search for the section or text you want to change.
3. Edit the text directly.
4. Save the file.

If content appears on multiple pages, update all occurrences.

### Adding or removing sections

If you want to add a completely new section or page:

- Ask a developer, as this requires HTML structure changes

***

## 7. Updating contact info and links

### Email and phone

1. Use search in your editor to find your current email or phone.
2. Update each occurrence across all pages.
3. Save the files.

### Booking links and social media

Look for lines like:

```html
<a href="https://calendly.com/yourhandle/" target="_blank">Book a Call</a>
```

or

```html
<a href="https://linkedin.com/in/yourname/" target="_blank">LinkedIn</a>
```

To update:

- Replace only the URL inside `href="..."`.
- Leave the rest of the link structure as is.

***

## 8. SEO and meta information

### Page titles and descriptions

At the top of each HTML file, inside `<head>`, you will see:

```html
<title>Page Title – Pragmaticplanning Co</title>
<meta name="description" content="Short description here">
```

You can:

- Adjust titles to accurately describe each page
- Adjust descriptions to be clear and compelling

Keep titles under about 60 characters and descriptions under about 155.

### Alt text for images

Every image should have descriptive alt text:

```html
<img src="..." alt="Clear description of what the image shows">
```

Good alt text:

- Describes what the image shows
- Includes relevant keywords naturally

When you add new images, always add alt text at the same time.

***

## 9. Deployment – making changes live

Once you have finished local changes and checked that pages look correct:

### Step 1 – Check locally

1. In your editor, open `index.html` directly in a browser to confirm:
   - Text is correct
   - New images appear
   - Links work
   - Layout looks good on mobile and desktop

### Step 2 – Commit in your editor

Inside your editor:

1. Open the **Source Control / Git** view.
2. Review the list of changed files.
3. Enter a clear commit message, for example:
   - `Update service descriptions`
   - `Add new testimonial`
   - `Update contact information`
   - `Refresh homepage copy`
4. Click **Commit**.

### Step 3 – Push to GitHub

Still in your editor:

1. Use the **Push** command to send your commit to GitHub.
2. Wait until it completes with no errors.

### Step 4 – Cloudflare deployment

After the push:

1. Cloudflare detects the new commit and starts a new build.
2. Within 1–2 minutes the change is visible on `https://pragmaticplanning.co.nz`.
3. Hard refresh your browser if you do not see it immediately (Ctrl+Shift+R or Cmd+Shift+R).

If something looks wrong, you can either:

- Fix locally and push another commit
- Or ask a developer to revert to a previous commit if needed

***

## 10. Troubleshooting common issues

### Changes not showing on the live site

- Hard refresh the browser (Ctrl+Shift+R / Cmd+Shift+R).
- Wait another minute.
- Confirm that:
  - You saved the file locally
  - You committed
  - You pushed to GitHub

### Image not appearing

Check:

- File is in `/images` folder
- Filename in HTML matches exactly (case-sensitive)
- File format is WebP (or supported format)
- Path is correct:
  - `images/...` from `index.html`
  - `../images/...` from `/pages`

### Layout looks broken or text is missing

- You might have accidentally removed a closing tag (`</div>`, `</section>`, `</p>`, etc.).
- Use your editor's Find & Replace to check for matching opening/closing tags.
- If unsure, revert to the previous working commit or ask a developer.

### Links not working

- Check that the path is correct.
- Ensure the target file exists.
- Confirm there are no typos in filenames or URLs.

***

## 11. Maintenance checklist

### Weekly

- Verify contact information is accurate.
- Ensure all booking/contact links work.

### Monthly

- Review and update key sections if needed.
- Check site appearance on mobile and desktop.
- Click through navigation and links to ensure none are broken.

### Quarterly

- Review all copy for accuracy and relevance.
- Check for any broken images or missing alt text.
- Verify all external links still work.

### Yearly

- Larger content refresh: value propositions, offerings, experience.
- Update images if needed to keep the site feeling current.
- Review SEO titles and descriptions for all pages.

***

## 12. When to ask for developer help

Ask for help when you want to:

- Add a completely new page or change the main navigation
- Adjust the design system (colours, fonts, layout, animations)
- Integrate new forms, booking systems, or payment tools
- Debug persistent errors in deployment
- Troubleshoot issues you cannot resolve locally
- Add new page sections with custom layouts

You can usually handle:

- Text and copy edits
- Section descriptions
- Testimonials and quotes
- Contact information and social link updates
- Adding new images (once they are in WebP format)
- SEO titles and descriptions
- Updating existing sections with new content

***

## 13. Quick reference

### File paths

- From `index.html` to a page in `/pages`: `href="pages/filename.html"`
- From `/pages` back to home: `href="../index.html"`
- From `/pages` to another page in `/pages`: `href="filename.html"`
- Images:
  - From `index.html`: `src="images/filename.webp"`
  - From `/pages`: `src="../images/filename.webp"`

### Essential HTML tags

- `<h1>`, `<h2>`, `<h3>` – Headings
- `<p>` – Paragraph
- `<a href="...">` – Link
- `<img src="..." alt="...">` – Image
- `<section>`, `<div>` – Layout containers
- `<footer>` – Footer
- `<ul>`, `<li>` – Lists

### Git basics in your editor

- **Commit**: Save your changes locally with a message
- **Push**: Send commits to GitHub
- **Pull**: Get latest changes from GitHub
- **Status**: See which files have changed

***

## 14. Getting help

If you encounter issues or want to make changes beyond this guide:

- **For technical questions**: Contact the developer who set up your site
- **For design changes**: Ask a designer or developer
- **For urgent issues**: Check the troubleshooting section first, then reach out

Remember: It is always better to ask than to accidentally break something. The Git history keeps a backup of all previous versions, so minor mistakes can be fixed.

***

**Happy maintaining your website!**
