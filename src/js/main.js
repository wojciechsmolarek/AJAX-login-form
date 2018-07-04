//ajax content load
$(document).on('click', '.link', function(e) {
  e.preventDefault();
  let url = this.href;

  $('#content').load(url + ' #container');
});

(function() {
  form.querySelector('#email').value = localStorage.getItem('email');
  form.querySelector('#password').value = localStorage.getItem('password');
})();

//form validator

document.querySelector('#content').onclick = function() {

  function Validator(form) {

    this.form = form;
    this.emailField = form.querySelector('input[type="email"]');
    this.passwordField = form.querySelector('input[type="password"]');
    this.checkboxField = form.querySelector('input[type="checkbox"]');

    this.errorMessage = form.querySelector('span');
    this.errorLabel = form.querySelector('label[for="email"]');
    this.validFields = [];

    this.form.onsubmit = this.validate.bind(this);

  };

  Validator.prototype.validate = function(e) {

    e.preventDefault();

    const emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (this.emailField) {
      if (emailFilter.test(this.emailField.value)) {
        this.emailField.style.boxShadow = '0 0 10px green';
        this.errorMessage.innerHTML = '';
        this.validFields.push("email");
      } else {
        this.validFields.splice("email", 1);
        this.emailField.style.boxShadow = '0 0 10px #d63031';
        this.errorMessage.innerHTML = 'invalid email address';
        this.errorMessage.style.color = '#d63031';
        this.errorLabel.style.color = '#d63031';
        this.errorLabel.style.fontWeight = '700';
      }
    }

    if (this.passwordField) {
      if (this.passwordField.value.length) {
        this.passwordField.style.boxShadow = '0 0 10px green';
        this.validFields.push("password");
      } else {
        this.validFields.splice("password", 1);
        this.passwordField.style.boxShadow = '0 0 10px #d63031';
      }
    }

    if (this.checkboxField) {
      if (this.checkboxField.checked) {
        localStorage.setItem('email', this.emailField.value);
        localStorage.setItem('password', this.passwordField.value);
      }
    }

    if (this.passwordField && this.emailField && this.validFields.length == 2) {
      this.form.submit();
    } else if (!this.passwordField && this.emailField && this.validFields.length == 1) {
      this.form.submit();
    } else {
      return;
    }

  };

  new Validator(document.querySelector('#form'));
}
