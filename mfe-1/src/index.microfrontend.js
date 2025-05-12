export default function load(domElement) {
  const div = document.createElement('marquee');
  div.style.maxWidth = '150px'
  div.style.color = 'red';
  div.innerText = 'Hello from microfrontend 1'
  domElement.appendChild(div)
}
