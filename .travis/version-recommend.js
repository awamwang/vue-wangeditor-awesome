const conventionalRecommendedBump = require(`conventional-recommended-bump`);

conventionalRecommendedBump({
  preset: `angular`,
  tagPrefix: 'v'
}, (error, recommendation) => {
  console.log(recommendation.releaseType); // 'major'
});