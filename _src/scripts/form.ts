function Form(form: HTMLFormElement) {
  const domain: HTMLInputElement | null = form.querySelector('[name="domain"]');
  const query: HTMLTextAreaElement | null = form.querySelector('[name="query"]');

  function runValidateInput(
    module: typeof import('./validateInput'),
    event: SubmitEvent
  ) {
    const validateInput = module.default;

    if (!domain || !query) return;

    validateInput(domain, query).init();
  }

  function handleFormSubmit(event: SubmitEvent) {
    event.preventDefault();

    import('./validateInput').then(module => runValidateInput(module, event));
  }

  function init() {
    form.addEventListener('submit', handleFormSubmit);
  }

  return {
    init
  }
}

export default Form;
