import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { match, not, empty, or } from '@ember/object/computed';


export default Controller.extend({

	textMessage: '',
	emailAddress: '',
	isValidEmail: match('emailAddress', /^.+@.+\..+$/),
	isNotValidEmail: not('isValidEmail'),
	isEmptyTextMessage: empty('textMessage'),
	isDisabled: or('isNotValidEmail', 'isEmptyTextMessage'),

	actions: {

      sendMessage() {
      	const email = this.get('emailAddress');
      	const message = this.get('textMessage');

      	const newContact = this.store.createRecord('contact', {email, message})
      	newContact.save().then(response => {
      		this.set('emailAddress', '')
      		this.set('textMessage', '')
      		this.set('responseMessage', 'We got your message and we’ll get in touch soon')
      	});

      	/*
        alert(`Email Address: ${this.get('emailAddress')}\nText Message: ${this.get('textMessage')}`);
        this.set('emailAddress', '')
        this.set('textMessage', '')
        this.set('responseMessage', 'We got your message and we’ll get in touch soon')*/
      }
    }

});

