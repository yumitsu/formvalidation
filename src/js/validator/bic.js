(function($) {
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n || {}, {
        'en_US': {
            bic: {
                'default': 'Please enter a valid BIC code',
                invalidChars : 'The first 6 characters must be letters',
                leadingZero: 'The number "0" was entered, but this should most likely be the letter "O"'
            }
        }
    });

    $.fn.bootstrapValidator.validators.bic = {
        html5Attributes: {
            message: 'message'
        },


        /**
         * Validate an Business Identifier Code (BIC), also known as ISO 9362, SWIFT-BIC, SWIFT ID or SWIFT code
         *
         * For more information see http://en.wikipedia.org/wiki/ISO_9362
         *
         * @todo The 5 and 6 characters are an ISO 3166-1 country code, this could also be validated
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Object}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();

            if (value === '') {
                return true;
            }

            var locale = validator.getLocale();
            var message = $.fn.bootstrapValidator.i18n[locale].bic.default;
            var valid = false;

            if (/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(value)) {
                valid = true;
            } else if (!/^[A-Z]{6}.*$/.test(value)){
                // Return a more detailed validation message if one or more of the
                // first 6 characters is invalid
                message = $.fn.bootstrapValidator.i18n[locale].bic.invalidChars;

                // 0 and O are commonly mistaken when entering BICs. If at least
                // one of the first 6 characters is a 0 show a hint
                if ( -1 !== value.indexOf('0') && 6 > value.indexOf('0')  ) {
                    message = message + '. ' +  $.fn.bootstrapValidator.i18n[locale].bic.leadingZero;
                }
            }

            if(options.message) {
                message = options.message;
            }

            return {
              valid: valid,
              message: message
            };
        }
    }
}(jQuery));
