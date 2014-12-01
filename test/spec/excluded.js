describe('excluded', function() {
    beforeEach(function() {
        $([
            '<div class="container">',
                '<form class="form-horizontal" id="excludedForm" data-fv-excluded="[name=\'email\']">',
                    '<div class="form-group">',
                        '<input type="text" name="username" required />',
                    '</div>',
                    '<div class="form-group">',
                        '<input type="text" name="email" required data-fv-emailaddress />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('')).appendTo('body');

        $('#excludedForm').bootstrapValidator();

        this.fv        = $('#excludedForm').data('bootstrapValidator');
        this.$username = this.fv.getFieldElements('username');
        this.$email    = this.fv.getFieldElements('email');
    });

    afterEach(function() {
        $('#excludedForm').bootstrapValidator('destroy').parent().remove();
    });

    it('excluded form declarative', function() {
        this.fv.validate();
        expect(this.fv.isValid()).toEqual(false);

        this.fv.resetForm();
        this.$username.val('your_user_name');
        this.$email.val('');
        this.fv.validate();
        expect(this.fv.isValid()).toBeTruthy();
    });

    it('excluded form programmatically', function() {
        this.fv.destroy();
        $('#excludedForm').removeAttr('data-fv-excluded');

        $('#excludedForm').bootstrapValidator({
            excluded: '[name="username"]'
        });

        this.fv        = $('#excludedForm').data('bootstrapValidator');
        this.$username = this.fv.getFieldElements('username');
        this.$email    = this.fv.getFieldElements('email');

        this.$username.val('');
        this.$email.val('invalid#email.com');
        this.fv.validate();
        expect(this.fv.isValid()).toEqual(false);

        this.fv.resetForm();
        this.$email.val('valid@email.com');
        this.fv.validate();
        expect(this.fv.isValid()).toBeTruthy();
    });

    it('excluded field declarative', function() {
        this.fv.destroy();
        $('#excludedForm').removeAttr('data-fv-excluded');
        $('#excludedForm').find('[name="username"]').attr('data-fv-excluded', 'true');
        $('#excludedForm').find('[name="email"]').attr('data-fv-excluded', 'false');

        this.fv        = $('#excludedForm').bootstrapValidator().data('bootstrapValidator');
        this.$username = this.fv.getFieldElements('username');
        this.$email    = this.fv.getFieldElements('email');

        this.$username.val('');
        this.$email.val('');
        this.fv.validate();
        expect(this.fv.isValid()).toEqual(false);

        this.fv.resetForm();
        this.$email.val('invalid#email.com');
        this.fv.validate();
        expect(this.fv.isValid()).toEqual(false);

        this.fv.resetForm();
        this.$email.val('valid@email.com');
        this.fv.validate();
        expect(this.fv.isValid()).toBeTruthy();
    });

    it('excluded field programmatically true/false', function() {
        this.fv.destroy();
        $('#excludedForm').removeAttr('data-fv-excluded');

        $('#excludedForm').bootstrapValidator({
            fields: {
                username: {
                    excluded: true
                },
                email: {
                    excluded: false
                }
            }
        });

        this.fv        = $('#excludedForm').bootstrapValidator().data('bootstrapValidator');
        this.$username = this.fv.getFieldElements('username');
        this.$email    = this.fv.getFieldElements('email');

        this.$username.val('');
        this.$email.val('');
        this.fv.validate();
        expect(this.fv.isValid()).toEqual(false);

        this.fv.resetForm();
        this.$email.val('invalid#email.com');
        this.fv.validate();
        expect(this.fv.isValid()).toEqual(false);

        this.fv.resetForm();
        this.$email.val('valid@email.com');
        this.fv.validate();
        expect(this.fv.isValid()).toBeTruthy();
    });

    it('excluded field programmatically "true"/"false"', function() {
        this.fv.destroy();
        $('#excludedForm').removeAttr('data-fv-excluded');

        $('#excludedForm').bootstrapValidator({
            fields: {
                username: {
                    excluded: 'false'
                },
                email: {
                    excluded: 'true'
                }
            }
        });

        this.fv        = $('#excludedForm').bootstrapValidator().data('bootstrapValidator');
        this.$username = this.fv.getFieldElements('username');
        this.$email    = this.fv.getFieldElements('email');

        this.$username.val('');
        this.$email.val('valid@email.com');
        this.fv.validate();
        expect(this.fv.isValid()).toEqual(false);

        this.fv.resetForm();
        this.$username.val('your_user_name');
        this.$email.val('invalid#email.com');
        this.fv.validate();
        expect(this.fv.isValid()).toBeTruthy();
    });
});
