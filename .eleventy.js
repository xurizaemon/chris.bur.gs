const fs = require("fs");
const dumpFilter = require("@jamshop/eleventy-filter-dump");
const parse = require('csv-parse/sync').parse;
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const bundlerPlugin = require("@11ty/eleventy-plugin-bundle");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("debugger", (...args) => {
    console.log(...args)
    debugger;
  });

  eleventyConfig.addShortcode("gist", function(url) {
    return `<script src="${url}.js"></script>`;
  });

  eleventyConfig.addPlugin(bundlerPlugin);
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
