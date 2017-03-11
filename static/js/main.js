const fs = require('fs');
const config = fs.readFileSync(__dirname + '/stats.json').toString();

const data = JSON.parse(config);

const body = document.getElementsByTagName('body')[0];

const tiles = document.getElementById('tiles');

const tilesViews = data.tiles.map(tile => {
  const view = document.createElement('webview');

 Object.keys(tile).forEach(k => {
   console.log(`${k} => ${tile[k]}`);
   view.setAttribute(k, tile[k]);
 });

  view.setAttribute("autosize", "on");
  view.setAttribute("useragent", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36");
  view.addEventListener('did-start-loading', (id => () => console.log(`${id} :: Loading`))(tile.id) );
  view.addEventListener('did-stop-loading', (id => () => console.log(`${id} :: Loaded`))(tile.id) );

  return view;
});

tilesViews.forEach(tv => tiles.appendChild(tv));


const t = id => tilesViews.filter( tv => tv.getAttribute('id') === id)[0];
const rl = id => t(id).reload();
