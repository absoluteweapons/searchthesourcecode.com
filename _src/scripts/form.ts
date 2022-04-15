function Form(form: HTMLFormElement) {
  const domain: HTMLInputElement | null = form.querySelector('[name="domain"]');
  const query: HTMLTextAreaElement | null = form.querySelector('[name="query"]');

  function runValidateInput(module: typeof import('./validateInput')) {
    const validateInput = module.default;

    if (!domain || !query) return;

    validateInput(domain, query).init();
  }

  function handleFormSubmit(event: SubmitEvent) {
    event.preventDefault();

    import('./validateInput').then(runValidateInput);
  }

  function init() {
    form.addEventListener('submit', handleFormSubmit);
  }

  return {
    init
  }
}

export default Form;
