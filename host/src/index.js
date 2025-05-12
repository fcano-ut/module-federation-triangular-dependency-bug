import { init, loadRemote } from '@module-federation/enhanced/runtime';


init({
  name: 'host',
  remotes: [
    {
      name: 'mfe_1',
      entry: 'http://localhost:1001/mf-manifest.json',
    },
    {
      name: 'mfe_2',
      entry: 'http://localhost:1002/mf-manifest.json',
    },
  ],
});

const div = document.createElement('div');

div.innerHTML = `
  Microfrontend 1:
  <div id="microfrontend-1"></div>
  Microfrontend 2:
  <div id="microfrontend-2"></div>
`
document.body.appendChild(div);

loadRemote('mfe_1').then(({default: loadFn}) => {
  loadFn(document.getElementById('microfrontend-1'))
});

loadRemote('mfe_2').then(({default: loadFn}) => {
  loadFn(document.getElementById('microfrontend-2'))
});
