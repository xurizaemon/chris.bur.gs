const fs = require("fs");
const parse = require('csv-parse/sync').parse;
// const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget('./tailwind.config.js')
  eleventyConfig.addWatchTarget('./src/styles/main.css')
  eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: "src/styles/main.css",
    dest: ".",
    keepFolderStructure: false,
    minify: true
  });

  eleventyConfig.addShortcode("gist", function(url) {
    return `<script src="${url}.js"></script>`;
  });

  // Copy `src/media/` to `public/media`
  eleventyConfig.addPassthroughCopy("src/media");

  // eleventyConfig.addPlugin(bundlerPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addDataExtension("csv", (contents) => {
    const records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
    });
    console.log(`Loaded CSV with ${records.length} records.`);
    return records;
  });

  eleventyConfig.setServerOptions({
    port: 80,
    showAllHosts: true
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      layouts: "_layouts"
    }
  }
};
