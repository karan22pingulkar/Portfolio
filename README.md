# Portfolio

A sci-fi/terminal-themed personal portfolio — pure HTML, CSS, and vanilla JS.
No build step, no dependencies.

## Structure

    index.html      — all sections (hero, pics, about, lab, comms, footer)
    css/style.css   — dark terminal theme
    js/script.js    — carousel, scroll reveal, footer year
    assets/         — put your photos/images here

## Fill in your details

Open index.html and search for TODO — every placeholder you need to
replace is marked (name, tagline, bio, project cards, links, email).

### Adding photos

1. Drop your images into assets/
2. Replace the placeholder boxes. For the hero photo, change this:

       <div class="hero__photo photo-frame">
         <div class="photo-frame__placeholder">[ Your Photo ]</div>
         ...
       </div>

   to this:

       <div class="hero__photo photo-frame">
         <img class="hero__img" src="assets/me.jpg" alt="My Name" />
       </div>

Carousel slides and project thumbnails work the same way — swap the
photo-frame__placeholder div for an img tag.

## Run locally

Just open index.html in a browser, or serve it:

    python -m http.server 8000
    # then visit http://localhost:8000

## Deploy free on GitHub Pages

1. Push this repo to GitHub
2. Repo Settings → Pages → Source: "Deploy from a branch"
3. Pick main / / (root) and save
4. Live at https://<username>.github.io/<repo>/ in about a minute

Every push to main auto-updates the site.
