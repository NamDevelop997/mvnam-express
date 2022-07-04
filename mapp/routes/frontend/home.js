var express         = require("express");
var router          = express.Router();
const util          = require('util');

const moment        = require('moment');

const ArticlesModel = require(__path_models  + 'articles');
const CategoryModel = require(__path_models  + 'category');
const folderViewFE  = 'frontend/pages/home/index';
const layoutFE      = `frontend/frontend`;


router.get('/', async (req, res) => {
  let listItemsSpecial    = [];
  let listItemsLatestNews = [];
  let listCategory        = [];

  //Get list items special
  await ArticlesModel.listItemsSpecial(null, {task : "list-items-special"}).then((data)=>{
    listItemsSpecial = data;
  });

  //Get list items latest news
  await ArticlesModel.listItemsSpecial(null, {task : "list-items-latest-news"}).then((data)=>{
    listItemsLatestNews = data;
  });

  //Get categories in menu
  await CategoryModel.listItemsCategory(null, {task : "items-category-in-menu"}).then((data)=>{
    listCategory = data;
  });
  
  res.render(folderViewFE, {
      title: "Home",
      layout: layoutFE,
      topPost: true,
      listItemsSpecial,
      listItemsLatestNews,
      listCategory,
      moment
  })
});

module.exports = router;
