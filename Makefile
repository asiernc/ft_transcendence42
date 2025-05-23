up:
	@if [ ! -d "./data/postgres" ]; then \
		mkdir -p "./data/postgres"; \
		chmod -R 777 "./data/postgres"; \
	fi
	docker compose -f docker-compose.yml up

down:
	docker compose -f docker-compose.yml down
	@if [ -n "$$(docker image ls -aq)" ]; then \
		docker image rmi $$(docker image ls -aq); \
	fi

clean:
	@if [ ! -z "$$(docker ps -aq)" ]; then \
		docker stop $$(docker ps -aq); \
		docker rm $$(docker ps -aq); \
	fi
	@if [ ! -z "$$(docker images -aq)" ]; then \
		docker rmi $$(docker images -aq); \
	fi	
	@if [ ! -z "$$(docker volume ls -q)" ]; then \
		docker volume rm $$(docker volume ls -q); \
	fi
	@if [ ! -z "$$(docker network ls -q --filter type=custom)" ]; then \
		docker network rm $$(docker network ls -q --filter type=custom); \
	fi
	@echo "Deleted all docker containers, volumes, networks, and images successfully"

re: clean up