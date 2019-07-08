module.exports = function override(webpackConfig, env) 
{
    webpackConfig.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"
    });
  
    return webpackConfig;
}