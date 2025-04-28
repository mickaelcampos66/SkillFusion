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
.PHONY: help copy-env install build start frontend backend nest migrations fixtures install-front install-back lint-frontend lint-fix-frontend test-frontend test-frontend-watch test-frontend-ci

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Bootstrap 🚀 ————————————————————————————————————————————————————————————————
bootstrap: copy-env build install start migrations fixtures ## Bootstrap the project

copy-env: ## Copy .env.<environment>.<dist> to .env.<environment>
	cp -n .env.$(ENV).dist .env

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

migrations: ## Run database migrations
	@$(BACKEND_CONT) yarn prisma migrate deploy

fixtures: ## Run database fixtures
	@$(BACKEND_CONT) yarn seed

## —— Next.js Frontend 🧙‍♂️ ———————————————————————————————————————————————————————————————
tsc-frontend: ## Run TypeScript check on the frontend
	@$(FRONTEND_CONT) yarn tsc

lint-frontend: ## Run ESLint on the frontend
	@$(DOCKER_RUN) frontend yarn lint

lint-fix-frontend: ## Run ESLint on the frontend and fix errors
	@$(FRONTEND_CONT) yarn lint:fix

test-frontend: ## Run tests on the frontend, pass the parameter "c=" to run a specific test, example: make test-frontend c=-u (to update snapshots)
	@$(eval c ?=)
	@$(FRONTEND_CONT) yarn test $(c)

test-frontend-watch: ## Run tests on the frontend in watch mode
	@$(FRONTEND_CONT) yarn test:watch

test-frontend-ci: ## Run tests on the frontend in CI mode
	@$(DOCKER_RUN) frontend yarn test:ci
