(function($) {
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n || {}, {
        'en_US': {
            fedTaxId: {
                'default': 'Please enter a valid Federal Tax Identification number'
            }
        }
    });

    $.fn.bootstrapValidator.validators.fedTaxId = {
        /**
         * Return true if the input value is a Federal Tax ID Number.
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }
            /* US IRS Employee ID Number, aka Federal Tax ID Number regex found at
            http://regexlib.com/REDetails.aspx?regexp_id=3076 */
            return /^([07][1-7]|1[0-6]|2[0-7]|[35][0-9]|[468][0-8]|9[0-589])-?\d{7}$/i.test(value);
        }
    };
}(jQuery));
