/**
 * oneMessage add-on
 * This add-ons shows only one message if the field is not valid
 *
 * @link        http://bootstrapvalidator.com/addons/oneMessage/
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     http://bootstrapvalidator.com/license/
 */
(function($) {
    $.fn.bootstrapValidator.addOns.oneMessage = {
        /**
         * @param {BootstrapValidator} validator The BootstrapValidator instance
         * @param {Object} options The add-on options
         */
        init: function(validator, options) {
            var opts = validator.getOptions();
            validator
                .getForm()
                .on(opts.events.validatorError, function(e, data) {
                    if (options && options[data.field] === false) {
                        return;
                    }

                    data.element
                        .data('bv.messages')
                        // Hide all the messages
                        .find('.help-block[data-bv-for="' + data.field + '"]').hide()
                        // Show only message associated with current validator
                        .filter('[data-bv-validator="' + data.validator + '"]').show();
                });
        }
    };
}(jQuery));
