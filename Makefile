ENV ?= dev

# Executables (local)
DOCKER_COMP = docker compose
DOCKER_RUN  = $(DOCKER_COMP) run --rm

# Docker containers
FRONTEND_CONT = $(DOCKER_COMP) exec frontend
BACKEND_CONT  = $(DOCKER_COMP) exec backend

# Executables
NEST = $(BACKEND_CONT) yarn nest

# Misc
.DEFAULT_GOAL = help
.PHONY: help copy-env install build start frontend backend nest

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Bootstrap 🚀 ————————————————————————————————————————————————————————————————
bootstrap: copy-env build install start ## Bootstrap the project

copy-env: ## Copy .env.<environment>.<dist> to .env.<environment>
	cp .env.$(ENV).dist .env

install: install-front install-back ## Install all dependencies

install-front: ## Install frontend dependencies
	@$(DOCKER_RUN) frontend yarn install

install-back: ## Install backend dependencies
	@$(DOCKER_RUN) backend yarn install

## —— Docker 🐳 ————————————————————————————————————————————————————————————————
build: ## Build the docker images, pass the parameter "s=" to build a specific service, example: make build s=frontend, you also can pass any docker flags 
	@$(eval s ?=)
	@$(DOCKER_COMP) build $(s)

start: ## Start the docker containers, pass the parameter "s=" to start a specific service, example: make start s=backend
	@$(eval s ?=)
	@$(DOCKER_COMP) up -d $(s)

stop: ## Stop the docker containers, pass the parameter "s=" to stop a specific service, example: make stop s=backend
	@$(eval s ?=)
	@$(DOCKER_COMP) stop $(s)

frontend: ## Execute frontend container
	@$(FRONTEND_CONT) sh

backend: ## Execute backend container
	@$(BACKEND_CONT) sh

## —— Nest.js Backend 🧙‍♂️ ————————————————————————————————————————————————————————————————
nest: ## List all Nest commands or pass the parameter "c=" to run a given command, example: make nest c=class
	@$(eval c ?=)
	@echo "Running Nest command: $(c)"
	@$(NEST) $(c)
