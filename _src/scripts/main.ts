const html = document.querySelector('html');

if (html) html.className = 'js';

function initModule(module: any, element: any = null) {
  module.default(element).init();
}

function observe(callback: Function, elements: NodeList) {
  const config = {
    rootMargin: '200px 0px',
    threshold: 0.01
  };

  if (elements.length > 0) {
    const collection: Array<any> = Array.from(elements);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Are we in viewport?
        if (entry.intersectionRatio > 0) {
          // Stop watching and load the script
          observer.unobserve(entry.target);
          callback(entry.target);
        }
      });
    }, config);

    collection.forEach(element => observer.observe(element));
  }
}

observe((element: HTMLFormElement) => {
  import(/* webpackChunkName: "form" */ 'Src/scripts/form')
    .then(module => initModule(module, element))
    .catch(err => console.error(`Error in: Form - ${err}`));
}, document.querySelectorAll('[data-component="form"]'));

export { };
