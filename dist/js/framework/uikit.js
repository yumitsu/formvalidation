/*!
 * FormValidation (http://bootstrapvalidator.com)
 * The best jQuery plugin to validate form fields. Support Bootstrap, Foundation, SemanticUI, UIKit frameworks
 *
 * @version     v0.6.0-dev, built on 2014-12-02 9:00:10 PM
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     http://bootstrapvalidator.com/license/
 */
/**
 * This class supports validating UIKit form (http://getuikit.com/)
 */
(function($) {
    FormValidation.Framework.UIKit = function(element, options) {
        options = $.extend(true, {
            button: {
                // The class for disabled button
                // http://foundation.zurb.com/docs/components/buttons.html
                disabled: 'disabled'
            },
            control: {
                valid: 'uk-form-success',
                invalid: 'uk-form-danger'
            },
            err: {
                clazz: 'uk-text-warning',
                parent: '^.*(uk-form-controls|uk-width-[\\d+]-[\\d+]).*$'
            },
            // UIKit doesn't support feedback icon
            icon: {
                valid: null,
                invalid: null,
                validating: null,
                feedback: 'fv-control-feedback'
            },
            row: {
                // http://getuikit.com/docs/form.html
                selector: '.uk-form-row',
                valid: '',
                invalid: '',
                feedback: 'fv-has-feedback'
            }
        }, options);

        FormValidation.Base.apply(this, [element, options]);
    };

    FormValidation.Framework.UIKit.prototype = $.extend({}, FormValidation.Base.prototype, {
        /**
         * Specific framework might need to adjust the icon position
         *
         * @param {jQuery} $field The field element
         * @param {jQuery} $icon The icon element
         */
        _fixIcon: function($field, $icon) {
            var type = $field.attr('type');
            if ('checkbox' === type || 'radio' === type) {
                var $fieldParent = $field.parent();
                if ($fieldParent.is('label')) {
                    $icon.insertAfter($fieldParent);
                }
            }
        },

        /**
         * Create a tooltip or popover
         * It will be shown when focusing on the field
         *
         * @param {jQuery} $field The field element
         * @param {String} message The message
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _createTooltip: function($field, message, type) {
            var $icon = $field.data('fv.icon');
            if ($icon) {
                $icon
                    .attr('title', message)
                    .css({
                        'cursor': 'pointer'
                    })
                    .data('fv.uikit.tooltip', new $.UIkit.tooltip($icon));
            }
        },

        /**
         * Destroy the tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _destroyTooltip: function($field, type) {
            var $icon = $field.data('fv.icon');
            if ($icon) {
                $icon.css({
                    'cursor': ''
                });
                var tooltip = $icon.data('fv.uikit.tooltip');
                if (tooltip) {
                    tooltip.hide();
                    $icon.off('focus mouseenter')
                         .removeData('fv.uikit.tooltip');
                }
            }
        },

        /**
         * Hide a tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _hideTooltip: function($field, type) {
            var $icon = $field.data('fv.icon');
            if ($icon) {
                $icon.css({
                    'cursor': ''
                });
                var tooltip = $icon.data('fv.uikit.tooltip');
                if (tooltip) {
                    tooltip.hide();
                }
            }
        },

        /**
         * Show a tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _showTooltip: function($field, type) {
            var $icon = $field.data('fv.icon');
            if ($icon) {
                $icon.css({
                    'cursor': 'pointer'
                });
                var tooltip = $icon.data('fv.uikit.tooltip');
                if (tooltip) {
                    tooltip.show();
                }
            }
        }
    });
}(jQuery));
