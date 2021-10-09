start: images
	@docker-compose up

clean:
	@docker-compose down

images:
	@export foo=book_bank; \
        echo "You're Starting the Best Web Application in the World: $$foo"

