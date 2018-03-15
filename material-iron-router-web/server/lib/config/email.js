/*
Accounts.emailTemplates.siteName = "MySite";

Accounts.emailTemplates.from = "MySite <support@mysite.com>";

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Message for " + user.profile.displayName;
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
    var signature = "MySite Bot";
    //var president = President.findOne();
    //if (president)
    //    president = Meteor.users.findOne(president.presidentId);
    //    signature = president.profile.displayName + ", the MySite President.";

    return "Dear " + user.profile.displayName + ",\n\n" +
        "Click the following link to set your new password:\n" +
        url + "\n\n" +
        "Please never forget it again!!!\n\n\n" +
        "Cheers,\n" +
        signature;
};
*/
Accounts.emailTemplates.siteName = 'AwesomeSite';
Accounts.emailTemplates.from = 'AwesomeSite Admin <accounts@example.com>';

Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Welcome to Awesome Town, ${user.profile.name}`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return 'You have been selected to participate in building a better future!'
    + ' To activate your account, simply click the link below:\n\n'
    + url;
};

Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'AwesomeSite Password Reset <no-reply@example.com>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your account now!";
   },
   text(user, url) {
      return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
   }
};
