### CSS Only loaders

loaders made with pure CSS and zero bulk. Will be converted to a react component once matured

[![star this repo](http://githubbadges.com/star.svg?user=theanam&repo=css-only-loaders&style=default)](https://github.com/theanam/css-only-loaders)
[![fork this repo](http://githubbadges.com/fork.svg?user=theanam&repo=css-only-loaders&style=default)](https://github.com/theanam/css-only-loaders/fork)

![CSS Only Loaders](https://raw.githubusercontent.com/theanam/css-only-loaders/master/homepage-assets/preview.gif)

#### React component

[![NPM](https://nodei.co/npm/cssonly-loaders-react.png)](https://nodei.co/npm/cssonly-loaders-react/)

**Readme still incomplete**

> This is a work in progress. if you have a cool loader idea, please contribute

#### Contribution guide: 

* Please use [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) in the `looaders/vars.css` file. Make sure the custom measurements in your loader is related to the values in the vars file. Use [calc](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) if necessary.

* Please make sure the folder name in the `loaders` folder, the css file name and the class name is the same. This is **Important** for the automatic defination loading to work.

* If you want your loader to be added to the react component as well, add the referenece to the CSS file to the `react/src/index.js` file. As the files are placed two folder above use a format like this: `import "../../loaders/simple-circle/simple-circle.css";`. Should be enough to include it to the react component once a new version is released on npm.


#### Seeking help for: 

* Vue component 
* Angular Component
* New loader Ideas

The Loader icon on the logo is taken from [Icofont](icofont.com)
 