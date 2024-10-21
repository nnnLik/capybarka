.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: clean
clean: clean_pyc clean_pycache

.PHONY: clean_pyc
clean_pyc:
	find . -type f -name "*.pyc" -delete || true

.PHONY: clean_pycache
clean_pycache:
	find . -type d -name "*__pycache__*" -delete

.PHONY: run
run:
	ESMERALD_SETTINGS_MODULE=capybarka.configs.development.settings.DevelopmentAppSettings python -m capybarka.serve

.PHONY: test
test:
	ESMERALD_SETTINGS_MODULE=capybarka.configs.testing.settings.TestingAppSettings pytest -s $(TESTONLY)

ifndef VERBOSE
.SILENT:
endif