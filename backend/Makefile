DC = docker compose
LOGS = docker logs
APP_CONTAINER = capybarka-web

.PHONY: app-logs
app-logs:
	${LOGS} -f -n 50 ${APP_CONTAINER}

.PHONY: app-down
app-down:
	${DC} ${APP_CONTAINER} down

.PHONY: app-start
app-start:
	${DC} up --build -d
