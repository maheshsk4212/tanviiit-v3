# Tanvi IT Solutions website, v3

The third design of the Tanvi IT Solutions website. It is a separate project from
v1 and v2 on `main`: its own Next.js app, built on the same client content.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things are

- `src/content/site.ts` holds the client's copy and facts. Notes marked
  `NEEDS-CONTENT` or `NEEDS-CONFIRMATION` list what is still owed or unconfirmed.
- `src/content/nav.ts` builds the menus and footer from that content.
- `src/app` has one folder per page.
- `src/components/home/hero-backdrop.tsx` holds the hero photograph options. The
  picker on the homepage is for review only; remove it once a photograph is chosen.

## Not yet done

- The contact form opens the visitor's email program; it does not send from the
  site. A form-sending service is needed for that.
- Privacy and accessibility pages.
- Photographs are licensed Unsplash stand-ins until the client supplies its own.
