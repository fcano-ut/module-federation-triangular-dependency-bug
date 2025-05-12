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

loadRemote('mfe_1').then((loadFn) => {
  console.log(loadFn)
  // document.documentElement

});

