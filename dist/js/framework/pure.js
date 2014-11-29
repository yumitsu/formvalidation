/*!
 * FormValidation (http://bootstrapvalidator.com)
 * The best jQuery plugin to validate form fields. Support Bootstrap, Foundation frameworks
 *
 * @version     v0.6.0-dev, built on 2014-11-29 4:47:13 PM
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     http://bootstrapvalidator.com/license/
 */
// Support Pure framework
(function($) {
    FormValidation.Framework.Pure = function(element, options) {
        options = $.extend(true, {
            err: {
                clazz: 'fv-help-block',
                parent: '^.*pure-control-group.*$'
            },
            // Pure doesn't support feedback icon
            icon: {
                valid: null,
                invalid: null,
                validating: null,
                feedback: 'fv-control-feedback'
            },
            row: {
                selector: '.pure-control-group',
                valid: '',
                invalid: '',
                feedback: 'fv-has-feedback'
            }
        }, options);

        FormValidation.Base.apply(this, [element, options]);
    };

    FormValidation.Framework.Pure.prototype = $.extend({}, FormValidation.Base.prototype, {});
}(jQuery));
