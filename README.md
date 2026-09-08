# North Las Vegas Teamsters — Local 14 campaign site

Static site, no build step. Three files: `index.html`, `style.css`, `script.js`.

## Deploy to GitHub Pages (with your existing domain)

1. Create a new GitHub repo (e.g. `nlv-teamsters`).
2. Add these three files to the repo root and push:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root)**.
4. Under **Settings → Pages → Custom domain**, enter your domain and save. GitHub will create a `CNAME` file in the repo automatically — leave it there.
5. At your domain registrar, point the domain at GitHub Pages:
   - Apex domain (e.g. `example.com`): four A records to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` subdomain: a CNAME record to `YOUR-USERNAME.github.io`
6. Check "Enforce HTTPS" once the certificate provisions (can take up to ~24 hrs).

## What still needs real content

- **Council photos** — the "Contact Council" section (`#council`) currently shows initials in a navy circle for each of the 5 council members. Replace `.council-photo` in `index.html` with an official headshot image once you have permission to use one, or leave the initials treatment if that's simpler to maintain.
- **Testimonial videos** — three placeholder cards in the "Voices" section (`#voices`). Replace the `alert()` in `script.js` with an actual video embed or lightbox, and swap in member names/roles/quotes in `index.html`.
- **Action links** — the three buttons in `#action` (`Contact council`, `Submit your story`, `Share this site`) currently point to `#`. Wire these to a council contact form/email, a story-submission form, and a share action.
- **Mayor Scott Black paragraph** — corrected to reflect that Scott Black is the sitting Ward 3 councilman running for Mayor (top-two June primary finish, general election Nov 3, 2026), not the current mayor. Double-check the framing reads the way the local wants it before this goes live; it's the most politically sensitive section on the page.
- **Council contact info** — all 5 council cards currently route through the general City Council office line, (702) 633-1012, and link out to each member's official city bio page (no direct individual emails are published). If Local 14 has direct emails or a dedicated contact/petition form for members, wire those in instead — that will convert better than a shared phone line.

## Design notes

- Palette and type are meant to evoke municipal work orders and safety-vest orange rather than a generic tech look — feel free to adjust `--safety`, `--steel`, `--asphalt` in `style.css` if the local's existing brand colors differ.
- The "bad times / good times" toggle near the top is the one big interactive moment on the page, built to literalize the "kids' table" line from your notes. Everything else is intentionally quieter around it.
- Stat counters animate once, when scrolled into view.
