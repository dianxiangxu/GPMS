OP.Hooks.ReferralManager = Object.clone(OP.Hooks.AppHooksManager, {

    // Setup ---------------------------------------------------------------

    init: function () {
        this.pages = Object.makeEnum(
            'NonFan',
            'Fan',
            'Step2',
            'Step3'
        );

        this.pageNames = {
            NonFan: 'Non-fan Page',
            Fan: 'Sign Up Page',
            Step2: 'Step Two Page',
            Step3: 'Step Three Page'
        };

        // Note: The order of these mappings matters.
        this.pageMapping = {
            '#NonFanTab': this.pages.NonFan,
            '#FanTab, #Before': this.pages.Fan,
            '#app_step3': this.pages.Step3,
            '#app_step2': this.pages.Step2
        };

        this.mobilePageMapping = {
            '#NonFanPage': this.pages.NonFan,
            '#AboutPage':  this.pages.Fan,
            '#AfterPage-Step2': this.pages.Step2,
            '#AfterPage-Step3': this.pages.Step3
        };

        this.pageSetupActions = [
            {
                page: this.pages.NonFan,
                actions: [this.setupNonFanInjection]
            },
            {
                page: this.pages.Fan,
                actions: [
                    this.setupForSignUpForm,
                    this.setupForReferral
                ]
            },
            {
                page: this.pages.Step2,
                actions: [this.setupForSharing]
            },
            {
                page: this.pages.Step3,
                actions: [this.setupForSharing]
            }
        ];

        this.pageActions = [
            {
                page: this.pages.Fan,
                actions: [this.checkForInvalidSubmission]
            },
            {
                page: this.pages.Step2,
                actions: [this.checkForValidSubmission]
            },
            {
                page: this.pages.Step3,
                actions: [this.checkForValidSubmission]
            }
        ];
    },

    setupForReferral: function () {
        if (this.config.isReferred) {
            this.storage.setItem("isReferral", true);
        }
    },

    setupForSharing: function () {
        var shareUrl = this.$('#share_url').val(),
            template = (
                this.config.isMobile
                    ? '#entry-<%= shareType %>-share'
                    : '#share_<%= shareType %> a'
            );
        this.getSuperFn('setupForSharing')(shareUrl, template);
    },

    // Accessors -----------------------------------------------------------

    isNonFanPage: function (page) {
        return page === this.pages.NonFan;
    },

    // Actions -------------------------------------------------------------

    getAppSubmissionBooleans: function () {
        return {
            isReferral: !!this.storage.getItem('isReferral')
        };
    },

    performAppSubmissionCleanup: function () {
        this.storage.removeItem('isReferral');
    }

});

OP.Hooks.ActiveManager = OP.Hooks.ReferralManager;
