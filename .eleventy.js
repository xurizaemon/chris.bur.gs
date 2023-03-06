const fs = require("fs");
const parse = require('csv-parse/sync').parse;
// const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");
const { DateTime } = require("luxon");
const util = require('util');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter('except_post', obj => {
    return obj.filter(tag => tag !== 'post');
  });
  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  });
  eleventyConfig.addFilter('dump', obj => {
    return util.inspect(obj)
  });
  eleventyConfig.addFilter("postDate", function(dateObj) {
    // return typeof dateObj;
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("justYear", (dateString) => {
    dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy');
  });

  eleventyConfig.addWatchTarget('./tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/styles/main.css');
  eleventyConfig.addWatchTarget('./public/main.css');
  eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: "src/styles/main.css",
    dest: ".",
    keepFolderStructure: false,
    minify: false
  });

  eleventyConfig.addShortcode("gist", function(url) {
    return `<script src="${url}.js"></script>`;
  });

  // Copy `src/media/` to `public/media`
  eleventyConfig.addPassthroughCopy("src/media");

  // eleventyConfig.addPlugin(bundlerPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

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
