import { init, loadRemote } from '@module-federation/enhanced/runtime';

export default function load(domElement) {
  const div = document.createElement('marquee');
  div.style.maxWidth = '150px'
  div.style.color = 'blue'
  div.innerText = 'Hello from microfrontend 2'
  domElement.appendChild(div);


  const div2 = document.createElement('div');
  div2.innerHTML = `
    Now Microfrontend 2 will attempt to load micro-frontend 1:
    <div id="microfrontend-1-from-microfrontend-2"></div>
`

  domElement.appendChild(div2);


  init({
    name: 'host',
    remotes: [
      {
        name: 'mfe_1',
        entry: 'http://localhost:1001/mf-manifest.json',
      },
    ],
  });

  loadRemote('mfe_1').then(({default: loadFn}) => {
    loadFn(document.getElementById('microfrontend-1-from-microfrontend-2'))
  });
}
