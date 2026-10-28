# The Flocking Reeds Farm

Family homestead website for **The Flocking Reeds Farm** in Grafton, NH (441 Millbrook Rd).

Built with React 19, TypeScript, Vite, and Tailwind CSS.

## What's Included

- **Roadside Farm Stand (24/7)**:
  - 🥚 **Farm Fresh Chicken Eggs**: $5.00/dozen • $3.00/half-dozen (60+ pasture-raised chickens & 40+ active layers—always stocked!)
  - 🪺 **Farm Fresh Quail Eggs**: $3.00/dozen (nutrient-packed, rich creamy yolks)
  - 🎨 **Homestead Crafts & Knick-Knacks**: Individually priced hand-painted cartons & farm keepsakes
  - 🥖 **Surprise Fresh Baked Goods**: Small batches of homemade loaves & treats when you catch us on baking days (never kept past 3 days!)
  - Honor box instructions: Cash, Venmo (`@sammiesnest`), Cash App (`$SammiesSimpleLiving`), phone `(603) 729-3568`, and Google Reviews.
- **Meet the Flock (About Us)**:
  - Sammie & Nicky's journey (married 14 years, together 15 years), overcoming health challenges, 1970s homestead history, division of labor, and the animals (chickens, geese, Trix the coop rabbit).
- **The Roost (Updates)**:
  - Month-by-month timeline and story dispatches with reader cluck reactions and newsletter signups.
- **Visit Stand & Support**:
  - Clear directions to 441 Millbrook Rd, how the honor stand works, YouTube channel support (`@sammiessimpleliving`), and direct tips.

## Hosting & Deployment (100% Free on Cloudflare Pages)

Because this site now builds to static files (`HTML`, `JS`, `CSS`, and images in `dist/`), **you no longer need a server or PocketBase droplet**:

1. **Delete / Turn off the DigitalOcean Droplet**: You no longer need the PocketBase server, saving on monthly hosting costs.
2. **Deploy to Cloudflare Pages**:
   - In Cloudflare, go to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git** (`Mr-Nickey/FarmSite`).
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
3. **Custom Domain**: Connect `flockingreeds.farm` with free automatic SSL.
