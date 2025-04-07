# SkillFusion

## Prerequisites

- Docker
- Docker Compose
- Make (optional, but recommended)

## Installation

### Starting the project

#### With Make (recommended)

You can bootstrap the entire project with a single command:

```bash
make bootstrap
```

Without Make, you can run the following commands:

```bash
cp .env.dev.dist .env
docker compose build
docker compose run --rm frontend yarn install
docker compose run --rm backend yarn install
docker compose up -d  
```
