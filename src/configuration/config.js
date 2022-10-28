
export const defaultConfig = {
	apiUrl: "http://localhost:8080/undefinedApiUrl",
	environment: "DEV"
};

class GlobalConfig {
	constructor() {
		this.config = defaultConfig;
		this.notDefinedYet = true;
	}

	get() {
		if (this.notDefinedYet) {
			throw new Error(
				"Global config has not been defined yet. Be sure to call the getter only after the config has been downloaded and set. Probable cause is accessing globalConfig in static context."
			);
		} else {
			return this.config;
		}
	}

	set(value) {
		if (this.notDefinedYet) {
			this.config = value;
			this.notDefinedYet = false;
		} else {
			throw new Error(
				"Global config has already been defined and now has been called second time. This is probably not intended."
			);
		}
	}
}

export const globalConfig = new GlobalConfig();

export const globalConfigUrl = "config.json";
