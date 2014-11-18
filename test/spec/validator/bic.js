describe('bic', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="bicForm">',
                '<div class="form-group">',
                    '<input type="text" name="bic" data-bv-bic />',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#bicForm').bootstrapValidator();

        this.bv       = $('#bicForm').data('bootstrapValidator');
        this.$bic    = this.bv.getFieldElements('bic');
    });

    afterEach(function() {
        $('#bicForm').bootstrapValidator('destroy').remove();
    });

    it('invalid bic', function() {
        // Test some invalid BICs
        var invalidSamples = ['ASPKAT2LXX', 'ASPKAT2LX', 'ASPKAT2LXXX1', 'DABADKK', 'RZ00AT2L303'];
        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$bic.val(invalidSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toEqual(false);
        }
    });

    it('valid bic', function() {
        // Examples see http://en.wikipedia.org/wiki/ISO_9362
        var validSamples = ['ASPKAT2LXXX', 'ASPKAT2L', 'DSBACNBXSHA', 'UNCRIT2B912', 'DABADKKK', 'RZOOAT2L303' ];
        for (i in validSamples) {
            this.bv.resetForm();
            this.$bic.val(validSamples[i]);
            this.bv.validate();
            expect(this.bv.isValid()).toBeTruthy();
        }
    });

    it('invalid fist 6 characters', function() {
        // If one or more of the first 6 characters are invalid expect a special error message
        var locale = this.bv.getLocale();
        var invalidSamples = ['1SBACNBXSHA', 'D2BACNBXSHA', 'DS3ACNBXSHA', 'DSB4CNBXSHA', 'DSBA5NBXSHA', 'DSBAC6BXSHA', '1S3AC6BXSHA' ];
        var expectedMessage = $.fn.bootstrapValidator.i18n[locale].bic.invalidChars

        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$bic.val(invalidSamples[i]);
            this.bv.validate();

            expect(this.bv.isValid()).toEqual(false);
            expect(this.bv.getMessages()[0]).toEqual(expectedMessage);
        }

        // Errors after the first 6 chars should produce the standard error message
        this.bv.resetForm();
        this.$bic.val('ASPKAT2LXXXX');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);
        expect(this.bv.getMessages()[0]).toEqual($.fn.bootstrapValidator.i18n[locale].bic.default);

    });

    it('first 6 characters contains 0', function() {
        // If one or more of the first 6 characters are 0 expect a special error message
        var locale = this.bv.getLocale();
        var invalidSamples = ['0ZOOAT2L303', 'R0OOAT2L303', 'RZ00AT2L303', 'RZOO002L303' ];
        var expectedMessage = $.fn.bootstrapValidator.i18n[locale].bic.invalidChars + ' ' + $.fn.bootstrapValidator.i18n[locale].bic.leadingZero;

        for (i in invalidSamples) {
            this.bv.resetForm();
            this.$bic.val(invalidSamples[i]);
            this.bv.validate();

            expect(this.bv.isValid()).toEqual(false);
            expect(this.bv.getMessages()[0]).toEqual(expectedMessage);
        }

        // Errors after the first 6 chars should produce the standard error message
        this.bv.resetForm();
        this.$bic.val('ASPKAT2LXXXX');
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);
        expect(this.bv.getMessages()[0]).toEqual($.fn.bootstrapValidator.i18n[locale].bic.default);
    });

});
