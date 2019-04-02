import { computed, observer } from '@ember/object';
import Controller from '@ember/controller';
import { match, not } from '@ember/object/computed';

export default Controller.extend({


  isValid: match('emailAddress', /^.+@.+\..+$/),
  isDisabled: not('isValid'),

  emailAddress: '',

  actualEmailAddress: computed('emailAddress', function() { 
    console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
  }),

  emailAddressChanged: observer('emailAddress', function() { 
    console.log('observer is called', this.get('emailAddress')); 
  }), 

  headerMessage: "Coming Soon!",

  actions: {

      saveInvitation() {
        const email = this.get('emailAddress');

        const newInvitation = this.store.createRecord('invitation', { email });

		newInvitation.save().then(response => {
			this.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
			this.set('emailAddress', '');
		});
      }
    }
});