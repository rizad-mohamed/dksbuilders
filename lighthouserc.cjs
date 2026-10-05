module.exports={
 ci:{
   collect:{
     startServerCommand:"npm run start",
     startServerReadyPattern:"Ready",
     url:["http://localhost:3000/","http://localhost:3000/projects","http://localhost:3000/careers"],
     numberOfRuns:3,
     settings:{chromeFlags:"--no-sandbox --headless --disable-dev-shm-usage"}
   },
   assert:{assertions:{
     "categories:performance":["warn",{minScore:.9}],
     "categories:accessibility":["error",{minScore:.95}],
     "categories:best-practices":["error",{minScore:.95}],
     "categories:seo":["error",{minScore:.95}],
     "cumulative-layout-shift":["error",{maxNumericValue:.1}]
   }},
   upload:{target:"filesystem",outputDir:".lighthouseci/reports"}
 }
};