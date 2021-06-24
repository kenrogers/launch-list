# Launch List

Simple display of upcoming SpaceX launches.

Live demo: https://jovial-franklin-d3d730.netlify.app/

Run with
`npm run dev`

## Questions

### How would you go about making the individual results closer to full-width on a mobile browser?

Add some responsive utility classes using Tailwind that change the width of the results based on the viewport width.

In addition to the width of the items, I added a responsive utility modifier to the padding on the `main` tag so there is less padding on small screens.

### How would you go about grouping the rocket results by timezone?

`//TODO`

### How would you display an image for each rocket? A Wikipedia link?

Add the first item from the Flickr array for the rocket as an image at the top of each launch card. For the Wikipedia link, make the rocket name a link to the provided Wikipedia entry.

Originally I was going to make these images/links to the launch, but those don't exist for upcoming launches.
