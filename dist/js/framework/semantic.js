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
 * This class supports validating SemanticUI form (http://semantic-ui.com/)
 */
(function($) {
    FormValidation.Framework.Semantic = function(element, options) {
        options = $.extend(true, {
            button: {
                // CSS class of disabled button
                // http://semantic-ui.com/elements/button.html#disabled
                disabled: 'disabled'
            },
            control: {
                valid: '',
                invalid: ''
            },
            err: {
                clazz: 'ui red pointing prompt label transition',
                parent: '^.*(field|column).*$'
            },
            // When using feedback icon, the input must place inside 'ui input icon' element
            //  <div class="ui input icon">
            //      <input type="text" />
            //  </div>
            // See http://semantic-ui.com/elements/input.html#icon
            icon: {
                // http://semantic-ui.com/elements/icon.html
                valid: null,        // 'checkmark icon'
                invalid: null,      // 'remove icon'
                validating: null,   // 'refresh icon'
                feedback: ''
            },
            row: {
                selector: '.field',
                valid: '',
                invalid: 'error',
                feedback: 'fv-has-feedback'
            }
        }, options);

        FormValidation.Base.apply(this, [element, options]);
    };

    FormValidation.Framework.Semantic.prototype = $.extend({}, FormValidation.Base.prototype, {
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
                if ($fieldParent.hasClass(type)) {
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
                // http://semantic-ui.com/modules/popup.html
                $icon
                    .css({
                        'cursor': 'pointer'
                    })
                    .popup({
                        content: message
                    });
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
                // TODO: Remove the popup from DOM
                var popup = $icon.css({ 'cursor': '' }).data('module-popup');
                if (popup) {
                    popup.hide();
                    popup.destroy();
                }
                $icon.popup('remove');
                $icon.removeData('module-popup');
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
                var popup = $icon.data('module-popup');
                if (popup) {
                    popup.hide();
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
                var popup = $icon.data('module-popup');
                if (popup) {
                    popup.show();
                }
            }
        }
    });
}(jQuery));
