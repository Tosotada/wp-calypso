/** @format */
export default {
	improvedOnboarding: {
		datestamp: '20181023',
		variations: {
			main: 90,
			onboarding: 10,
		},
		defaultVariation: 'main',
		localeTargets: 'any',
	},
	cartNudgeUpdateToPremium: {
		datestamp: '20180917',
		variations: {
			test: 50,
			control: 50,
		},
		defaultVariation: 'control',
		allowExistingUsers: true,
	},
	springSale30PercentOff: {
		datestamp: '20180413',
		variations: {
			upsell: 50,
			control: 50,
		},
		defaultVariation: 'control',
		allowExistingUsers: true,
	},
	signupAtomicStoreVsPressable: {
		datestamp: '20171101',
		variations: {
			atomic: 99,
			pressable: 1,
		},
		defaultVariation: 'atomic',
		allowExistingUsers: true,
		localeTargets: 'any',
	},
	businessPlanDescriptionAT: {
		datestamp: '20170605',
		variations: {
			original: 50,
			pluginsAndThemes: 50,
		},
		defaultVariation: 'original',
	},
	ATPromptOnCancel: {
		datestamp: '20170515',
		variations: {
			hide: 20,
			show: 80,
		},
		defaultVariation: 'hide',
		allowExistingUsers: true,
	},
	ATUpgradeOnCancel: {
		datestamp: '20170515',
		variations: {
			hide: 20,
			show: 80,
		},
		defaultVariation: 'hide',
		allowExistingUsers: true,
	},
	skipThemesSelectionModal: {
		datestamp: '20170904',
		variations: {
			skip: 50,
			show: 50,
		},
		defaultVariation: 'show',
		allowExistingUsers: true,
		localeTargets: 'any',
	},
	privateByDefault: {
		datestamp: '20181115',
		variations: {
			private: 10,
			public: 90,
		},
		defaultVariation: 'public',
	},
	crowdsignalNameBasedSignup: {
		datestamp: '20181120',
		variations: {
			nameSignup: 50,
			usernameSignup: 50,
		},
		defaultVariation: 'usernameSignup',
	},
	krackenM5DomainSuggestions: {
		datestamp: '20181129',
		variations: {
			domainsbot_front: 25,
			variation_front: 75,
		},
		allowExistingUsers: true,
		defaultVariation: 'domainsbot_front',
	},
};
