start:
	nitro start <project>
	docker-compose up -d

stop:
	docker-compose down
	nitro stop

install:
	docker run --rm -v $(shell pwd)/cms:/app -w /app composer:latest create-project craftcms/craft .
	docker run --rm -v $(shell pwd)/cms:/app -w /app composer:latest require nystudio107/craft-twigpack craftcms/redactor nystudio107/craft-seomatic
