import "tsx/esm";
import path from "node:path";

export default function (eleventyConfig: any) {
  // TypeScript template support
  eleventyConfig.addExtension(["11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });

  // Template formats to process
  eleventyConfig.setTemplateFormats([
    "html",
    "njk", 
    "md",
    "11ty.js",
    "11ty.ts",
    "11ty.tsx"
  ]);

  // Passthrough file copy
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  
  // Watch targets for development
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
      layouts: "_includes/layouts"
    },
    templateFormats: ["html", "njk", "md", "11ty.js", "11ty.ts"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}