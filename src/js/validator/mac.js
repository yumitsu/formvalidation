/**
 * mac validator
 *
 * @link        http://bootstrapvalidator.com/validators/mac/
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     http://bootstrapvalidator.com/license/
 */
(function($) {
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n || {}, {
        'en_US': {
            mac: {
                'default': 'Please enter a valid MAC address'
            }
        }
    });

    $.fn.bootstrapValidator.validators.mac = {
        /**
         * Return true if the input value is a MAC address.
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following keys:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = validator.getFieldValue($field, 'mac');
            if (value === '') {
                return true;
            }

            return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(value);
        }
    };
}(jQuery));
